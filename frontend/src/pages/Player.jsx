import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/api';

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

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

    if (!movie) return <div style={{ backgroundColor: 'black', height: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

    const videoSrc = movie.video_url && movie.video_url.startsWith('http') ? movie.video_url : `http://localhost:5000${movie.video_url}`;

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: 'black', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                top: 40,
                left: 40,
                zIndex: 10,
                cursor: 'pointer',
                color: 'white',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textShadow: '0 0 10px black'
            }} onClick={() => navigate(-1)}>
                <span style={{ fontSize: '40px' }}>←</span> Back to Browse
            </div>

            {videoSrc ? (
                <video
                    src={videoSrc}
                    autoPlay
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            ) : (
                <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    Video not available
                </div>
            )}
        </div>
    );
};
export default Player;
