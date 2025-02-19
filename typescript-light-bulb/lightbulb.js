'use strict';
function toggleLight() {
  const $lightOnContainer = document.querySelector('.light-container');
  const $lightOffContainer = document.querySelector('.light-off-container');
  const $lightSwitch = document.querySelector('.light-switch');
  if (!$lightOnContainer || !$lightOffContainer || !$lightSwitch)
    throw new Error('not found');
  if ($lightSwitch.classList.contains('switch-on')) {
    $lightSwitch.classList.remove('switch-on');
    $lightSwitch.classList.add('switch-off');
    $lightOnContainer.classList.add('hidden');
    $lightOffContainer.classList.remove('hidden');
  } else {
    $lightSwitch.classList.remove('switch-off');
    $lightSwitch.classList.add('switch-on');
    $lightOnContainer.classList.remove('hidden');
    $lightOffContainer.classList.add('hidden');
  }
}
const $lightSwitch = document.querySelector('.light-switch');
if (!$lightSwitch) throw new Error('switch not found');
$lightSwitch.addEventListener('click', toggleLight);
