/* exported filterOutNulls */
function filterOutNulls(values: any[]): any {
  const newArray = [];
  for (const value of values) {
    if (value !== null) {
      newArray.push(value);
    }
  }
  return newArray;
}
