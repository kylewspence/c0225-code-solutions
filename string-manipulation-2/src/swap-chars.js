'use strict';
/* exported swapChars */
function swapChars(firstIndex, secondIndex, string) {
  const splitChars = string.split('');
  [splitChars[firstIndex], splitChars[secondIndex]] = [
    splitChars[secondIndex],
    splitChars[firstIndex],
  ];
  return splitChars.join('');
}
console.log(swapChars(2, 4, 'LearningFuze'));
