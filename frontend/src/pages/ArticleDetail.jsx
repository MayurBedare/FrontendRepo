import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Calendar, User, Tag, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ArticleDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/articles/${id}`);
                setArticle(res.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchArticle();
    }, [id]);

    const handleDelete = () => {
        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>
                    Permanently delete this article?
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            const loadingToast = toast.loading('Deleting...');
                            try {
                                await api.delete(`/articles/${id}`);
                                toast.success('Article removed', { id: loadingToast });
                                navigate('/');
                            } catch (err) {
                                toast.error('Failed to delete', { id: loadingToast });
                            }
                        }}
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.4rem',
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: '#e2e8f0',
                            color: '#475569',
                            border: 'none',
                            borderRadius: '0.4rem',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000, position: 'top-center' });
    };

    if (loading) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading article...</div>;
    if (!article) return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Article not found.</div>;

    const isAuthor = user && user.id === article.author_id;

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '8rem', maxWidth: '850px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '3rem', fontWeight: 500 }} className="hover-link">
                <ArrowLeft size={18} /> Back to Hub
            </Link>

            <header style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem' }}>
                        {article.category || 'General'}
                    </span>
                    {isAuthor && (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <Link to={`/edit/${article.id}`} className="btn glass-effect" style={{ padding: '0.5rem 1rem', color: 'white' }}>
                                <Edit size={16} /> Edit
                            </Link>
                            <button onClick={handleDelete} className="btn glass-effect" style={{ padding: '0.5rem 1rem', color: '#ef4444' }}>
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    )}
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {article.title}
                </h1>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, color: 'white' }}>
                            {article.User?.username?.[0].toUpperCase() || 'U'}
                        </div>
                        <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{article.User?.username}</span>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} /> {new Date(article.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </header>

            <main className="glass-effect" style={{ padding: '4rem', borderRadius: '2rem', background: 'rgba(30, 41, 59, 0.5)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                <div className="rich-content" style={{ fontSize: '1.25rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: article.content }} />
            </main>

            {article.summary && (
                <section style={{ marginTop: '4rem', padding: '2.5rem', background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), transparent)', borderLeft: '5px solid var(--primary)', borderRadius: '0.5rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                        <Tag size={18} /> AI Key Takeaways
                    </h4>
                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.15rem' }}>{article.summary}</p>
                </section>
            )}

            <footer style={{ marginTop: '5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['#ExpertInsight', `#${article.category || 'Knowledge'}`, '#TechTalk'].map(tag => (
                    <span key={tag} className="glass-effect" style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{tag}</span>
                ))}
            </footer>
        </div>
    );
};

export default ArticleDetail;
