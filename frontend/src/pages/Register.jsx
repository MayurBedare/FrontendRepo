import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginHelper } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { username, email, password });
            toast.success('Account created! Welcome to the Hub. Please login to continue.');
            navigate('/');
        } catch (err) {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-effect" style={{ padding: '3.5rem', borderRadius: '1.5rem', width: '100%', maxWidth: '450px', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Join the Hub
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Start your journey in the AI Knowledge Hub today.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Username</label>
                        <input
                            type="text"
                            className="glass-effect"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: 'none', color: 'white', outline: 'none' }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                        <input
                            type="email"
                            className="glass-effect"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: 'none', color: 'white', outline: 'none' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
                        <input
                            type="password"
                            className="glass-effect"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: 'none', color: 'white', outline: 'none' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Sign Up</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
