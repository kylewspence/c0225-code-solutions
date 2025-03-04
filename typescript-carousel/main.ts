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

console.log($images);
console.log($prev);
console.log($next);
console.log($dots);
console.log($images.length);

let currentIndex = 0;

function updateCarousel(): void {
  console.log('Updating Carousel, index:', currentIndex);

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
  console.log('next clicked');
  currentIndex = (currentIndex + 1) % $images.length;
  console.log('new index', currentIndex);
  updateCarousel();
  resetSlide();
});

$dotsContainer.addEventListener('click', (event: Event) => {
  console.log('dot clicked');

  for (let i = 0; i < $dots.length; i++) {
    if ($dots[i] === event.target) {
      console.log('dot clicked:', i);
      currentIndex = i;
      updateCarousel();
      resetSlide();
      break;
    }
  }
});

let autoInterval: any = 0;

function startAutoSlide(): any {
  autoInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % $images.length;
    updateCarousel();
  }, 3000);
}

function resetSlide(): any {
  clearInterval(autoInterval);
  startAutoSlide();
}

startAutoSlide();
updateCarousel();
