// src/components/ThemeSwitcher/ThemeSwitcher.jsx

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';

    return (
        <div className={styles.solunaContainer}>
            <label className={styles.toggler}>
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={toggleTheme}
                    aria-label="Переключить тему"
                />

                <div className={styles.skyContainer}>
                    <div className={styles.starContainer}>
                        <span className={`${styles.star} ${styles.bigStar}`}></span>
                        <span className={`${styles.star} ${styles.bigStar}`}></span>
                        <span className={`${styles.star} ${styles.mediumStar}`}></span>
                        <span className={`${styles.star} ${styles.mediumStar}`}></span>
                        <span className={`${styles.star} ${styles.mediumStar}`}></span>
                        <span className={`${styles.star} ${styles.littleStar}`}></span>
                        <span className={`${styles.star} ${styles.littleStar}`}></span>
                        <span className={`${styles.star} ${styles.littleStar}`}></span>
                        <span className={`${styles.star} ${styles.littleStar}`}></span>
                        <span className={`${styles.star} ${styles.littleStar}`}></span>
                        <span className={`${styles.star} ${styles.littleStar}`}></span>
                    </div>

                    <div className={styles.cloudContainer}>
                        <div className={styles.backgroundClouds}>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                        </div>
                        <div className={styles.frontClouds}>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                            <span className={styles.cloud}></span>
                        </div>
                    </div>
                </div>

                <div className={styles.haloContainer}>
          <span className={styles.lightHalo}>
            <span className={styles.lightHalo}>
              <span className={`${styles.lightHalo} ${styles.inner}`}></span>
            </span>
          </span>
                </div>

                <div className={styles.toggle}>
                    <div className={styles.sunContainer}></div>
                    <div className={styles.moonContainer}>
                        <span className={styles.moonCrater}></span>
                        <span className={`${styles.moonCrater} ${styles.large}`}></span>
                        <span className={styles.moonCrater}></span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default ThemeSwitcher;