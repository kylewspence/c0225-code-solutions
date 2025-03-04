/* exported takeRight */
function takeRight(array: any, count: any): any {
  return array.slice(-count);
}

const arraySample3 = ['kyle', 'spence', 'william'];
console.log(takeRight(arraySample3, 1));
