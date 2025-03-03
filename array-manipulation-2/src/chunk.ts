/* exported chunk */
function chunk(array: any, size: any): any {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const arraySample6 = ['kyle', 'spence', 'william', 'michelle', 'catlin'];
console.log(chunk(arraySample6, 3));
