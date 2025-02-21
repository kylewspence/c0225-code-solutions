const $lightOnContainer = document.querySelector('.light-container');
const $lightOffContainer = document.querySelector('.light-off-container');

if (!$lightOnContainer || !$lightOffContainer)
  throw new Error('Light containers not found');

$lightOnContainer.addEventListener('click', () => {
  $lightOnContainer.classList.add('hidden');
  $lightOffContainer.classList.remove('hidden');
});

$lightOffContainer.addEventListener('click', () => {
  $lightOffContainer.classList.add('hidden');
  $lightOnContainer.classList.remove('hidden');
});
