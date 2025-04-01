/* exported countdown */
function countdown(num: any): unknown[] {
  const newArray = [];
  for (let i = num; i >= 0; i--) {
    newArray.push(i);
  }
  return newArray;
}
