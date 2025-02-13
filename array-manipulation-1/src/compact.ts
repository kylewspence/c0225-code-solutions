/* exported compact */
function compact(array: any[]): any {
  const newArray = [];
  for (const value of array) {
    if (value) {
      newArray.push(value);
    }
  }
  return newArray;
}
