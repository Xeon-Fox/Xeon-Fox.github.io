// components/Desktop.js
import React from 'react';

const Desktop = ({ windows, openWindow }) => {
  return (
    <div className="desktop">
      {windows.map((w) => (
        <div
          key={w.id}
          className="desktopicon"
          style={{
            width: '90px',    // фиксированная ширина
            height: '75px',    // фиксированная высота
            marginBottom: '10px',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => openWindow(w.id)}
        >
          <div style={{ 
              userSelect: 'none', 
              textAlign: 'center', 
              width: '100%', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <img
              src={w.icon}
              alt={w.title}
              style={{
                maxHeight: '50px',
                display: 'block',
                margin: '0 auto',
              }}
            />
            <p style={{ color: 'white', margin: '0', fontSize: '0.8em' }}>
              {w.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desktop;
