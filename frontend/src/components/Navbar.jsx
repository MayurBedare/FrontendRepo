import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, User, Home } from 'lucide-react';

import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        const username = user?.username || 'friend';
        logout();

        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-[#1e293b] shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-white ring-opacity-10 border border-white/5`}
                style={{
                    padding: '1.25rem',
                    background: 'rgba(30, 41, 59, 0.95)',
                    backdropFilter: 'blur(12px)',
                    minWidth: '320px'
                }}
            >
                <div className="flex-1 w-0 p-1">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <div style={{
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem'
                            }}>
                                👋
                            </div>
                        </div>
                        <div className="ml-4 flex-1">
                            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }}>
                                Safe travels, {username}!
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.4 }}>
                                The Hub will miss your presence. Come back soon to see what's new!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-white/10 ml-4">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: '0 1rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: '#6366f1',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        ), { duration: 6000, position: 'top-center' });

        navigate('/');
    };

    return (
        <nav>
            <Link to="/" className="logo">AI Knowledge Hub</Link>
            <div className="nav-links">
                <Link to="/"><Home size={20} /> Home</Link>
                {user ? (
                    <>
                        <Link to="/create"><PlusCircle size={20} /> New Post</Link>
                        <Link to="/dashboard"><User size={20} /> My Articles</Link>
                        <button onClick={handleLogout} className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
