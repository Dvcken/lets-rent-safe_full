// src/components/BurgerMenu/BurgerMenu.jsx
import React from 'react';
import styles from './BurgerMenu.module.scss';
import clsx from 'clsx';

const BurgerMenu = ({ isOpen, onClick }) => {
    return (
        <div className={styles.wrapper} onClick={onClick} aria-label="Открыть меню">
            <div className={clsx(styles.container, isOpen && styles.active)}>
                <div className={`${styles.ball} ${styles.b1}`}></div>
                <div className={`${styles.ball} ${styles.b2}`}></div>
                <div className={`${styles.ball} ${styles.b3}`}></div>
            </div>
        </div>
    );
};

export default BurgerMenu;