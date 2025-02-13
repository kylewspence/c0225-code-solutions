/* exported addSuffixToAll */
function addSuffixToAll(words: any[], suffix: any): any {
  const newArray = [];
  for (let i = 0; i < words.length; i++) {
    newArray.push(words[i] + suffix);
  }
  return newArray;
}
