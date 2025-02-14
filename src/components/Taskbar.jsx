// components/Taskbar.js
import React, { useEffect, useRef, useState } from 'react';

const Taskbar = ({
  windows,
  activeWindowId,
  toggleWindowVisibility,
  bringToFront,
  hideAllWindows,
}) => {
  const taskbarIconsRef = useRef(null);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Состояние для времени (и даты)
  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновляем время каждую секунду
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Форматируем время (12-часовой формат, часы:минуты)
  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Форматируем дату (месяц/день/год)
  const dateString = currentTime.toLocaleDateString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // Эффект для динамического градиента на иконках
  useEffect(() => {
    const handleMouseMove = (e) => {
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

  return (
    <div className="taskbar">
      <button
        className="startbutton"
        onClick={() => setShowStartMenu((prev) => !prev)}
      ></button>
      <div className="startorb"></div>
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

      <div
        className="aeropeek"
        onClick={() => {
          hideAllWindows();
        }}
      ></div>

      {showStartMenu && (
        <div className="start">
          <div className="startrightcontainer">
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
            <div className="startmenuexplorebuttons">
              <button className="StartMenuButton">Documents</button>
              <button className="StartMenuButton">Pictures</button>
              <button className="StartMenuButton">Music</button>
              <button className="StartMenuButton">Computer</button>
              <button className="StartMenuButton">Control Panel</button>
              <button className="StartMenuButton">Default Programs</button>
              <button className="StartMenuButton">Help and Support</button>
            </div>
          </div>
          <div className="startinner"></div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
