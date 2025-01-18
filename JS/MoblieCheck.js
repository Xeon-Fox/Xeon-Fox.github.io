// Получить элемент окна, который нужно показать
const warningWindow = document.getElementById('windowmobile');

// Функция для проверки разрешения экрана
function checkScreenResolution() {
  if (window.innerWidth < 1100) {
    warningWindow.classList.remove('hidden');
  } else {
    warningWindow.classList.add('hidden');
  }
}

// Выполнить проверку при загрузке страницы
checkScreenResolution();

// Добавить слушатель события для изменения размера окна
window.addEventListener('resize', checkScreenResolution);