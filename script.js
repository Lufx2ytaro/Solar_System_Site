// Находим все планеты и Солнце
const planets = document.querySelectorAll('.planet');
const sun = document.querySelector('.sun');
const Jupiter = document.querySelector('.planet_Jupiter');

// Функция для остановки анимации
function stopAnimation() {
  planets.forEach(planet => {
    planet.style.animationPlayState = 'paused'; // Останавливаем анимацию планет
  });
  sun.style.animationPlayState = 'paused'; // Останавливаем анимацию Солнца
  Jupiter.style.animationPlayState= 'paused';
}

// Функция для возобновления анимации
function startAnimation() {
  planets.forEach(planet => {
    planet.style.animationPlayState = 'running'; // Возобновляем анимацию планет
  });
  sun.style.animationPlayState = 'running'; // Возобновляем анимацию Солнца
  Jupiter.style.animationPlayState = 'running';
}

// Добавляем события для планет и Солнца
planets.forEach(planet => {
  planet.addEventListener('mouseover', stopAnimation); // При наведении
  planet.addEventListener('mouseout', startAnimation); // При уходе
});

sun.addEventListener('mouseover', stopAnimation); // При наведении на Солнце
sun.addEventListener('mouseout', startAnimation); // При уходе с Солнца

Jupiter.addEventListener('mouseover',stopAnimation);
Jupiter.addEventListener('mouseout',startAnimation);