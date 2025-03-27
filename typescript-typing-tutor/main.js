'use strict';
const phrase = 'grumpy wizards make toxic brew';
const $span = document.querySelectorAll('span');
if (!$span) throw new Error('no spans');
let currentIndex = 0;
$span[currentIndex].classList.add('next-letter');
document.addEventListener('keydown', (event) => {
  const expectedChar = phrase[currentIndex];
  const pressedChar = event.key;
  if (pressedChar === expectedChar) {
    $span[currentIndex].classList.remove('next-letter', 'incorrect');
    $span[currentIndex].classList.add('correct');
    currentIndex++;
    if (currentIndex < phrase.length) {
      $span[currentIndex].classList.add('next-letter');
    } else {
      console.log('Phrase completed!');
    }
  } else {
    $span[currentIndex].classList.add('incorrect');
  }
});
