/* exported drop */
// drop(array, count)
// "before each" hook for "drops the first 2 elements of ["foo", "bar", "baz", "qux"]"‣
// ReferenceError: drop is not defined
//     at Context.<anonymous> (src/drop.test.js:5:12)

/* exported take */
function drop(array: any, count: any): any {
  return array.slice(count);
}

const arraySample2 = ['kyle', 'spence', 'william'];
console.log(drop(arraySample2, 1));
