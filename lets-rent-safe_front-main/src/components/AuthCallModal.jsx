import React, { useState } from 'react';

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
};

const phoneStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
    color: '#007D88',
    cursor: 'pointer',
};

const buttonStyle = {
    background: '#007D88',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
};

const AuthCallModal = ({ isOpen, onClose, callPhone }) => {
    const [isCopied, setIsCopied] = useState(false);
    if (!isOpen) return null;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const handlePhoneClick = () => {
        if (isMobile) {
            window.location.href = `tel:${callPhone}`;
        } else {
            navigator.clipboard.writeText(callPhone);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };
    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2 style={{ fontSize: 20, marginBottom: 20, color: '#333' }}>Подтверждение авторизации</h2>
                <p style={{ marginBottom: 15, color: '#555' }}>
                    Для завершения авторизации позвоните на номер:
                </p>
                <div style={phoneStyle} onClick={handlePhoneClick} title={isMobile ? 'Позвонить' : 'Копировать номер'}>
                    {callPhone}
                    {!isMobile && isCopied && (
                        <span style={{ fontSize: 14, color: '#27ae60', marginLeft: 10 }}><br/>Скопировано!</span>
                    )}
                </div>
                <p style={{ marginBottom: 15, color: '#555' }}>
                    После звонка система автоматически подтвердит вашу авторизацию.
                </p>
                <button style={buttonStyle} onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default AuthCallModal; 