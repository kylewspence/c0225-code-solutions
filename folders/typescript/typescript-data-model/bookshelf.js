'use strict';
const bookshelf = [
  {
    isbn: '978-1491929483',
    title:
      'Introduction to JavaScript Object Notation: A To-the-Point Guide to JSON',
    author: 'Lindsay Bassett',
  },
  {
    isbn: '978-1484218624',
    title: 'JSON Quick Syntax Reference',
    author: 'Wallace Jackson',
  },
  {
    isbn: '978-0692232699',
    title:
      "Build APIs You Won't Hate: Everyone and their dog wants an API, so you should probably learn how to build them",
    author: 'Phil Sturgeon & Laura Bohill',
  },
];
const secondAuthor = bookshelf[1].author;
console.log('The author of the second book:', secondAuthor);
const firstISBN = bookshelf[0].isbn;
console.log('The ISBN for the first book:', firstISBN);
const thirdTitle = bookshelf[2].title;
console.log('The title for the third book:', thirdTitle);
