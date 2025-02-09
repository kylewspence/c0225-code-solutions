'use strict';
/* exported getNumbersToTen,
            getEvenNumbersToTwenty,
            repeatWord,
            logEachCharacter,
            doubleAll,
            sumArray,
            reverseString,
            getKeys,
            getValues
 */
function getNumbersToTen() {
  const numbers = [];
  let currentNumber = 1;
  while (currentNumber < 10) {
    numbers.push(currentNumber);
    currentNumber++;
  }
  return numbers;
}
console.log('get numbers to ten:', getNumbersToTen());
console.log('get numbers to ten:', getNumbersToTen());
function getEvenNumbersToTwenty() {
  const evenNumbers = [];
  let currentNumber = 2;
  while (currentNumber < 20) {
    evenNumbers.push(currentNumber);
    currentNumber += 2;
  }
  return evenNumbers;
}
console.log('get even numbers:', getEvenNumbersToTwenty());
console.log('get even numbers:', getEvenNumbersToTwenty());
function repeatWord(word, times) {
  let count = 1;
  let repeated = '';
  while (count < times) {
    repeated += word;
    count++;
  }
  return repeated;
}
console.log(repeatWord('shawn is cool', 20));
function logEachCharacter(str) {
  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
  }
}
console.log(logEachCharacter('Kyle'));
console.log(logEachCharacter('I want a donut.'));
function doubleAll(numbers) {
  const doubled = [];
  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }
  return doubled;
}
console.log(
  'doubleAll array with 5, 23, 47, and 102 being passed =',
  doubleAll([5, 23, 47, 102])
);
function sumArray(numbers) {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}
console.log(
  'Sum array with 1, 5, 10, and 20 being passed equals',
  sumArray([1, 5, 10, 20])
);
function reverseString(str) {
  let reversed = '';
  for (const char of str) {
    reversed = char + reversed;
  }
  return reversed;
}
console.log(reverseString('Reversed string: learningFuze is awesome.'));
function getKeys(obj) {
  const keys = [];
  for (const key in obj) {
    keys.push(key);
  }
  return keys;
}
console.log('Keys:');
console.log(getKeys({ name: 'Kyle', age: 35, job: 'Developer' }));
function getValues(obj) {
  const values = [];
  for (const key in obj) {
    values.push(obj[key]);
  }
  return values;
}
console.log('Values:');
console.log(getValues({ name: 'Kyle', age: 35, job: 'Developer' }));
