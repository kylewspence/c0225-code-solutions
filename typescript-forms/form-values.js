'use strict';
const $contactForm = document.querySelector('#contact-form');
$contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $contactForm.elements;
  const name = $formElements.name.value;
  const email = $formElements.email.value;
  const message = $formElements.message.value;
  const messageData = {
    name,
    email,
    message,
  };
  console.log(messageData);
  $contactForm.reset();
});
