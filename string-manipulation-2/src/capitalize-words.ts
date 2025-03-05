/* exported capitalizeWords */
function capitalizeWords(string: string): any {
  const lowerCase = string.toLowerCase();
  const result = lowerCase.split(' ');
  for (let i = 0; i < result.length; i++) {
    if (result[i].length > 0) {
      result[i] = result[i][0].toUpperCase() + result[i].slice(1);
    }
  }

  return result.join(' ');
}

console.log(capitalizeWords('javascript is cool'));
