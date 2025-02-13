// Window.js
import React, { useRef, useEffect, useState } from 'react';

const Window = ({ windowData, bringToFront, updateWindow, children }) => {
  const windowRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });

  // Обработчик начала перетаскивания
  const onMouseDown = (e) => {
    // Если клик по заголовку окна
    if (e.target.closest('.title-bar')) {
      const rect = windowRef.current.getBoundingClientRect();
      setRelPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setDragging(true);
      bringToFront(windowData.id);
    }
  };

  // Обработчик движения мыши
  const onMouseMove = (e) => {
    if (!dragging || windowData.isMaximized) return;
    const newLeft = e.clientX - relPos.x;
    const newTop = e.clientY - relPos.y;
    updateWindow(windowData.id, { position: { top: newTop, left: newLeft } });
  };

  // Завершение перетаскивания
  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, relPos]);

  // Обработчики для кнопок окна
  const handleMinimize = () => {
    updateWindow(windowData.id, { visible: false });
  };

  const handleMaximize = () => {
    if (windowData.isMaximized) {
      // Возвращаем предыдущее положение и размер
      updateWindow(windowData.id, {
        isMaximized: false,
        position: { top: 10, left: windowData.id === 'links' ? 530 : 20 },
        size: windowData.id === 'links'
          ? { width: 900, height: 'auto' }
          : windowData.size,
      });
    } else {
      updateWindow(windowData.id, {
        isMaximized: true,
      });
    }
    bringToFront(windowData.id);
  };

  const handleClose = () => {
    updateWindow(windowData.id, { visible: false, isMaximized: false });
  };

  // Вычисляем стили окна
  const style = windowData.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: windowData.zIndex,
      }
    : {
        position: 'absolute',
        top: windowData.position.top,
        left: windowData.position.left,
        width: windowData.size.width,
        // Если высота задана числом, можно добавить 'px'
        height:
          typeof windowData.size.height === 'number'
            ? windowData.size.height + 'px'
            : windowData.size.height,
        zIndex: windowData.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className="window"
      style={style}
      onMouseDown={() => bringToFront(windowData.id)}
    >
      <div className="title-bar" onMouseDown={onMouseDown}>
        <img
          aria-label="windowicon"
          src={windowData.icon}
          alt="icon"
        />
        <div className="title-bar-text">{windowData.title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={handleMinimize}></button>
          <button aria-label="Maximize" onClick={handleMaximize}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      {/* Содержимое окна */}
      {children}
    </div>
  );
};

export default Window;
