function handleFocus(event: Event): void {
  console.log('Focus event fired');
  const $eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log('Focused element name:', $eventTarget.name);
}

function handleBlur(event: Event): void {
  console.log('Blur event fired');
  const $eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log('Blurred element name:', $eventTarget.name);
}

function handleInput(event: Event): void {
  console.log('Input event fired');
  const $eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log('Element name:', $eventTarget.name);
  console.log('User input:', $eventTarget.value);
}

const $textArea = document.querySelector('#user-message');
if (!$textArea) throw new Error('No textarea found');

const $nameInput = document.querySelector('#user-name');
const $emailInput = document.querySelector('#user-email');
if (!$emailInput || !$nameInput) throw new Error('No name or email input');

$textArea.addEventListener('focus', handleFocus);
$textArea.addEventListener('blur', handleBlur);
$textArea.addEventListener('input', handleInput);

$nameInput.addEventListener('focus', handleFocus);
$nameInput.addEventListener('blur', handleBlur);
$nameInput.addEventListener('input', handleInput);

$emailInput.addEventListener('focus', handleFocus);
$emailInput.addEventListener('blur', handleBlur);
$emailInput.addEventListener('input', handleInput);

// const $inputs = document.querySelectorAll('input');
// if (!$inputs) throw new Error('No inputs found');

// $inputs.forEach((input) => {
//   input.addEventListener('focus', handleFocus);
//   input.addEventListener('blur', handleBlur);
//   input.addEventListener('input', handleInput);
// });
