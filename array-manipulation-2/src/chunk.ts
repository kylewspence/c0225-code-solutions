/* exported chunk */
function chunk(array: any, size: any): any {
  const result = [];
  for (let i = 0; i < size; i++) {
    array.slice(0, size);
    result.push(i);
  }
  return result;
}

const arraySample6 = ['kyle', 'spence', 'william', 'michelle', 'catlin'];
console.log(chunk(arraySample6, 3));
