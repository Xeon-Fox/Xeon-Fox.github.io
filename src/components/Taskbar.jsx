// components/Taskbar.js
import React, { useEffect, useRef, useState } from 'react';

const Taskbar = ({
  windows,
  activeWindowId,
  toggleWindowVisibility,
  bringToFront,
  hideAllWindows,
  openWindow, // обязательно прокидываем из App.js
}) => {
  const taskbarIconsRef = useRef(null);
  const startMenuRef = useRef(null);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // ----------------------
  // 1. Обновление времени и даты
  // ----------------------
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = currentTime.toLocaleDateString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // ----------------------
  // 2. Динамический градиент иконок при наведении
  // ----------------------
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!taskbarIconsRef.current) return;
      const cards = taskbarIconsRef.current.querySelectorAll('.taskbarbutton');
      cards.forEach((card) => {
        const taskbarIcon = card.querySelector('.taskbaricon');
        if (taskbarIcon) {
          const canvas = document.createElement('canvas');
          canvas.width = taskbarIcon.clientWidth;
          canvas.height = taskbarIcon.clientHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(taskbarIcon, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

          let totalR = 0, totalG = 0, totalB = 0;
          for (let i = 0; i < imageData.length; i += 4) {
            totalR += imageData[i];
            totalG += imageData[i + 1];
            totalB += imageData[i + 2];
          }
          const numPixels = imageData.length / 4;
          const averageR = Math.round(totalR / numPixels);
          const averageG = Math.round(totalG / numPixels);
          const averageB = Math.round(totalB / numPixels);

          const brightnessMultiplier = 1.5;
          const brighterR = Math.min(255, averageR * brightnessMultiplier);
          const brighterG = Math.min(255, averageG * brightnessMultiplier);
          const brighterB = Math.min(255, averageB * brightnessMultiplier);
          const brighterColor = `rgb(${brighterR}, ${brighterG}, ${brighterB})`;

          card.style.setProperty('--img-colour', brighterColor);
        }

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const taskbarIcons = taskbarIconsRef.current;
    if (taskbarIcons) {
      taskbarIcons.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (taskbarIcons) {
        taskbarIcons.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // ----------------------
  // 3. Закрытие Start Menu при клике вне его области
  // ----------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target)) {
        setShowStartMenu(false);
      }
    };

    if (showStartMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStartMenu]);

  // ----------------------
  // 4. Открытие/закрытие Start Menu через кнопку
  // ----------------------
  const handleStartMenuApp = (id) => {
    if (openWindow) {
      openWindow(id);
    }
    setShowStartMenu(false); // закрываем меню Пуск
  };

  return (
    <div className="taskbar">
      {/* Кнопка Пуск */}
      <button
        className="startbutton"
        onClick={() => setShowStartMenu((prev) => !prev)}
      ></button>

      <div className="startorb"></div>

      {/* Иконки открытых приложений в таскбаре */}
      <div className="taskbaricons" id="taskbaricons" ref={taskbarIconsRef}>
        {windows.map((w) => (
          <button
            key={w.id}
            className={`taskbarbutton ${
              activeWindowId === w.id ? 'taskbarfocused' : ''
            }`}
            onClick={() => {
              toggleWindowVisibility(w.id);
              if (!w.visible) {
                bringToFront(w.id);
              }
            }}
          >
            <img
              className="taskbaricon"
              draggable="false"
              src={w.icon}
              alt={w.title}
            />
          </button>
        ))}
      </div>

      {/* Дата/время справа */}
      <div
        className="datetime"
        style={{
          position: 'absolute',
          right: '40px',
          top: 0,
          width: '60px',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '12px',
          lineHeight: '14px',
          textAlign: 'center',
        }}
      >
        <div>{timeString}</div>
        <div>{dateString}</div>
      </div>

      {/* AeroPeek */}
      <div
        className="aeropeek"
        onClick={() => {
          hideAllWindows();
        }}
      ></div>

      {/* Start Menu */}
      {showStartMenu && (
        <div ref={startMenuRef} className="start">
          <div className="startrightcontainer">
            {/* Ваш профиль */}
            <div className="profileicon startprofileimage">
              <img
                src="resources/svg/avframe.svg"
                className="glass profile-border"
                alt="Avatar Frame"
              />
              <img
                src="resources/img/pfp.jpg"
                className="profileimg"
                alt="Profile"
              />
            </div>

            {/* Кнопки приложений */}
            <div className="startmenuexplorebuttons">
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('info')}
              >
                <img
                  src="resources/ico/help.ico"
                  alt="Info Icon"
                  style={{ marginRight: '5px', width: '20px', height: '20px' }}
                />
                Info
              </button>
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('links')}
              >
                <img
                  src="resources/ico/folder.ico"
                  alt="Links Icon"
                  style={{ marginRight: '5px', width: '20px', height: '20px' }}
                />
                Links
              </button>
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('projects')}
              >
                <img
                  src="resources/ico/projects.ico"
                  alt="Projects Icon"
                  style={{ marginRight: '5px', width: '20px', height: '20px' }}
                />
                Projects
              </button>
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('about')}
              >
                <img
                  src="resources/img/information.png"
                  alt="About Icon"
                  style={{ marginRight: '5px', width: '20px', height: '20px' }}
                />
                About Me
              </button>
            </div>
          </div>
          <div className="startinner"></div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
