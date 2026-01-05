import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                // fetchUrl is relative now e.g. /movies
                const request = await api.get(fetchUrl);
                setMovies(request.data);
            } catch (err) {
                console.error("Failed to fetch movies for row:", title, err);
            }
        }
        fetchData();
    }, [fetchUrl, title]);

    return (
        <div className="row" style={{ marginLeft: '20px', color: 'white' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h2>
            <div className="row-posters" style={{
                display: 'flex',
                overflowY: 'hidden',
                overflowX: 'scroll',
                padding: '20px'
            }}>
                {movies.map(movie => (
                    (movie.poster) && (
                        <img
                            key={movie.id}
                            onClick={() => navigate(`/browse/${movie.id}`)}
                            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                            src={movie.poster.startsWith('http') ? movie.poster : `http://localhost:5000${movie.poster}`}
                            alt={movie.title}
                            style={{
                                objectFit: 'cover', // cover looks better
                                width: isLargeRow ? '150px' : '200px', // fixed width helps
                                maxHeight: isLargeRow ? '250px' : '100px',
                                marginRight: '10px',
                                transition: 'transform 450ms',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                flex: 'none' // prevent squishing
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default Row;
