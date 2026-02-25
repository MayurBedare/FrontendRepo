import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { Search, Calendar } from 'lucide-react';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Tech', 'AI', 'Backend', 'Frontend', 'DevOps', 'General'];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get('/articles');
                setArticles(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchArticles();
    }, []);

    const filteredArticles = articles.filter(a => {
        const matchesSearch =
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                    Knowledge for the <span style={{ color: 'var(--primary)' }}>AI Era</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Discover technical insights and share your expertise with a global community of developers.
                </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem', alignItems: 'center' }}>
                <div className="glass-effect" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1.25rem', flex: 1, minWidth: '300px' }}>
                    <Search size={20} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search by title, content or tags..."
                        style={{ background: 'transparent', border: 'none', color: 'white', marginLeft: '0.75rem', outline: 'none', width: '100%', fontSize: '1rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'glass-effect'}`}
                            style={{ padding: '0.5rem 1.25rem', color: 'white' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
                {filteredArticles.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0' }}>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>No articles found matching your criteria.</p>
                    </div>
                )}
                {filteredArticles.map(article => (
                    <div key={article.id} className="article-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {article.category || 'General'}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Calendar size={14} /> {new Date(article.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, lineHeight: 1.3 }}>{article.title}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                            {article.summary || article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                                    {article.User?.username?.[0].toUpperCase() || 'U'}
                                </div>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 500 }}>{article.User?.username || 'Unknown'}</span>
                            </div>
                            <Link to={`/article/${article.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Read More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
