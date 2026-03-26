import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <nav className="navbar" style={{ backgroundColor: 'transparent', borderBottom: 'none' }}>
                <div className="nav-brand">TaskMaster</div>
                <div className="nav-links">
                    <Link to="/login" className="nav-link">Sign In</Link>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Get Started</Link>
                </div>
            </nav>
            
            <main className="hero-section">
                <div className="hero-content animate-fade-in">
                    <div className="badge badge-in-progress" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem' }}>
                        ✨ The New Standard for Productivity
                    </div>
                    <h1 className="hero-title">
                        Manage Your Tasks with <span className="highlight">Elegance</span>
                    </h1>
                    <p className="hero-subtitle">
                        Experience the ultimate productivity tool. Secure, scalable, and beautifully designed for individuals, teams, and administrators.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary btn-lg">Start for Free</Link>
                        <Link to="/login" className="btn btn-secondary btn-lg">Access Dashboard</Link>
                    </div>
                </div>
                
                <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="glass-card mockup-card">
                        <div className="mockup-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                        </div>
                        <div className="mockup-body">
                            <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
                            <div className="skeleton w-75"></div>
                            <div className="skeleton w-50"></div>
                            <div className="skeleton" style={{ marginTop: 'auto' }}></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
