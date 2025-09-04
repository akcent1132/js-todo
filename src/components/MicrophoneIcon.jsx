import React from 'react';
import './MicrophoneIcon.css';

const MicrophoneIcon = ({ 
  size = 40, 
  color = '#333', 
  className = '' 
}) => {
  return (
    <div 
      className={`microphone-icon ${className}`}
      style={{
        '--mic-size': `${size}px`,
        '--mic-color': color,
        width: `${size}px`,
        height: `${size * 1.4}px`,
      }}
    >
      {/* Microphone capsule/head */}
      <div className="mic-capsule"></div>
      
      {/* Microphone body */}
      <div className="mic-body"></div>
      
      {/* Microphone stand/base */}
      <div className="mic-stand">
        <div className="mic-stand-vertical"></div>
        <div className="mic-stand-horizontal"></div>
      </div>
      
      {/* Sound waves (optional visual enhancement) */}
      <div className="sound-waves">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </div>
  );
};

export default MicrophoneIcon;