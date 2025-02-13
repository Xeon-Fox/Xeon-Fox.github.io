// Desktop.js
import React from 'react';

const Desktop = ({ windows, openWindow }) => {
  return (
    <div className="desktop">
      {windows.map((w, index) => (
        <div
          key={w.id}
          className="desktopicon"
          onClick={() => openWindow(w.id)}
          style={{ position: 'relative', marginBottom: '10px' }}
        >
          <div style={{ position: 'absolute', left: 20, userSelect: 'none' }}>
            <img
              src={w.icon}
              alt={w.title}
              style={{
                justifyContent: 'flex-start',
                display: 'flex',
                maxHeight: '50px',
              }}
            />
            <p style={{ color: 'white', marginLeft: '11px' }}>{w.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desktop;
