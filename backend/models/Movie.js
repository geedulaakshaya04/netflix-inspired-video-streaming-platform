const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    release_year: { type: Number },
    rating: { type: Number },
    poster: { type: String },       // Cloudinary URL
    video_url: { type: String },    // Cloudinary URL or external URL
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
