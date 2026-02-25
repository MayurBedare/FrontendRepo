import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Save, Tags, Layout, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [aiReviewContent, setAiReviewContent] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const navigate = useNavigate();

    // Enhanced AI improvement logic
    const handleImprove = async () => {
        if (!content || content === '<p><br></p>') return toast.error('Please add some content first!');
        setLoadingAI(true);
        const loadingToast = toast.loading('AI is polishing your content...');
        try {
            // We send the current content to your backend which talks to Gemini
            const res = await api.post('/articles/ai/improve', {
                content,
                tone: 'professional'
            });

            setAiReviewContent(res.data.improvedContent);
            setShowReviewModal(true);
            toast.success('AI has improved your content!', { id: loadingToast });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'AI was unable to process this request.', { id: loadingToast });
        } finally {
            setLoadingAI(false);
        }
    };

    const applyImprovement = () => {
        setContent(aiReviewContent);
        setShowReviewModal(false);
        setAiReviewContent(null);
        toast.success('Improvements applied!');
    };

    const handleSuggestTags = async () => {
        if (!content || content === '<p><br></p>') return toast.error('Add some content first');
        setLoadingAI(true);
        try {
            const res = await api.post('/articles/ai/tags', { content });
            if (res.data.tags) {
                setSuggestedTags(res.data.tags);
                toast.success('Tags suggested!');
            }
        } catch (err) {
            toast.error('Tag suggestion failed');
        } finally {
            setLoadingAI(false);
        }
    };

    const addTag = (tag) => {
        const currentTags = category.split(',').map(t => t.trim()).filter(t => t !== '');
        if (!currentTags.includes(tag)) {
            const updatedTags = [...currentTags, tag];
            setCategory(updatedTags.join(', '));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return toast.error('Title and content are required');
        try {
            await api.post('/articles', { title, content, category });
            toast.success('Article published successfully!');
            navigate('/');
        } catch (err) {
            toast.error('Failed to create article');
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '900px' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Share your <span style={{ color: '#6366f1' }}>knowledge</span>
                </h1>
                <p style={{ color: 'gray', fontSize: '1.1rem' }}>
                    Compose your article and use AI to polish it to perfection.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="glass-effect" style={{ padding: '3rem', borderRadius: '1.5rem', background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Title Input */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'white' }}>Article Title</label>
                    <input
                        type="text"
                        placeholder="Enter a compelling title..."
                        style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.2)', color: 'white', outline: 'none', fontSize: '1.25rem', background: 'rgba(15, 23, 42, 0.3)' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Category Input */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'white' }}>Category</label>
                    <div style={{ position: 'relative' }}>
                        <Layout size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'gray' }} />
                        <input
                            type="text"
                            placeholder="e.g. AI, Backend, DevOps"
                            style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.2)', color: 'white', outline: 'none', background: 'rgba(15, 23, 42, 0.3)' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    {suggestedTags.length > 0 && (
                        <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span style={{ color: 'gray', fontSize: '0.9rem', width: '100%', marginBottom: '0.25rem' }}>Suggested by AI:</span>
                            {suggestedTags.map((tag, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addTag(tag)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        background: 'rgba(99, 102, 241, 0.15)',
                                        border: '1px solid rgba(99, 102, 241, 0.3)',
                                        borderRadius: '2rem',
                                        color: '#818cf8',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontWeight: 500
                                    }}
                                    className="hover-scale"
                                    onMouseOver={(e) => {
                                        e.target.style.background = 'rgba(99, 102, 241, 0.25)';
                                        e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'rgba(99, 102, 241, 0.15)';
                                        e.target.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                                    }}
                                >
                                    + {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Editor */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'white' }}>Content</label>
                    <div className="rich-editor-container" style={{ background: 'white', borderRadius: '0.75rem', overflow: 'hidden' }}>
                        <ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '350px', color: '#1e293b' }} />
                    </div>
                </div>

                {/* AI Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '5rem', marginBottom: '2.5rem' }}>
                    <button
                        type="button"
                        onClick={handleImprove}
                        disabled={loadingAI}
                        className="btn"
                        style={{
                            background: loadingAI ? '#4b5563' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                            color: 'white',
                            flex: '1',
                            minWidth: '180px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: loadingAI ? 'not-allowed' : 'pointer',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {loadingAI ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        {loadingAI ? 'AI is thinking...' : 'Improve with AI'}
                    </button>

                    <button
                        type="button"
                        onClick={handleSuggestTags}
                        disabled={loadingAI}
                        style={{
                            flex: '1',
                            minWidth: '180px',
                            color: 'white',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: loadingAI ? 'not-allowed' : 'pointer',
                            padding: '0.75rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Tags size={18} /> Suggest Tags
                    </button>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Save size={22} /> Publish Knowledge Base
                </button>
            </form>

            {/* AI Review Modal */}
            {showReviewModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
                    <div className="glass-effect animate-scale-up" style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '1.5rem', padding: '2.5rem', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6366f1' }}>
                                <Sparkles size={24} /> Review AI Improvements
                            </h2>
                            <button onClick={() => setShowReviewModal(false)} style={{ background: 'none', border: 'none', color: 'gray', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                        </div>

                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
                            The AI has polished your content for better readability and tone. Review the changes below:
                        </p>

                        <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', color: '#1e293b', marginBottom: '2.5rem', minHeight: '200px' }}>
                            <div className="rich-content" dangerouslySetInnerHTML={{ __html: aiReviewContent }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer' }}
                            >
                                Keep Original
                            </button>
                            <button
                                onClick={applyImprovement}
                                style={{ flex: 2, padding: '1rem', borderRadius: '0.75rem', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <Save size={18} /> Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateArticle;
