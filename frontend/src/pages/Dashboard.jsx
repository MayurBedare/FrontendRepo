import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Edit, Trash2, PlusCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyArticles = async () => {
            try {
                const res = await api.get('/articles');
                const user = JSON.parse(localStorage.getItem('user'));
                setArticles(res.data.filter(a => a.author_id === user.id));
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchMyArticles();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;
        try {
            await api.delete(`/articles/${id}`);
            setArticles(articles.filter(a => a.id !== id));
        } catch (err) {
            alert('Failed to delete article');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>My Articles</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and edit your published knowledge.</p>
                </div>
                <Link to="/create" className="btn btn-primary">
                    <PlusCircle size={20} /> Create New Post
                </Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading your articles...</div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {articles.length === 0 && (
                        <div className="glass-effect" style={{ padding: '4rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't written any articles yet.</p>
                            <Link to="/create" className="btn btn-primary">Write your first article</Link>
                        </div>
                    )}
                    {articles.map(article => (
                        <div key={article.id} className="article-card" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '0.75rem', color: 'var(--primary)' }}>
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{article.title}</h3>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{article.category}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(article.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to={`/edit/${article.id}`} className="btn glass-effect" style={{ padding: '0.6rem', width: '42px', height: '42px', color: 'white' }}>
                                    <Edit size={20} />
                                </Link>
                                <button onClick={() => handleDelete(article.id)} className="btn glass-effect" style={{ padding: '0.6rem', width: '42px', height: '42px', color: '#ef4444' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
