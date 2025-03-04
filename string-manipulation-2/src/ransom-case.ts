/* exported ransomCase */
function ransomCase(string: string): any {
  const lowerCase = string.toLowerCase();
  const result = lowerCase.split('');
  for (let i = 0; i < result.length; i++) {
    if (i % 2 !== 0) {
      result[i] = result[i].toUpperCase();
    }
  }
  return result.join('');
}

console.log(ransomCase('kyle'));
