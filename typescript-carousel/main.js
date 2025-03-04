'use strict';
/* DOM CACHE */
const $images = document.querySelectorAll('.pokemon');
if (!$images) throw new Error('No Image');
const $prev = document.querySelector('#prev');
if (!$prev) throw new Error('No Previous Button.');
const $next = document.querySelector('#next');
if (!$next) throw new Error('No Next Button.');
const $dots = document.querySelectorAll('.dot');
if (!$dots) throw new Error('No Dots Found.');
const $dotsContainer = document.querySelector('.dots-container');
if (!$dotsContainer) throw new Error('No Dots Container Found');
let currentIndex = 0;
function updateCarousel() {
  for (let i = 0; i < $images.length; i++) {
    const img = $images[i];
    if (i === currentIndex) {
      img.classList.remove('hidden');
    } else {
      img.classList.add('hidden');
    }
  }
  for (let i = 0; i < $dots.length; i++) {
    if (i === currentIndex) {
      $dots[i].classList.remove('fa-regular');
      $dots[i].classList.add('fa-solid');
    } else {
      $dots[i].classList.remove('fa-solid');
      $dots[i].classList.add('fa-regular');
    }
  }
}
$prev?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + $images.length) % $images.length;
  updateCarousel();
  resetSlide();
});
$next?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % $images.length;
  updateCarousel();
  resetSlide();
});
$dotsContainer.addEventListener('click', (event) => {
  for (let i = 0; i < $dots.length; i++) {
    if ($dots[i] === event.target) {
      currentIndex = i;
      updateCarousel();
      resetSlide();
      break;
    }
  }
});
let autoInterval = 0;
function startAutoSlide() {
  autoInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % $images.length;
    updateCarousel();
  }, 3000);
}
function resetSlide() {
  clearInterval(autoInterval);
  startAutoSlide();
}
startAutoSlide();
updateCarousel();
