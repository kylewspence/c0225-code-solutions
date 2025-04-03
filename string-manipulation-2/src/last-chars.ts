/* exported lastChars */
function lastChars(length: number, string: string): any {
  const countString = string.slice(-length, string.length);
  return countString;
}

console.log(lastChars(7, 'Kyle is cool.'));
