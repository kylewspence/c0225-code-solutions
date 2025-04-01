'use strict';
/* exported filterOutNulls */
function filterOutNulls(values) {
  const newArray = [];
  for (const value of values) {
    if (value !== null) {
      newArray.push(value);
    }
  }
  return newArray;
}
