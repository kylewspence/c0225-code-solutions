'use strict';
setTimeout(function () {
  const h1 = document.querySelector('.message');
  if (!h1) throw new Error('no h1');
  h1.innerText = 'Hello There';
}, 2000);
