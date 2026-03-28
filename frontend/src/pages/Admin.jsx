import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getMovies, addMovie, deleteMovie } from '../services/api';
import { API_BASE_URL } from '../config';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [rating, setRating] = useState('');
    const [posterFile, setPosterFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [posterUrl, setPosterUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const data = await getMovies();
        setMovies(data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('release_year', releaseYear);
        formData.append('rating', rating);
        if (posterFile) formData.append('poster', posterFile);
        if (videoFile) formData.append('video', videoFile);
        if (posterUrl) formData.append('poster', posterUrl); // Backend expects 'poster' field for text URL too if file not present, logic handled in route
        if (videoUrl) formData.append('video_url', videoUrl); // Backend expects 'video_url'

        try {
            await addMovie(formData);
            setSuccess('Movie added successfully!');
            // Reset form
            setTitle(''); setDescription(''); setCategory(''); setReleaseYear(''); setRating('');
            setPosterFile(null); setVideoFile(null); setPosterUrl(''); setVideoUrl('');
            // Refresh list
            fetchMovies();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to add movie');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            await deleteMovie(id);
            setSuccess('Movie deleted.');
            fetchMovies();
        } catch (err) {
            setError('Failed to delete movie');
        }
    };

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white', paddingTop: '100px' }}>
            <Navbar />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <h1 style={{ marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Admin Panel</h1>

                {error && <div style={{ background: '#e87c03', padding: '15px', marginBottom: '20px', borderRadius: '4px' }}>{error}</div>}
                {success && <div style={{ background: '#46d369', color: 'white', padding: '15px', marginBottom: '20px', borderRadius: '4px', fontWeight: 'bold' }}>{success}</div>}

                {/* Add Movie Form */}
                <div style={{ marginBottom: '50px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Add New Movie</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input className="text-input" placeholder="Movie Title" value={title} onChange={e => setTitle(e.target.value)} required />
                        <textarea className="text-input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{ height: '100px', resize: 'vertical' }} />
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input className="text-input" placeholder="Category (Action, Comedy...)" value={category} onChange={e => setCategory(e.target.value)} required />
                            <input className="text-input" type="number" placeholder="Year" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} />
                            <input className="text-input" type="number" step="0.1" placeholder="Rating (0-10)" value={rating} onChange={e => setRating(e.target.value)} />
                        </div>

                        {/* Poster Upload/URL */}
                        <div style={{ background: '#333', padding: '15px', borderRadius: '4px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Poster</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="file" onChange={e => setPosterFile(e.target.files[0])} />
                                <input className="text-input" placeholder="OR Paste URL" value={posterUrl} onChange={e => setPosterUrl(e.target.value)} style={{ marginBottom: 0 }} />
                            </div>
                        </div>

                        {/* Video Upload/URL */}
                        <div style={{ background: '#333', padding: '15px', borderRadius: '4px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>Video</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="file" onChange={e => setVideoFile(e.target.files[0])} />
                                <input className="text-input" placeholder="OR Paste URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} style={{ marginBottom: 0 }} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '15px', fontSize: '1rem' }}>
                            {loading ? 'Processing...' : 'Add Movie'}
                        </button>
                    </form>
                </div>

                {/* Movie List */}
                <div>
                    <h2 style={{ marginBottom: '20px' }}>Manage Catalog ({movies.length})</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {movies.map(movie => (
                            <div key={movie.id} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: '#222', padding: '15px', borderRadius: '4px'
                            }}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    {movie.poster && <img src={movie.poster.startsWith('http') ? movie.poster : `${API_BASE_URL}${movie.poster}`} alt={movie.title} style={{ width: '40px', height: '60px', objectFit: 'cover' }} />}
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{movie.title}</div>
                                        <div style={{ color: '#999', fontSize: '0.9rem' }}>{movie.category} • {movie.release_year}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(movie.id)}
                                    style={{
                                        background: '#e50914', color: 'white', border: 'none',
                                        padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
