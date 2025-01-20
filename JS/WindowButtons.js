// Получаем все окна и связанные элементы
const windows = document.querySelectorAll('.window');
const minimizeButtons = document.querySelectorAll('[aria-label="Minimize"]');
const maximizeButtons = document.querySelectorAll('[aria-label="Maximize"]');
const closeButtons = document.querySelectorAll('[aria-label="Close"]');
const taskbarButtons = document.querySelectorAll('.taskbarbutton');
const aeroPeekDiv = document.querySelector('.aeropeek');

// Флаг для отслеживания состояния каждого окна (развёрнуто/свёрнуто)
const windowStates = Array.from(windows).map(() => ({ isMaximized: false, isVisible: true }));

// Устанавливаем логику для фокусировки окна
function focusWindow(focusedWindow) {
  windows.forEach((windowElement) => {
    if (windowElement === focusedWindow) {
      windowElement.style.zIndex = '1'; // Передний план
    } else {
      windowElement.style.zIndex = '0'; // Задний план
    }
  });
}

// Обновляем логику для каждого окна
windows.forEach((windowElement, index) => {
  const minimizeButton = minimizeButtons[index];
  const maximizeButton = maximizeButtons[index];
  const closeButton = closeButtons[index];
  const taskbarButton = taskbarButtons[index];

  // Устанавливаем обработчик фокуса на окно
  windowElement.addEventListener('mousedown', () => {
    focusWindow(windowElement);
  });

  // Сворачивание окна
  minimizeButton.addEventListener('click', () => {
    windowElement.style.display = 'none';
    windowStates[index].isVisible = false;
    taskbarButton.classList.remove('taskbarfocused');
  });

  // Развёртывание окна
  maximizeButton.addEventListener('click', () => {
    if (windowStates[index].isMaximized) {
      windowElement.style.position = 'absolute';
      windowElement.style.top = '10px';
      windowElement.style.left = '530px';
      windowElement.style.width = '900px';
      windowElement.style.height = 'auto';
    } else {
      windowElement.style.position = 'fixed';
      windowElement.style.top = '0';
      windowElement.style.left = '0';
      windowElement.style.width = '100vw';
      windowElement.style.height = '100vh';
    }
    windowStates[index].isMaximized = !windowStates[index].isMaximized;
    focusWindow(windowElement); // Ставим окно на передний план при развёртывании
  });

  // Закрытие окна
  closeButton.addEventListener('click', () => {
    windowElement.style.display = 'none';
    windowStates[index].isVisible = false;
    taskbarButton.classList.remove('taskbarfocused');
    windowElement.style.top = '10px';
    windowElement.style.left = '530px';
    windowElement.style.width = '900px';
    windowElement.style.height = 'auto';
    windowStates[index].isMaximized = false;
  });

  // Нажатие на кнопку панели задач
  taskbarButton.addEventListener('click', () => {
    if (windowStates[index].isVisible) {
      windowElement.style.display = 'none';
      windowStates[index].isVisible = false;
      taskbarButton.classList.remove('taskbarfocused');
    } else {
      windowElement.style.display = 'block';
      windowStates[index].isVisible = true;
      taskbarButton.classList.add('taskbarfocused');
      focusWindow(windowElement); // Ставим окно на передний план при открытии
    }
  });
});

// Обработчик для сворачивания всех окон при нажатии на Aero Peek
if (aeroPeekDiv) {
  aeroPeekDiv.addEventListener('click', () => {
    windows.forEach((windowElement, index) => {
      windowElement.style.display = 'none';
      windowStates[index].isVisible = false;
      taskbarButtons[index].classList.remove('taskbarfocused');
    });
  });
};

// Обновляем DesktopButtons.js, если есть
const desktopIcons = document.querySelectorAll('.desktopicon');
desktopIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    if (!windowStates[index].isVisible) {
      windows[index].style.display = 'block';
      windowStates[index].isVisible = true;
      taskbarButtons[index].classList.add('taskbarfocused');
      focusWindow(windows[index]); // Ставим окно на передний план при открытии
    }
  });
});
