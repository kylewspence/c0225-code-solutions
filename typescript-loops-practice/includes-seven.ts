/* exported includesSeven */
function includesSeven(array: any[]): boolean {
  for (const num of array) {
    if (num === 7) {
      return true;
    }
  }
  return false;
}
