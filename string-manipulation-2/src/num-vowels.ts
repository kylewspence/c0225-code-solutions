/* exported numVowels */
function numVowels(string: string): any {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const lowerCase = string.toLowerCase();
  const result = lowerCase.split('');
  const vowelResult = result.filter((char) => vowels.includes(char));
  return vowelResult.length;
}

console.log(numVowels('kyle is cool'));
