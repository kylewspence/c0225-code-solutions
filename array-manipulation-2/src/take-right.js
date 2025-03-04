'use strict';
/* exported takeRight */
function takeRight(array, count) {
  return array.slice(-count);
}
const arraySample3 = ['kyle', 'spence', 'william'];
console.log(takeRight(arraySample3, 1));
