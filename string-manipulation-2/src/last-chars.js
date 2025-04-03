'use strict';
/* exported lastChars */
function lastChars(length, string) {
  const countString = string.slice(-length, string.length);
  return countString;
}
console.log(lastChars(7, 'Kyle is cool.'));
