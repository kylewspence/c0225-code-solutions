'use strict';
/* exported take */
function take(array, count) {
  return array.slice([], count);
}
const arraySample = ['kyle', 'spence'];
console.log(take(arraySample, 1));
