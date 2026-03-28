const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET All Movies (Search & Filter)
router.get('/', async (req, res) => {
    const { search, category } = req.query;
    try {
        let query = {};
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        } else if (category) {
            query.category = { $regex: category, $options: 'i' };
        }

        const movies = await Movie.find(query).sort({ createdAt: -1 });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
