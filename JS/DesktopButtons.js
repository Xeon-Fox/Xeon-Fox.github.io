// DesktopButtons.js

// Иконка Info
const desktopInfoIcon = document.querySelector('.desktopicon:nth-child(1)');
const infoWindow = document.getElementById('window'); // Ваше окно Info
const infoTaskbarButton = document.querySelector('.taskbarbutton.taskbarfocused'); // Кнопка панели задач для Info

// Иконка Links
const desktopLinksIcon = document.querySelector('.desktopicon:nth-child(2)');
const linksWindow = document.getElementById('window-links'); // Ваше окно Links
const linksTaskbarButton = document.createElement('button');

// Добавляем класс и стили для кнопки Links в панели задач
linksTaskbarButton.classList.add('taskbarbutton');
linksTaskbarButton.innerHTML = '<img class="taskbaricon" draggable="false" src="resources/ico/folder.ico">';
document.getElementById('taskbaricons').appendChild(linksTaskbarButton);

// Открытие окна Info
if (desktopInfoIcon) {
  desktopInfoIcon.addEventListener('click', () => {
    if (infoWindow.style.display === 'none' || !infoWindow.style.display) {
      infoWindow.style.display = 'block';
      infoTaskbarButton.classList.add('taskbarfocused');
    }
  });
}

// Открытие окна Links
if (desktopLinksIcon) {
  desktopLinksIcon.addEventListener('click', () => {
    if (linksWindow.style.display === 'none' || !linksWindow.style.display) {
      linksWindow.style.display = 'block';
      linksTaskbarButton.classList.add('taskbarfocused');
    }
  });
}

// Клик по кнопке панели задач для Links
linksTaskbarButton.addEventListener('click', () => {
  if (linksWindow.style.display === 'none' || !linksWindow.style.display) {
    linksWindow.style.display = 'block';
    linksTaskbarButton.classList.add('taskbarfocused');
  } else {
    linksWindow.style.display = 'none';
    linksTaskbarButton.classList.remove('taskbarfocused');
  }
});