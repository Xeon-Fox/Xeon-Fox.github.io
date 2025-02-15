// App.js
import React, { useState } from 'react';
import InfoContent from './components/WindowContents/InfoContent';
import LinksContent from './components/WindowContents/LinksContent';
import LoginOverlay from './components/LoginOverlay';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import './App.css';

const App = () => {
  const initialWindows = [
    {
      id: 'info',
      title: 'Info',
      icon: 'resources/ico/help.ico', // изменённая иконка для окна Info
      visible: true, // окно Info открыто по умолчанию
      isMaximized: false,
      position: { top: 50, left: 630 },
      defaultPosition: { top: 50, left: 630 },
      size: { width: 700, height: 800 },
      defaultSize: { width: 700, height: 800 },
      zIndex: 1,
    },
    {
      id: 'about',
      title: 'About Me',
      icon: 'resources/img/information.png',
      visible: false,
      isMaximized: false,
      position: { top: 70, left: 200 },
      defaultPosition: { top: 70, left: 200 },
      size: { width: 400, height: 300 },
      defaultSize: { width: 400, height: 300 },
      zIndex: 1,
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: 'resources/ico/projects.ico',
      visible: false,
      isMaximized: false,
      position: { top: 50, left: 100 },
      defaultPosition: { top: 50, left: 100 },
      size: { width: 600, height: 400 },
      defaultSize: { width: 600, height: 400 },
      zIndex: 1,
    },
    {
      id: 'links',
      title: 'Links',
      icon: 'resources/ico/folder.ico',
      visible: false,
      isMaximized: false,
      position: { top: 10, left: 530 },
      defaultPosition: { top: 10, left: 530 },
      size: { width: 900, height: 'auto' },
      defaultSize: { width: 900, height: 'auto' },
      zIndex: 1,
    },
  ];

  const [windows, setWindows] = useState(initialWindows);
  const [currentZ, setCurrentZ] = useState(1);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Поднимает окно на передний план и делает его активным
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

  // Функция закрытия окна: скрывает окно и сбрасывает его положение и размеры
  const closeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              visible: false,
              isMaximized: false,
              position: w.defaultPosition,
              size: w.defaultSize,
            }
          : w
      )
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  // Функция, скрывающая все окна (для AeroPeek)
  const hideAllWindows = () => {
    setWindows((prev) => prev.map((w) => ({ ...w, visible: false })));
    setActiveWindowId(null);
  };

  const openWindow = (id) => {
    updateWindow(id, { visible: true });
    bringToFront(id);
  };

  return (
    <div className="desktop-container">
      {/* Показываем логин-оверлей, если не залогинились */}
      {!loggedIn && <LoginOverlay onLogin={() => setLoggedIn(true)} />}

      <Desktop windows={windows} openWindow={openWindow} />

      {windows.map(
        (w) =>
          w.visible && (
            <Window
              key={w.id}
              windowData={w}
              bringToFront={bringToFront}
              updateWindow={updateWindow}
              closeWindow={closeWindow}
            >
              {w.id === 'links' ? (
                <LinksContent />
              ) : w.id === 'info' ? (
                <InfoContent />
              ) : (
                <div className="window-content">
                  {w.title} content goes here.
                </div>
              )}
            </Window>
          )
      )}

      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        toggleWindowVisibility={toggleWindowVisibility}
        bringToFront={bringToFront}
        hideAllWindows={hideAllWindows}
        openWindow={openWindow}
      />
    </div>
  );
};

export default App;
