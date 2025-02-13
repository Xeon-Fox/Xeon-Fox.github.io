// App.js
import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import './App.css';

const App = () => {
  // Изначальное состояние окон: два окна - Info и Links
  const initialWindows = [
    {
      id: 'info',
      title: 'Info',
      icon: 'resources/img/information.png',
      visible: false,
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
      size: { width: 900, height: 'auto' },
      zIndex: 1,
    },
  ];

  const [windows, setWindows] = useState(initialWindows);
  const [currentZ, setCurrentZ] = useState(1);

  // Функция поднимает окно на передний план (обновляет zIndex)
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
  };

  // Обновление свойств окна по id
  const updateWindow = (id, newProps) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...newProps } : w))
    );
  };

  // Переключение видимости окна (используется и в панели задач)
  const toggleWindowVisibility = (id) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, visible: !w.visible } : w
      )
    );
  };

  // Открыть окно (по клику на иконку рабочего стола)
  const openWindow = (id) => {
    updateWindow(id, { visible: true });
    bringToFront(id);
  };

  return (
    <div className="desktop-container">
      {/* Компонент Desktop с иконками */}
      <Desktop windows={windows} openWindow={openWindow} />

      {/* Рендерим все окна, у которых visible === true */}
      {windows.map(
        (w) =>
          w.visible && (
            <Window
              key={w.id}
              windowData={w}
              bringToFront={bringToFront}
              updateWindow={updateWindow}
            >
              {/* Здесь можно вставить содержимое окна */}
              <div className="window-body">
                {w.title} content goes here.
              </div>
            </Window>
          )
      )}

      {/* Компонент панели задач */}
      <Taskbar
        windows={windows}
        toggleWindowVisibility={toggleWindowVisibility}
        bringToFront={bringToFront}
      />
    </div>
  );
};

export default App;
