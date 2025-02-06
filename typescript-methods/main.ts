const heroes = ['Superman', 'Batman', 'Spiderman', 'Wolverine'];
let randomNumber = Math.random();

randomNumber = randomNumber * heroes.length;
const randomIndex = Math.floor(randomNumber);
const randomHero = heroes[randomIndex];

console.log(randomNumber);
console.log(`Random Index: ${randomIndex}.`);
console.log(`Random Hero: ${randomHero}.`);

interface Book {
  title: string;
  author: string;
}

const library: Book[] = [
  {
    title: 'The Four Agreements',
    author: 'Don Julio',
  },
  {
    title: '12 Rules',
    author: 'J Peterson',
  },
  {
    title: "Gaunt's Ghosts",
    author: 'Dan Abnett',
  },
];

const lastBook = library.pop();
console.log('Last Book:', lastBook);

const firstBook = library.shift();
console.log('First Book:', firstBook);

const js: Book = {
  title: 'JavaScript for Impatient Programmers',
  author: 'Dr. Axel Rauschmayer',
};
const css: Book = {
  title: 'CSS Secrets',
  author: 'Lea Verou',
};

library.push(js);
library.unshift(css);
library.splice(1, 1);

console.log(library);

const fullName = 'Kyle Spence';
const firstAndLastName = fullName.split(' ');
const firstName = firstAndLastName[0];
const sayMyName = firstName.toUpperCase();

console.log(`First and last name: ${firstAndLastName}.`);
console.log('Say my name:', sayMyName);

interface Employee {
  name: string;
  age: number;
  position: string;
}

const employee: Employee = {
  name: 'Kyle Spence',
  age: 35,
  position: 'CEO',
};

const employeeKeys = Object.keys(employee);
const employeeValues = Object.values(employee);
const employeePairs = Object.entries(employee);

console.log('Employee Keys:', employeeKeys);
console.log('Employee Values:', employeeValues);
console.log('Employee Pairs:', employeePairs);
