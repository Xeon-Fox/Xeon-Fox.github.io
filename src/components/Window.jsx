import React, { useRef, useEffect, useState } from 'react';

const Window = ({ windowData, bringToFront, updateWindow, closeWindow, children }) => {
  const windowRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [relPos, setRelPos] = useState({ x: 0, y: 0 });

  // начинание перетаскивания при зажатию заголовка
  const onMouseDown = (e) => {
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

  // обработка движении мыши
  const onMouseMove = (e) => {
    if (!dragging || windowData.isMaximized) return;
    const newLeft = e.clientX - relPos.x;
    const newTop = e.clientY - relPos.y;
    updateWindow(windowData.id, { position: { top: newTop, left: newLeft } });
  };

  // завершение перетаскивания
  const onMouseUp = () => {
    setDragging(false);
  };

  // --- Добавлено: обработка касаний для мобильных устройств ---
  const onTouchStart = (e) => {
    if (e.target.closest('.title-bar')) {
      const touch = e.touches[0];
      const rect = windowRef.current.getBoundingClientRect();
      setRelPos({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setDragging(true);
      bringToFront(windowData.id);
    }
  };

  const onTouchMove = (e) => {
    if (!dragging || windowData.isMaximized) return;
    const touch = e.touches[0];
    const newLeft = touch.clientX - relPos.x;
    const newTop = touch.clientY - relPos.y;
    updateWindow(windowData.id, { position: { top: newTop, left: newLeft } });
  };

  const onTouchEnd = () => {
    setDragging(false);
  };
  // --- Конец добавления касания ---

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragging, relPos]);

  // обработчики кнопок окна
  const handleMinimize = () => {
    updateWindow(windowData.id, { visible: false });
  };

  const handleMaximize = () => {
    if (windowData.isMaximized) {
      updateWindow(windowData.id, {
        isMaximized: false,
      });
    } else {
      updateWindow(windowData.id, { isMaximized: true });
    }
    bringToFront(windowData.id);
  };

  const handleClose = () => {
    closeWindow(windowData.id);
  };

  const style = windowData.isMaximized
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex: windowData.zIndex,
      }
    : {
        position: 'absolute',
        top: windowData.position.top,
        left: windowData.position.left,
        width: windowData.size.width,
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
      <div className="title-bar" onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        <img aria-label="windowicon" src={windowData.icon} alt="icon" />
        <div className="title-bar-text">{windowData.title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={handleMinimize}></button>
          <button aria-label="Maximize" onClick={handleMaximize}></button>
          <button aria-label="Close" onClick={handleClose}></button>
        </div>
      </div>
      <div
        className="window-body"
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: 'calc(100% - 30px)',
          overflow: 'auto',
          border: 'none',
          outline: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
