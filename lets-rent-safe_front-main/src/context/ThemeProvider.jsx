// src/context/ThemeProvider.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';

const getInitialTheme = () => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark' || currentTheme === 'light') {
        return currentTheme;
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme !== theme) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, [theme]);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};