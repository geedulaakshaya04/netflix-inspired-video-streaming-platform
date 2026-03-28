import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getWatchlist } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const MyList = () => {
    const [movies, setMovies] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (user?.id) {
                const data = await getWatchlist(user.id);
                setMovies(data);
            }
        }
        fetchData();
    }, [user]);

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', padding: '20px' }}>
            <Navbar />
            <div style={{ paddingTop: '100px', paddingLeft: '20px' }}>
                <h1 style={{ color: 'white', marginBottom: '20px' }}>My List</h1>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <div key={movie.watchlist_id || movie.id} style={{ position: 'relative' }}>
                                <img
                                    onClick={() => navigate(`/browse/${movie.id}`)}
                                    src={movie.poster && movie.poster.startsWith('http') ? movie.poster : `${API_BASE_URL}${movie.poster}`}
                                    alt={movie.title}
                                    style={{
                                        width: '200px',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        transition: 'transform 450ms'
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))
                    ) : (
                        <h3 style={{ color: 'gray' }}>No movies in your list yet.</h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyList;
