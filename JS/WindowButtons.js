// Получаем все окна и связанные элементы
const windows = document.querySelectorAll('.window');
const minimizeButtons = document.querySelectorAll('[aria-label="Minimize"]');
const maximizeButtons = document.querySelectorAll('[aria-label="Maximize"]');
const closeButtons = document.querySelectorAll('[aria-label="Close"]');
const taskbarButtons = document.querySelectorAll('.taskbarbutton');
const aeroPeekDiv = document.querySelector('.aeropeek');

// Флаг для отслеживания состояния каждого окна (развёрнуто/свёрнуто)
const windowStates = Array.from(windows).map(() => ({ isMaximized: false }));

windows.forEach((windowElement, index) => {
  const minimizeButton = minimizeButtons[index];
  const maximizeButton = maximizeButtons[index];
  const closeButton = closeButtons[index];
  const taskbarButton = taskbarButtons[index];

  // Сворачивание окна
  if (minimizeButton) {
    minimizeButton.addEventListener('click', () => {
      windowElement.style.display = 'none';
      if (taskbarButton) taskbarButton.classList.remove('taskbarfocused');
    });
  }

  // Развёртывание окна
  if (maximizeButton) {
    maximizeButton.addEventListener('click', () => {
      if (windowStates[index].isMaximized) {
        // Вернуть окно в исходный размер
        windowElement.style.position = 'absolute';
        windowElement.style.top = '10px';
        windowElement.style.left = '530px';
        windowElement.style.width = '900px';
        windowElement.style.height = 'auto';
      } else {
        // Развернуть окно на весь экран
        windowElement.style.position = 'fixed';
        windowElement.style.top = '0';
        windowElement.style.left = '0';
        windowElement.style.width = '100vw';
        windowElement.style.height = '100vh';
      }
      windowStates[index].isMaximized = !windowStates[index].isMaximized;
    });
  }

  // Закрытие окна
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      windowElement.style.display = 'none';
      if (taskbarButton) taskbarButton.classList.remove('taskbarfocused');

      // Сброс позиции окна на исходную
      windowElement.style.top = '10px';
      windowElement.style.left = '530px';
      windowElement.style.width = '900px';
      windowElement.style.height = 'auto';
      windowStates[index].isMaximized = false;
    });
  }

  // Нажатие на кнопку панели задач
  if (taskbarButton) {
    taskbarButton.addEventListener('click', () => {
      if (windowElement.style.display === 'none') {
        windowElement.style.display = 'block';
        taskbarButton.classList.add('taskbarfocused');
      } else {
        windowElement.style.display = 'none';
        taskbarButton.classList.remove('taskbarfocused');
      }
    });
  }
});

// Обработчик для сворачивания всех окон при нажатии на Aero Peek
if (aeroPeekDiv) {
  aeroPeekDiv.addEventListener('click', () => {
    windows.forEach((windowElement, index) => {
      windowElement.style.display = 'none';
      if (taskbarButtons[index]) taskbarButtons[index].classList.remove('taskbarfocused');
    });
  });
}

// Логика для нового окна с кнопкой OK
const mobileWarningWindow = document.getElementById('windowmobile');
const okButton = mobileWarningWindow.querySelector('button');
const closeButton = mobileWarningWindow.querySelector('[aria-label="Close"]');

if (okButton) {
  okButton.addEventListener('click', () => {
    mobileWarningWindow.classList.add('hidden');
  });
}

if (closeButton) {
  closeButton.addEventListener('click', () => {
    mobileWarningWindow.classList.add('hidden');
  });
}
