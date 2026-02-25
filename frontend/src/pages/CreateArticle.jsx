import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Save, Tags, Layout } from 'lucide-react';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const navigate = useNavigate();

    const handleImprove = async () => {
        if (!content) return alert('Add some content first');
        setLoadingAI(true);
        try {
            const res = await api.post('/articles/ai/improve', { content });
            setContent(res.data.improvedContent);
        } catch (err) {
            alert('AI improvement failed');
        }
        setLoadingAI(false);
    };

    const handleSuggestTags = async () => {
        if (!content) return alert('Add some content first');
        setLoadingAI(true);
        try {
            const res = await api.post('/articles/ai/tags', { content });
            alert('AI suggests: ' + res.data.tags.join(', '));
        } catch (err) {
            alert('Tag suggestion failed');
        }
        setLoadingAI(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return alert('Title and Content are required');
        try {
            await api.post('/articles', { title, content, category });
            navigate('/');
        } catch (err) {
            alert('Failed to create article');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '900px' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Share Your <span style={{ color: 'var(--primary)' }}>Knowledge</span></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Compose your article and use AI to polish it to perfection.</p>
            </div>

            <form onSubmit={handleSubmit} className="glass-effect" style={{ padding: '3rem', borderRadius: '1.5rem', background: 'rgba(30, 41, 59, 0.5)' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Article Title</label>
                    <input
                        type="text"
                        placeholder="Enter a compelling title..."
                        className="glass-effect"
                        style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', fontSize: '1.25rem', background: 'rgba(15, 23, 42, 0.3)' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Category</label>
                    <div style={{ position: 'relative' }}>
                        <Layout size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="e.g. AI, Backend, Frontend, DevOps"
                            className="glass-effect"
                            style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', borderRadius: '0.75rem', border: '1px solid var(--glass-border)', color: 'white', outline: 'none', background: 'rgba(15, 23, 42, 0.3)' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--text-light)' }}>Content</label>
                    <div className="rich-editor-container" style={{ background: 'white', borderRadius: '0.75rem', overflow: 'hidden' }}>
                        <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '350px', color: '#1e293b' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '5rem', marginBottom: '2.5rem' }}>
                    <button type="button" onClick={handleImprove} disabled={loadingAI} className="btn" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', flex: '1', minWidth: '180px' }}>
                        <Sparkles size={18} /> {loadingAI ? 'AI Polishing...' : 'Improve with AI'}
                    </button>
                    <button type="button" onClick={handleSuggestTags} disabled={loadingAI} className="btn glass-effect" style={{ flex: '1', minWidth: '180px', color: 'white' }}>
                        <Tags size={18} /> Suggest Tags
                    </button>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
                    <Save size={22} /> Publish Knowledge Base
                </button>
            </form>
        </div>
    );
};

export default CreateArticle;
