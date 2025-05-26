import React, { useEffect, useRef, useState } from 'react';
import '../styles/FloatingButtons.css';
import playIcon from '../../media/icons/play.webp';
import pauseIcon from '../../media/icons/pause.webp';
import song from '../../media/song/cancion-de-fondo.mp3';

const MusicPlayerButton = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // volumen al 50%
    }

    const canScroll = document.body.scrollHeight > window.innerHeight;
    if (!canScroll) return;

    const handleScroll = () => {
      if (!hasScrolled) {
        audioRef.current.play().catch(() => { });
        setIsPlaying(true);
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={song} loop />
      <button className="music-button" onClick={togglePlay}>
        <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
      </button>
    </>
  );
};

export default MusicPlayerButton;
