import React, { useState, useEffect, useRef } from 'react';
import '../styles/PasswordOverlay.css';
import { gsap } from 'gsap';

const PasswordOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const overlayRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const dismissed = localStorage.getItem('passwordOverlayDismissed');
        if (dismissed !== 'true') {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }
    }, []);

    useEffect(() => {
        if (isVisible && !isHiding) {
            gsap.fromTo(
                containerRef.current,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 1, ease: 'power3.out' }
            );

            gsap.from('.title', { y: -20, opacity: 0, delay: 1, duration: 0.5 });
            gsap.from('.subtitle', { y: -10, opacity: 0, delay: 1.1, duration: 0.5 });
            gsap.from('.input', { y: -10, opacity: 0, delay: 1.2, duration: 0.5 });
            gsap.from('.button', { y: -10, opacity: 0, delay: 1.4, duration: 0.5 });
        }
    }, [isVisible, isHiding]);

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('passwordOverlayDismissed', 'true');
        setIsHiding(true);

        // Animar salida igual que entrada, pero en reversa (hacia la izquierda)
        gsap.to(containerRef.current, {
            x: '-100%',
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in',
            onComplete: () => {
                setIsVisible(false);
                setIsHiding(false);
                document.body.style.overflow = 'auto';
            },
        });
    };

    if (!isVisible) return null;

    return (
        <div className="password-overlay" ref={overlayRef}>
            <div className="password-container" ref={containerRef}>
                <h2 className="title">Bienvenidos</h2>
                <p className="subtitle">NOS EMBARCAMOS EN UNA AVENTURA Y NUESTRA BODA NO ESTARÍA COMPLETA SIN TU PRESENCIA</p>
                <form onSubmit={handleSubmit}>
                    <input className="input" type="password" placeholder="Ingresá la contraseña" />
                    <button className="button" type="submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordOverlay;
