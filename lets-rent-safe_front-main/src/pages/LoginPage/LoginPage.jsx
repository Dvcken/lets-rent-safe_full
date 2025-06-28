import React from 'react';
import AuthFormPrism from '../../features/auth/AuthFormPrism/AuthFormPrism.jsx';
import ParticleBackground from '../../components/effects/ParticleBackground/ParticleBackground';

const LoginPage = () => {
    const pageStyles = {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    };

    return (
        <div style={pageStyles} className="login-page">
            <ParticleBackground />
            <AuthFormPrism />
        </div>
    );
};

export default LoginPage;