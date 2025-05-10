'use strict';
/* exported includes */
function includes(array, value) {
  return array.indexOf(value) !== -1;
}
const arraySample5 = ['kyle', 'spence', 'william'];
console.log(includes(arraySample5, 'kyle'));
console.log(includes(arraySample5, 'michelle'));
