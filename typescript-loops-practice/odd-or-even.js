'use strict';
/* exported oddOrEven */
function oddOrEven(numbers) {
  const newArray = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      newArray.push('even');
    } else if (numbers[i] % 2 !== 0) {
      newArray.push('odd');
    }
  }
  return newArray;
}
