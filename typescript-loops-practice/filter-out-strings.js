'use strict';
/* exported filterOutStrings */
function filterOutStrings(values) {
  const newArray = [];
  for (const value of values) {
    if (typeof value !== 'string') {
      newArray.push(value);
    }
  }
  return newArray;
}
