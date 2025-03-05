/* exported firstChars */
function firstChars(length: number, string: string): any {
  const countString = string.slice(0, length);
  return countString;
}

console.log(firstChars(6, 'Kyle is cool.'));
