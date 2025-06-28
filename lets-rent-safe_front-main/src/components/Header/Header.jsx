// src/components/Header/Header.jsx

import React, { useState } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getNavLinkClass = ({ isActive }) => clsx(styles.navLink, isActive && styles.active);

    return (
        <header className={styles.header}>
            <div className={styles.logoBlock}>
                <img src={logo} alt="logo" className={styles.logoImg} />
                <div className={styles.logoDivider} />
                <span className={styles.logoText}>Let’s rent safe</span>
            </div>

            <div className={styles.desktopNav}>
                <nav>
                    <NavLink to="/" className={getNavLinkClass}>Главная</NavLink>
                    <NavLink to="/catalog" className={getNavLinkClass}>Каталог</NavLink>
                    <NavLink to="/favorites" className={getNavLinkClass}>Избранное</NavLink>
                    <NavLink to="/developers" className={getNavLinkClass}>Застройщикам</NavLink>
                </nav>
                <ThemeSwitcher />
            </div>

            <div className={styles.mobileBurger}>
                <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>

            <div className={clsx(styles.mobileNav, isMenuOpen && styles.open)}>
                <nav>
                    <NavLink to="/" onClick={toggleMenu}>Главная</NavLink>
                    <NavLink to="/catalog" onClick={toggleMenu}>Каталог</NavLink>
                    <NavLink to="/favorites" onClick={toggleMenu}>Избранное</NavLink>
                    <NavLink to="/developers" onClick={toggleMenu}>Застройщикам</NavLink>
                </nav>
                <div className={styles.mobileThemeSwitcher}>
                    <p>Тема:</p>
                    <ThemeSwitcher />
                </div>
            </div>

            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}

        </header>
    );
};

export default Header;