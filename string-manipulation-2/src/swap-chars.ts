/* exported swapChars */
function swapChars(
  firstIndex: number,
  secondIndex: number,
  string: string
): any {
  const splitChars = string.split('');

  [splitChars[firstIndex], splitChars[secondIndex]] = [
    splitChars[secondIndex],
    splitChars[firstIndex],
  ];
  return splitChars.join('');
}

console.log(swapChars(2, 4, 'LearningFuze'));
