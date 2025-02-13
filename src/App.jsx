// App.js
import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import './App.css';

const App = () => {
  const initialWindows = [
    {
      id: 'info',
      title: 'Info',
      icon: 'resources/img/information.png',
      visible: true, // Окно Info открыто по умолчанию
      isMaximized: false,
      position: { top: 10, left: 20 },
      size: { width: 300, height: 200 },
      zIndex: 1,
    },
    {
      id: 'links',
      title: 'Links',
      icon: 'resources/ico/folder.ico',
      visible: false,
      isMaximized: false,
      position: { top: 10, left: 530 },
      size: { width: 900, height: 700 },
      zIndex: 1,
    },
  ];

  const [windows, setWindows] = useState(initialWindows);
  const [currentZ, setCurrentZ] = useState(1);
  const [activeWindowId, setActiveWindowId] = useState(null);

  // Поднимает окно на передний план и сохраняет его ID как активное
  const bringToFront = (id) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const newZ = currentZ + 1;
          setCurrentZ(newZ);
          return { ...w, zIndex: newZ };
        }
        return w;
      })
    );
    setActiveWindowId(id);
  };

  const updateWindow = (id, newProps) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...newProps } : w))
    );
  };

  // Переключает видимость окна и делает его активным
  const toggleWindowVisibility = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
    setActiveWindowId(id);
  };

  const openWindow = (id) => {
    updateWindow(id, { visible: true });
    bringToFront(id);
  };

  return (
    <div className="desktop-container">
      <Desktop windows={windows} openWindow={openWindow} />

      {windows.map(
        (w) =>
          w.visible && (
            <Window
              key={w.id}
              windowData={w}
              bringToFront={bringToFront}
              updateWindow={updateWindow}
            >
              <div className="window-content">
                {w.title} content goes here.
              </div>
            </Window>
          )
      )}

      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        toggleWindowVisibility={toggleWindowVisibility}
        bringToFront={bringToFront}
      />
    </div>
  );
};

export default App;
