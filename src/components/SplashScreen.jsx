import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import hfFav from '../assets/hf-fav.png';

const SplashScreen = () => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen${hide ? ' splash-hide' : ''}`}>
      <img
        src={hfFav}
        alt="HappyFox Logo"
        className="splash-logo"
        draggable="false"
      />
    </div>
  );
};

export default SplashScreen; 