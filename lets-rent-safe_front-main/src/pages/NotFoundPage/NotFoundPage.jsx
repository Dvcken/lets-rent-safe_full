import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../HomePage/HomePage.module.scss';

const NotFoundPage = () => {
    return (
        <div className={styles.page}>
            <h1>404 - Страница не найдена</h1>
            <p>Кажется, вы зашли не туда. Давайте вернемся на главную.</p>
            <Link to="/">На главную</Link>
        </div>
    );
};

export default NotFoundPage;