/* exported filterOutStrings */
function filterOutStrings(values: any[]): any {
  const newArray = [];
  for (const value of values) {
    if (typeof value !== 'string') {
      newArray.push(value);
    }
  }
  return newArray;
}
