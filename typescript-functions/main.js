'use strict';
function convertMinutesToSeconds(minutes) {
  return minutes * 60;
}
const numOfSeconds = convertMinutesToSeconds(5);
console.log('Number of seconds:', numOfSeconds);
function greet(name) {
  return `Hello ${name}!`;
}
const firstGreet = greet('Kyle');
console.log('Greeting function:', firstGreet);
const getArea = (width, height) => {
  return width * height;
};
const totalArea = getArea(5, 10);
console.log('Total area function:', totalArea);
const person = {
  firstName: 'Kyle',
  lastName: 'Spence',
};
const getFirstName = (person) => {
  return person;
};
const firstName = getFirstName(person.firstName);
console.log('Get first name function:', firstName);
const colors = ['red', 'white', 'blue'];
const getLastElement = (colors) => {
  const lastColor = colors[colors.length - 1];
  return lastColor;
};
const lastElement = getLastElement(colors);
console.log('Get last element function:', lastElement);
function callOtherFunction(otherFunction, params) {
  return otherFunction(params);
}
const finalFunction = callOtherFunction(greet, 'Kyle');
console.log('Functions on functions on functions:', finalFunction);
