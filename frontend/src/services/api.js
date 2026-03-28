import axios from 'axios';
import { API_BASE_URL } from '../config';

const BASE_URL = `${API_BASE_URL}/api`;

const api = axios.create({
    baseURL: BASE_URL,
});

export const getMovies = async (category) => {
    try {
        const url = category ? `/movies?category=${category}` : '/movies';
        const res = await api.get(url);
        return res.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export const getMovieById = async (id) => {
    try {
        const res = await api.get(`/movies/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching movie by id:", error);
        return null;
    }
};

export const getWatchlist = async (userId) => {
    try {
        const res = await api.get(`/watchlist/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        return [];
    }
};

export const addToWatchlist = async (userId, movieId) => {
    try {
        const res = await api.post('/watchlist', { userId, movieId });
        return res.data;
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        throw error;
    }
};

export const removeFromWatchlist = async (userId, movieId) => {
    try {
        const res = await api.delete(`/watchlist/${userId}/${movieId}`);
        return res.data;
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        throw error;
    }
};

export const addMovie = async (movieData) => {
    try {
        const res = await api.post('/admin/movies', movieData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data;
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error;
    }
};

export const deleteMovie = async (id) => {
    try {
        const res = await api.delete(`/admin/movies/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
};

export default api;
