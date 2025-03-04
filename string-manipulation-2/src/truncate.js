'use strict';
/* exported truncate */
function truncate(length, string) {
  const newString = string.slice(0, length);
  return newString + '...';
}
console.log(truncate(5, 'This is a string'));
