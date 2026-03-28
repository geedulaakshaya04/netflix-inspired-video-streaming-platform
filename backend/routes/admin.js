const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage for images (posters)
const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'netflix-clone/posters',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});

// Cloudinary Storage for videos
const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'netflix-clone/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'avi', 'mkv'],
    },
});

const uploadPoster = multer({ storage: imageStorage });
const uploadVideo = multer({ storage: videoStorage });

// Combined upload using separate middleware calls chained
const uploadFields = (req, res, next) => {
    // Use memory upload to handle mixed files, then push each to cloudinary
    multer({
        storage: new CloudinaryStorage({
            cloudinary,
            params: (req, file) => {
                if (file.fieldname === 'poster') {
                    return { folder: 'netflix-clone/posters', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] };
                }
                return { folder: 'netflix-clone/videos', resource_type: 'video', allowed_formats: ['mp4', 'mov', 'avi', 'mkv'] };
            },
        }),
        limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
    }).fields([
        { name: 'poster', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ])(req, res, next);
};

// ADMIN: Add Movie
router.post('/movies', uploadFields, async (req, res) => {
    const { title, description, category, release_year, rating, video_url, poster } = req.body;

    // Use Cloudinary uploaded URLs or fallback to string URLs provided in body
    const final_poster = req.files && req.files['poster']
        ? req.files['poster'][0].path
        : poster;
    const final_video = req.files && req.files['video']
        ? req.files['video'][0].path
        : video_url;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const movie = await Movie.create({
            title,
            description,
            category,
            release_year,
            rating,
            poster: final_poster,
            video_url: final_video,
        });
        res.status(201).json({ id: movie._id, message: 'Movie added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN: Delete Movie
router.delete('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
