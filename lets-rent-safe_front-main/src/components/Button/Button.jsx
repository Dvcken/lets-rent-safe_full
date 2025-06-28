import React from 'react';
import styles from './Button.module.scss'; // Импорт стилей как объекта

// Для удобной работы с классами можно установить утилиту clsx: npm install clsx
import clsx from 'clsx';

const Button = ({ children, onClick, variant = 'primary' }) => {
    // clsx(styles.button, styles[variant]) -> 'Button_button__XYZ Button_primary__ABC'
    const buttonClasses = clsx(styles.button, styles[variant]);

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;