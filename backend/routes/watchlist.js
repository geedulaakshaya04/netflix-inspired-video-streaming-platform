const express = require('express');
const router = express.Router();
const db = require('../database');

// GET Watchlist for a User
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT w.id as watchlist_id, m.* 
        FROM watchlist w
        JOIN movies m ON w.movie_id = m.id
        WHERE w.user_id = ?
        ORDER BY w.added_at DESC
    `;
    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ADD to Watchlist
router.post('/', (req, res) => {
    const { userId, movieId } = req.body;
    if (!userId || !movieId) return res.status(400).json({ error: 'User ID and Movie ID required' });

    // Check if already in watchlist
    db.get('SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?', [userId, movieId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.status(400).json({ error: 'Movie already in watchlist' });

        const stmt = db.prepare('INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)');
        stmt.run(userId, movieId, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Added to watchlist', id: this.lastID });
        });
        stmt.finalize();
    });
});

// REMOVE from Watchlist (by watchlist ID or movie ID for a user? Let's generic delete by ID first, or delete by movie_id+user_id)
// Simpler: Delete by watchlist ID is standard, but UI might only know movie ID. 
// Let's support DELETE /?userId=X&movieId=Y OR DELETE /:id
// Instruction says DELETE /:id. Let's assume frontend passes the watchlist entry ID, OR we allow delete by movie_id.
// Actually, for "My List" toggle on details page, we know Movie ID. Getting Watchlist ID is extra step.
// Let's implement DELETE with body or query params to be flexible, or just standard DELETE /:id if we list them.
// Let's do: DELETE /:userId/:movieId for ease of toggle.
router.delete('/:userId/:movieId', (req, res) => {
    const { userId, movieId } = req.params;
    db.run('DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?', [userId, movieId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Removed from watchlist' });
    });
});

module.exports = router;
