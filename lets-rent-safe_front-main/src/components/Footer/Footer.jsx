// src/components/Footer/Footer.jsx

import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>© {currentYear} Let’s Rent Safe.</p>
            <a
                href="https://lets-digit.ru"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.digitLink}
            >
                Powered by Let's Digit
            </a>
        </footer>
    );
};

export default Footer;