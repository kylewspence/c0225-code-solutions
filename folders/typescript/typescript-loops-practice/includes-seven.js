'use strict';
/* exported includesSeven */
function includesSeven(array) {
  for (const num of array) {
    if (num === 7) {
      return true;
    }
  }
  return false;
}
