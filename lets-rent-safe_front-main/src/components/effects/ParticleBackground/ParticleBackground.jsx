// src/components/ParticleBackground/ParticleBackground.jsx

import React, { useRef, useEffect } from 'react';
import styles from './ParticleBackground.module.scss';
import { useTheme } from '../../../context/ThemeContext.jsx'; // <<< 1. Импортируем хук темы

const ParticleBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const themeColors = {
            light: {
                background: '#f7fafc',
                particle: 'rgba(45, 55, 72, 0.7)',
                line: 'rgba(45, 55, 72, 0.5)'
            },
            dark: {
                background: '#20232a',
                particle: 'rgba(255, 255, 255, 0.5)',
                line: 'rgba(255, 255, 255, 0.2)'
            }
        };

        const currentColors = themeColors[theme] || themeColors.light;

        // Устанавливаем фон контейнера, чтобы он совпадал с фоном canvas
        if(canvas.parentElement) {
            canvas.parentElement.style.backgroundColor = currentColors.background;
        }


        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 1;
                this.baseSpeedX = (Math.random() - 0.5);
                this.baseSpeedY = (Math.random() - 0.5);
                this.alpha = Math.random() * 0.5 + 0.3;
            }

            update() {
                const speedFactor = config.particleSpeed;
                this.x += this.baseSpeedX * speedFactor;
                this.y += this.baseSpeedY * speedFactor;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < config.mouseRadius) {
                        const force = (config.mouseRadius - distance) / config.mouseRadius;
                        this.x -= (dx / distance) * force * 2;
                        this.y -= (dy / distance) * force * 2;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = currentColors.particle.replace(/, [0-9.]+\)/, `, ${this.alpha})`);
                ctx.fill();
            }
        }

        const getParticleCount = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth > 1920) {
                return 120;
            }
            if (screenWidth > 1200) {
                return 80;
            }
            if (screenWidth > 768) {
                return 50;
            }
            return 35;
        };

        const config = {
            particleCount: getParticleCount(),
            particleSpeed: 0.5,
            connectionDistance: 180,
            mouseRadius: 150,
        };

        let particles = [];
        let mouse = { x: null, y: null, active: false };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            config.particleCount = getParticleCount();
            initParticles();
        };

        setCanvasSize();

        const handleResize = () => setCanvasSize();
        const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
        const handleMouseOut = () => { mouse.active = false; };
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                mouse.active = true;
            }
        };
        const handleTouchEnd = () => { mouse.active = false; };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const distance = Math.sqrt(
                        Math.pow(particles[i].x - particles[j].x, 2) +
                        Math.pow(particles[i].y - particles[j].y, 2)
                    );

                    if (distance < config.connectionDistance) {
                        const opacity = 1 - (distance / config.connectionDistance);
                        ctx.strokeStyle = currentColors.line.replace(/, [0-9.]+\)/, `, ${opacity})`);
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.fillStyle = currentColors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className={styles.particleContainer}>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </div>
    );
};

export default ParticleBackground;