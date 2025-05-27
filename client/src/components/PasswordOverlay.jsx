import React, { useState, useEffect, useRef } from 'react';
import '../styles/PasswordOverlay.css';
import { gsap } from 'gsap';

const PasswordOverlay = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const [passwordPreviouslyEntered, setPasswordPreviouslyEntered] = useState(false);
    const [error, setError] = useState('');

    const overlayRef = useRef(null);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const dismissed = localStorage.getItem('passwordOverlayDismissed');
        if (dismissed === 'true') {
            setPasswordPreviouslyEntered(true);
        }
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
    }, []);

    useEffect(() => {
        if (isVisible && !isHiding) {
            const tl = gsap.timeline();

            tl.fromTo(
                containerRef.current,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 1, ease: 'power3.out' }
            );

            tl.fromTo('.title',
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 }
            );

            tl.fromTo('.subtitle',
                { y: -10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                "-=0.3"
            );

            if (!passwordPreviouslyEntered) {
                tl.fromTo('.input',
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5 }
                );

                tl.fromTo('.button',
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5 }
                );
            } else {
                tl.fromTo('.button',
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5 }
                );
            }
        }
    }, [isVisible, isHiding, passwordPreviouslyEntered]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // solo si no pasó la contraseña antes, chequeamos input
        if (!passwordPreviouslyEntered) {
            const enteredPassword = inputRef.current.value;

            if (enteredPassword === 'boda') {
                localStorage.setItem('passwordOverlayDismissed', 'true');
                setPasswordPreviouslyEntered(true);
                setError('');
                setIsHiding(true);

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
            } else {
                setError('Contraseña incorrecta.');
            }
        } else {
            // Si ya pasó la contraseña antes y solo clickea el botón
            setIsHiding(true);

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
        }
    };

    if (!isVisible) return null;

    return (
        <div className="password-overlay" ref={overlayRef}>
            <div className="password-container" ref={containerRef}>
                <h2 className="title">Bienvenidos</h2>
                <p className="subtitle">
                    NOS EMBARCAMOS EN UNA AVENTURA Y NUESTRA BODA NO ESTARÍA COMPLETA SIN TU PRESENCIA
                </p>
                {!passwordPreviouslyEntered && (
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input"
                            type="password"
                            placeholder="Ingresá la contraseña"
                            ref={inputRef}
                        />
                        {error && <p className='error'>{error}</p>}
                        <button className="button" type="submit">Ingresar</button>
                    </form>
                )}
                {passwordPreviouslyEntered && (
                    <button className="button" onClick={handleSubmit}>Ingresar</button>
                )}
            </div>
        </div>
    );
};

export default PasswordOverlay;
