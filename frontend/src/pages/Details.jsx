import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getMovieById, addToWatchlist, removeFromWatchlist, getWatchlist } from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const { user } = useAuth();
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        async function checkWatchlist() {
            if (user?.id && movie?.id) {
                const list = await getWatchlist(user.id);
                const exists = list.find(item => item.id === movie.id);
                setInWatchlist(!!exists);
            }
        }
        checkWatchlist();
    }, [user, movie]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [id]);

    if (!movie) return <div style={{ color: 'white', padding: 100, backgroundColor: '#111', height: '100vh' }}>Loading...</div>;

    const backgroundUrl = movie.poster && movie.poster.startsWith('http') ? movie.poster : `http://localhost:5000${movie.poster}`;

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
            <Navbar />
            <div style={{
                display: 'flex',
                paddingTop: '100px',
                paddingLeft: '50px',
                paddingRight: '50px',
                gap: '50px',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {backgroundUrl && <img
                    src={backgroundUrl}
                    alt={movie.title}
                    style={{ width: '300px', borderRadius: '4px', objectFit: 'cover' }}
                />}
                <div style={{ flex: 1, maxWidth: '800px', minWidth: '300px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>{movie.title}</h1>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', color: '#a3a3a3', fontSize: '1.1rem' }}>
                        <span style={{ color: '#46d369', fontWeight: 'bold' }}>{movie.rating * 10}% Match</span>
                        <span>{movie.release_year}</span>
                        <span>{movie.category}</span>
                    </div>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.5', marginBottom: '30px', color: 'white' }}>{movie.description}</p>

                    <div style={{ display: 'flex', gap: 20 }}>
                        <button className="btn btn-primary" onClick={() => navigate(`/watch/${movie.id}`)}
                            style={{ padding: '10px 30px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}
                        >
                            ► Play
                        </button>
                        <button className="btn btn-secondary"
                            onClick={async () => {
                                if (inWatchlist) {
                                    await removeFromWatchlist(user.id, movie.id);
                                    setInWatchlist(false);
                                    alert('Removed from My List');
                                } else {
                                    try {
                                        await addToWatchlist(user.id, movie.id);
                                        setInWatchlist(true);
                                        alert('Added to My List');
                                    } catch (e) {
                                        alert(e.response?.data?.error || 'Error adding to list');
                                    }
                                }
                            }}
                            style={{ padding: '10px 30px', fontSize: '1.2rem', backgroundColor: inWatchlist ? '#e50914' : 'rgba(109, 109, 110, 0.7)' }}
                        >
                            {inWatchlist ? '✓ In My List' : '+ My List'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Details;
