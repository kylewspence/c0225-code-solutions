/* exported take */
function take(array: any, count: any): any {
  return array.slice([], count);
}

const arraySample = ['kyle', 'spence'];
console.log(take(arraySample, 1));
