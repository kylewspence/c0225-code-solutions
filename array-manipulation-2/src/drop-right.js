'use strict';
/* exported dropRight */
function dropRight(array, count) {
  return array.slice(0, -count);
}
const arraySample4 = ['kyle', 'spence', 'william'];
console.log(dropRight(arraySample4, 1));
