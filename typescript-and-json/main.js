'use strict';
const books = [
  {
    name: 'Javascript',
    isbn: 12345,
    author: 'Kyle Spence',
  },
  {
    name: 'Python',
    isbn: 23456,
    author: 'Shawn Kost',
  },
  {
    name: 'React',
    isbn: 34567,
    author: 'Michelle Catlin',
  },
];
const booksJson = JSON.stringify(books);
console.log(booksJson);
console.log('type of', typeof booksJson);
const stepThree = '{"number ID": 12345, "string name": "student string"}';
console.log(stepThree);
console.log('type of', typeof stepThree);
const objectJSON = JSON.parse(stepThree);
console.log(objectJSON);
console.log('type of', typeof objectJSON);
