'use strict';
const $openModal = document.querySelector('.open-modal');
const $dismissModal = document.querySelector('.dismiss-modal');
const $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('.dialog error');
if (!$dismissModal) throw new Error('.dismiss-modal error');
if (!$openModal) throw new Error('open.modal error');
$openModal.addEventListener('click', () => {
  $dialog.showModal();
});
$dismissModal.addEventListener('click', () => {
  $dialog.close();
});
