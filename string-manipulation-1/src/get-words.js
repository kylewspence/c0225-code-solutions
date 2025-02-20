'use strict';
/* exported getWords */
function getWords(input) {
  if (input === '') return [];
  return input.split(' ');
}
console.log(getWords('Kyle Spence'));
