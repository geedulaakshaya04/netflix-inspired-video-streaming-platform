const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');

// GET Watchlist for a User
router.get('/:userId', async (req, res) => {
    try {
        const items = await Watchlist.find({ user_id: req.params.userId })
            .populate('movie_id')
            .sort({ createdAt: -1 });

        // Flatten: return movie data with a watchlist_id field to keep frontend API-compatible
        const result = items.map(item => ({
            watchlist_id: item._id,
            ...item.movie_id.toObject(),
            // Map MongoDB _id to id for frontend compatibility
            id: item.movie_id._id,
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD to Watchlist
router.post('/', async (req, res) => {
    const { userId, movieId } = req.body;
    if (!userId || !movieId) return res.status(400).json({ error: 'User ID and Movie ID required' });

    try {
        const entry = await Watchlist.create({ user_id: userId, movie_id: movieId });
        res.status(201).json({ message: 'Added to watchlist', id: entry._id });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Movie already in watchlist' });
        }
        res.status(500).json({ error: err.message });
    }
});

// REMOVE from Watchlist by userId + movieId
router.delete('/:userId/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;
    try {
        await Watchlist.findOneAndDelete({ user_id: userId, movie_id: movieId });
        res.json({ message: 'Removed from watchlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
