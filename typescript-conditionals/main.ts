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

function isUnderFive(number: number): boolean {
  if (number < 5) {
    return true;
  } else {
    return false;
  }
}

function isEven(number: number): boolean {
  if (number % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

function startsWithJ(string: string): boolean {
  if (string.charAt(0) === 'J') {
    return true;
  } else {
    return false;
  }
}

interface Person {
  name: string;
  age: number;
}

const kyle: Person = {
  name: 'Kyle Spence',
  age: 21,
};

console.log(kyle);

function isOldEnoughToDrink(person: Person): boolean {
  if (person.age >= 21) {
    return true;
  } else {
    return false;
  }
}

function isOldEnoughToDrive(person: Person): boolean {
  if (person.age >= 16) {
    return true;
  } else {
    return false;
  }
}

function isOldEnoughToDrinkAndDrive(person: Person): boolean {
  if (person) {
    return false;
  } else {
    return false;
  }
}

function categorizeAcidity(pH: number): string {
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

function introduceWarnerBro(name: string): string {
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

function recommendMovie(genre: string): string {
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
