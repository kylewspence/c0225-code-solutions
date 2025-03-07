const phrase = 'who is calling my phone? who is calling that shit?';
const phraseContainer = document.getElementById('phrase-container');
let currentIndex = 0;
let $span: NodeListOf<HTMLSpanElement>;

if (!phraseContainer) {
  throw new Error('Phrase container not found!');
}

// Populate the phrase in spans
phrase.split('').forEach((char) => {
  const span = document.createElement('span');
  span.textContent = char;

  if (char === ' ') {
    span.classList.add('space');
  }

  phraseContainer.appendChild(span);
});

// Now that spans exist, we can query them
$span = document.querySelectorAll(
  '#phrase-container span'
) as NodeListOf<HTMLSpanElement>;

if (!$span.length) throw new Error('No spans were created.');
$span[currentIndex].classList.add('next-letter');

let startTime: number | null = null;
let hasStarted = false;

const resultsBox = document.getElementById('results-text');
const highScoreBox = document.getElementById('high-score-text');

// Load high score from localStorage
let highScore = localStorage.getItem('highScore')
  ? parseFloat(localStorage.getItem('highScore')!)
  : 0;

if (highScoreBox) {
  highScoreBox.textContent = highScore
    ? `Best: ${highScore.toFixed(2)} WPM`
    : 'No scores yet...';
}

document.addEventListener('keydown', (event) => {
  const pressedKey = event.key;
  const expectedChar = phrase[currentIndex];

  if (!hasStarted) {
    startTime = performance.now();
    hasStarted = true;
  }

  if (pressedKey === expectedChar) {
    $span[currentIndex].classList.remove('next-letter', 'incorrect');
    $span[currentIndex].classList.add('correct');
    currentIndex++;

    if (currentIndex < phrase.length) {
      $span[currentIndex].classList.add('next-letter');
    } else {
      // Stop Timer & Calculate WPM
      const endTime = performance.now();
      const timeTaken = (endTime - startTime!) / 1000;
      const wordCount = phrase.split(' ').length;
      const wordsPerMinute = (wordCount / timeTaken) * 60;

      // Update the results box
      if (resultsBox) {
        resultsBox.textContent = `Completed in ${timeTaken.toFixed(
          2
        )}s - Speed: ${wordsPerMinute.toFixed(2)} WPM`;
      }

      // Check for new high score
      if (wordsPerMinute > highScore) {
        highScore = wordsPerMinute;
        localStorage.setItem('highScore', highScore.toString());
        if (highScoreBox) {
          highScoreBox.textContent = `Best: ${highScore.toFixed(2)} WPM`;
        }
      }
    }
  } else {
    $span[currentIndex].classList.add('incorrect');
  }
});
