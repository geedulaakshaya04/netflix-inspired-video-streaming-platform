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

// GET All Movies (Search & Filter)
router.get('/', (req, res) => {
    const { search, category } = req.query;
    let query = 'SELECT * FROM movies';
    let params = [];

    if (search) {
        query += ' WHERE title LIKE ?';
        params.push(`%${search}%`);
    } else if (category) {
        query += ' WHERE category LIKE ?';
        params.push(`%${category}%`);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET Movie by ID
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Movie not found' });
        res.json(row);
    });
});




module.exports = router;
