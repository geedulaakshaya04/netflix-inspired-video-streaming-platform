import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import { getMovies } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const movies = await getMovies();
                // Pick random movie for Hero
                if (movies.length > 0) {
                    setMovie(
                        movies[
                        Math.floor(Math.random() * movies.length)
                        ]
                    );
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    // Fallback image if no movie path
    const bannerImage = movie?.poster
        ? (movie.poster.startsWith('http') ? movie.poster : `http://localhost:5000${movie.poster}`)
        : "https://assets.nflxext.com/ffe/siteui/vlv3/f85718e2-fc6d-4954-9ca0-f6daecc19832/web/IN-en-20240902-TRIFECTA-perspective_2276532d-6e42-4f0e-b2d9-31778ff05e04_large.jpg";

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh' }}>
            <Navbar />

            <header className="banner" style={{
                backgroundSize: 'cover',
                backgroundImage: `url("${bannerImage}")`,
                backgroundPosition: 'center center',
                height: '448px',
                color: 'white',
                objectFit: 'contain',
                position: 'relative'
            }}>
                <div className="banner-contents" style={{
                    marginLeft: '30px',
                    paddingTop: '140px',
                    height: '190px'
                }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, paddingBottom: '0.3rem' }}>
                        {movie?.title || 'Welcome to Netflix'}
                    </h1>
                    <div className="banner-buttons">
                        <button className="banner-button"
                            onClick={() => movie?.id && navigate(`/watch/${movie.id}`)}
                            style={{
                                cursor: 'pointer', color: '#fff', outline: 'none', border: 'none',
                                fontWeight: 700, borderRadius: '0.2vw', paddingLeft: '2rem',
                                paddingRight: '2rem', marginRight: '1rem', paddingTop: '0.5rem',
                                paddingBottom: '0.5rem', backgroundColor: 'rgba(51,51,51,0.5)'
                            }}
                            onMouseOver={(e) => { e.target.style.color = '#000'; e.target.style.backgroundColor = '#e6e6e6' }}
                            onMouseOut={(e) => { e.target.style.color = '#fff'; e.target.style.backgroundColor = 'rgba(51,51,51,0.5)' }}
                        >
                            Play
                        </button>
                        <button className="banner-button"
                            onClick={() => movie?.id && navigate(`/browse/${movie.id}`)}
                            style={{
                                cursor: 'pointer', color: '#fff', outline: 'none', border: 'none',
                                fontWeight: 700, borderRadius: '0.2vw', paddingLeft: '2rem',
                                paddingRight: '2rem', marginRight: '1rem', paddingTop: '0.5rem',
                                paddingBottom: '0.5rem', backgroundColor: 'rgba(51,51,51,0.5)'
                            }}
                        >
                            My List
                        </button>
                    </div>
                    <h1 style={{
                        width: '45rem',
                        lineHeight: '1.3',
                        paddingTop: '1rem',
                        fontSize: '0.8rem',
                        maxWidth: '360px',
                        height: '80px'
                    }}>
                        {truncate(movie?.description, 150)}
                    </h1>
                </div>
                <div style={{
                    height: '7.4rem',
                    backgroundImage: 'linear-gradient(180deg, transparent, rgba(37,37,37,0.61), #111)',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }} />
            </header>

            {/* Rows */}
            {/* Rows - passing category prop for cleaner API usage if we refactor Row, or keep as is but we need to ensure Row works. 
                Wait, Row uses fetchUrl string. api.js exports getMovies(category). 
                I should refactor Row to take 'category' prop instead of fetchUrl, OR pass fetchUrl that api.js can't handle directly?
                Actually, letting Row use axios internally (or api instance) is fine, but I need to fix poster_path there.
            */}
            <Row title="Trending Now" fetchUrl="/movies" isLargeRow />
            <Row title="Top Rated" fetchUrl="/movies" />
            <Row title="Action Movies" fetchUrl="/movies?category=Action" />
            <Row title="Comedy Movies" fetchUrl="/movies?category=Comedy" />
            <Row title="Romance Movies" fetchUrl="/movies?category=Romance" />
            <Row title="Documentaries" fetchUrl="/movies?category=Documentary" />
        </div>
    );
};

export default Home;
