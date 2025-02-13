'use strict';
/* exported isUnderFive,
            isEven,
            startsWithJ,
            isOldEnoughToDrink,
            isOldEnoughToDrive,
            isOldEnoughToDrinkAndDrive,
            categorizeAcidity,
            introduceWarnerBro,
            recommendMovie
 */
function isUnderFive(number) {
  if (number < 5) {
    return true;
  } else {
    return false;
  }
}
function isEven(number) {
  if (number % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
function startsWithJ(string) {
  if (string.charAt(0) === 'J') {
    return true;
  } else {
    return false;
  }
}
const kyle = {
  name: 'Kyle Spence',
  age: 21,
};
console.log(kyle);
function isOldEnoughToDrink(person) {
  if (person.age >= 21) {
    return true;
  } else {
    return false;
  }
}
function isOldEnoughToDrive(person) {
  if (person.age >= 16) {
    return true;
  } else {
    return false;
  }
}
function isOldEnoughToDrinkAndDrive(person) {
  if (person) {
    return false;
  } else {
    return false;
  }
}
function categorizeAcidity(pH) {
  if (pH === 7) {
    return 'neutral';
  } else if (pH < 7 && pH > 0) {
    return 'acid';
  } else if (pH <= 14 && pH > 7) {
    return 'base';
  } else {
    return 'invalid pH level';
  }
}
function introduceWarnerBro(name) {
  switch (name) {
    case 'yakko':
      return 'We are the warner brothers!';
    case 'wakko':
      return 'We are the warner brothers!';
    case 'dot':
      return 'Im cute~';
    default:
      return 'Goodnight everybody!';
  }
}
function recommendMovie(genre) {
  switch (genre) {
    case 'action':
      return 'Captain America';
    case 'comedy':
      return 'Zoolander';
    case 'horror':
      return 'it';
    case 'drama':
      return 'Pride and prejudice';
    case 'musical':
      return 'high school musical';
    case 'sci-fi':
      return 'star wars';
    default:
      return 'Genre not recognized. Choose between action, comedy, horror, drama, musical, sci-fi.';
  }
}
