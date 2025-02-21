'use strict';
const $tabContainer = document.querySelector('.tab-container');
const $tabNodes = document.querySelectorAll('.tab');
const $viewNodes = document.querySelectorAll('.view');
$tabContainer?.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.matches('.tab')) {
    for (let i = 0; i < $tabNodes.length; i++) {
      if ($tabNodes[i] === $eventTarget) {
        $tabNodes[i].className = 'tab active';
      } else {
        $tabNodes[i].className = 'tab';
      }
    }
    const dataView = $eventTarget.getAttribute('data-view');
    for (let i = 0; i < $viewNodes.length; i++) {
      if ($viewNodes[i].getAttribute('data-view') === dataView) {
        $viewNodes[i].classList.remove('hidden');
      } else {
        $viewNodes[i].classList.add('hidden');
      }
    }
  }
});
