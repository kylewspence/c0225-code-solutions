'use strict';
/* exported isVowel */
function isVowel(character) {
  switch (character.toLowerCase()) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
      return true;
    default:
      return false;
  }
}
