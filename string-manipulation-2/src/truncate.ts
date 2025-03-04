/* exported truncate */
function truncate(length: number, string: string): any {
  const newString = string.slice(0, length);
  return newString + '...';
}

console.log(truncate(5, 'This is a string'));
