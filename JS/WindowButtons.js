// Получаем элементы
const minimizeButton = document.querySelector('[aria-label="Minimize"]');
const maximizeButton = document.querySelector('[aria-label="Maximize"]');
const closeButton = document.querySelector('[aria-label="Close"]');
const windowElement = document.getElementById('window');
const taskbarButton = document.querySelector('.taskbarbutton');

// Флаг для отслеживания состояния окна (развёрнуто/свёрнуто)
let isMaximized = false;

// Обработчик для сворачивания окна
minimizeButton.addEventListener('click', () => {
  windowElement.style.display = 'none';
  taskbarButton.classList.remove('taskbarfocused');
});

// Обработчик для разворачивания окна на весь экран
maximizeButton.addEventListener('click', () => {
  if (isMaximized) {
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
  isMaximized = !isMaximized;
});

// Обработчик для закрытия окна
closeButton.addEventListener('click', () => {
  windowElement.style.display = 'none';
  taskbarButton.classList.remove('taskbarfocused');
});

// Обработчик для нажатия на кнопку в панели задач
// Если окно свёрнуто, его нужно снова показать
// (необязательно, но добавляет реалистичность)
taskbarButton.addEventListener('click', () => {
  if (windowElement.style.display === 'none') {
    windowElement.style.display = 'block';
    taskbarButton.classList.add('taskbarfocused');
  }
});
