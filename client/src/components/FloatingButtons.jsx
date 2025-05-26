import React from 'react';
import '../styles/FloatingButtons.css';
import MusicPlayerButton from './MusicPlayerButton'; // Asumo que tienes este componente
import CTAButton from './CTAButton'; // El botón para confirmar asistencia

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <CTAButton />
      <MusicPlayerButton />
    </div>
  );
};

export default FloatingButtons;
