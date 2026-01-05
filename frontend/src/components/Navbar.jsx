import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [show, handleShow] = useState(false);
    const { logout } = useAuth();

    const transition = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', transition);
        return () => window.removeEventListener('scroll', transition);
    }, []);

    return (
        <div className={`nav ${show ? 'nav-black' : ''}`} style={{
            position: 'fixed',
            top: 0,
            padding: '20px',
            width: '100%',
            height: '60px',
            zIndex: 100,
            transition: 'all 0.5s ease-in',
            backgroundColor: show ? '#111' : 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div className="nav-contents" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <Link to="/">
                    <img
                        style={{
                            width: '90px',
                            objectFit: 'contain',
                            cursor: 'pointer',
                            marginLeft: '20px'
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix Logo"
                    />
                </Link>

                <div style={{ marginRight: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Link to="/my-list" style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>My List</Link>
                    <Link to="/admin" style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>Admin Panel</Link>
                    <img
                        onClick={logout}
                        title="Logout"
                        style={{
                            width: '30px',
                            height: '30px',
                            objectFit: 'contain',
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Avatar"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
