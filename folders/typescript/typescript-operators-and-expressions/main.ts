const width: number = 5;
const height: number = 3;
const area: number = width * height;

console.log('area:', area);
console.log('typeof area:', typeof area);

const bill: number = 5;
const payment: number = 10;
const change: number = payment - bill;

console.log('change:', change);
console.log('typeof change:', typeof change);

const quizzes: number = 4;
const midterm: number = 1;
const final: number = 1;
const grade: number = (quizzes + midterm + final) / 3;

console.log('grade:', grade);
console.log('type of grade:', typeof grade);

const firstName: string = 'Kyle';
const lastName: string = 'Spence';
const fullName: string = firstName + ' ' + lastName;

console.log('My name is ', fullName);
console.log('Type of fullName:', typeof fullName);

const pH: number = 14;
const isAcidic: boolean = pH < 7;

console.log('Acidic?', isAcidic);
console.log('type of isAcidic:', typeof isAcidic);

const headCount: number = 301;
const isSparta: boolean = headCount === 300;

console.log('Same as sparta?', isSparta);
console.log('type of isSparta', typeof isSparta);

let motto: string = fullName;
motto += ' is the goat!';

console.log('Favorite saying:', motto);
console.log('type of motto:', typeof motto);
