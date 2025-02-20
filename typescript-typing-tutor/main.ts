const phrase = 'grumpy wizards make toxic brew';

const $span = document.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
let currentIndex = 0;

$span[currentIndex].classList.add('next-letter');

document.addEventListener('keydown', (event) => {
  const expectedChar = phrase[currentIndex];
  const pressedKey = event.key;
  if (!$span) throw new Error('no spans');

  if (pressedKey === expectedChar) {
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
