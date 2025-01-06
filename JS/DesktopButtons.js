// Получаем элементы для взаимодействия
const desktopInfoIcon = document.querySelector('.desktopicon:nth-child(1)'); // Первый элемент Info

// Обработчик для открытия окна при нажатии на значок Info
if (desktopInfoIcon) {
  desktopInfoIcon.addEventListener('click', () => {
    // Если окно скрыто или свернуто
    if (windowElement.style.display === 'none' || windowElement.style.display === '') {
      windowElement.style.display = 'block';
      taskbarButton.classList.add('taskbarfocused');
    }
  });
}
