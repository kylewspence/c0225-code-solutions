'use strict';
/* exported firstChars */
function firstChars(length, string) {
  const countString = string.slice(0, length);
  return countString;
}
console.log(firstChars(6, 'Kyle is cool.'));
