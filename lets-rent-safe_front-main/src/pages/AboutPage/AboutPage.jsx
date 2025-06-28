// src/pages/AboutPage/AboutPage.jsx
import React from 'react';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
    return (
        <div className={styles.page}>
            <h1>О нас</h1>
            <p>Платформа прямых продаж квартир от застройщиков.</p>
        </div>
    );
};

export default AboutPage;