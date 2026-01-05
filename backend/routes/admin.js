const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit
});

// ADMIN: Add Movie
router.post('/movies', upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
    const { title, description, category, release_year, rating, video_url, poster } = req.body;

    // Handle file uploads or fallback to string URLs
    let final_poster = req.files && req.files['poster'] ? `/uploads/${req.files['poster'][0].filename}` : poster;
    let final_video = req.files && req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : video_url;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    const stmt = db.prepare('INSERT INTO movies (title, description, category, release_year, rating, poster, video_url) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(title, description, category, release_year, rating, final_poster, final_video, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: 'Movie added successfully' });
    });
    stmt.finalize();
});

// ADMIN: Delete Movie
router.delete('/movies/:id', (req, res) => {
    db.run('DELETE FROM movies WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Movie deleted' });
    });
});

module.exports = router;
