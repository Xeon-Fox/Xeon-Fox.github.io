// src/components/LoginOverlay.js
import React from 'react';

const LoginOverlay = ({ onLogin }) => {
  const handleLoginClick = () => {
    const audio = new Audio("resources/audio/startup.mp3");
    audio.play().catch((err) => console.error("Audio play error:", err));
    onLogin();
  };

  return (
    <div className="login-overlay">
      <div className="profileicon" style={{marginBottom: '80px'}}>
        <img src="resources/svg/avframe.svg" className="glass profile-border" alt="Avatar Frame" style={{scale: '1.7'}} />
        <img src="resources/img/pfp.jpg" className="profileimg" alt="Profile" style={{scale: '1.7'}} />
      </div>
      <button className="forwardbtn" onClick={handleLoginClick}>
        <u>L</u>og In
      </button>
    </div>
  );
};

export default LoginOverlay;
