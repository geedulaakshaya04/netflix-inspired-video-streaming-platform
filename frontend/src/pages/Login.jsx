import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="auth-wrapper" style={{
            backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e2-fc6d-4954-9ca0-f6daecc19832/web/IN-en-20240902-TRIFECTA-perspective_2276532d-6e42-4f0e-b2d9-31778ff05e04_large.jpg)',
            backgroundSize: 'cover',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}></div>
            <div className="auth-box" style={{
                zIndex: 1,
                backgroundColor: 'rgba(0,0,0,0.75)',
                padding: '60px 68px 40px',
                borderRadius: '4px',
                width: '100%',
                maxWidth: '450px',
                minHeight: '660px'
            }}>
                <h1 style={{ marginBottom: '28px' }}>Sign In</h1>
                {error && <div style={{ background: '#e87c03', padding: '10px', borderRadius: '4px', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        className="text-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="text-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px', padding: '16px' }}>Sign In</button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '13px', color: '#b3b3b3' }}>
                        <label><input type="checkbox" /> Remember me</label>
                        <span>Need help?</span>
                    </div>
                </form>
                <div style={{ marginTop: '100px', color: '#737373' }}>
                    New to Netflix? <Link to="/signup" style={{ color: 'white', cursor: 'pointer' }}>Sign up now.</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
