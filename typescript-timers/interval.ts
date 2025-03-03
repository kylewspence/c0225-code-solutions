const h1 = document.querySelector('.countdown-display') as HTMLElement;
if (!h1) throw new Error('no count');

let currentNumber = 4;
const intervalId = setInterval(function () {
  h1.innerText = currentNumber.toString();
  currentNumber--;
  if (currentNumber < 0) {
    clearInterval(intervalId);
    h1.innerText = '~Earth Beeelooowww Us~';
  }
}, 1000);
