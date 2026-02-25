import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, User, Home } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
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
