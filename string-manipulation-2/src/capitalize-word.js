'use strict';
/* exported capitalizeWord */
function capitalizeWord(word) {
  const lowerCase = word.toLowerCase();
  const result = lowerCase.split('');
  result[0] = result[0].toUpperCase();
  if (lowerCase === 'javascript') {
    result[4] = result[4].toUpperCase();
  }
  return result.join('');
}
console.log(capitalizeWord('javascript'));
