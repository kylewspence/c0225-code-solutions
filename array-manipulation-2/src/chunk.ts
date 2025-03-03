/* exported chunk */
function chunk(array: any, size: any): any {
  return array.slice(0, size);
}

const arraySample6 = ['kyle', 'spence', 'william', 'michelle', 'catlin'];
console.log(chunk(arraySample6, 3));
