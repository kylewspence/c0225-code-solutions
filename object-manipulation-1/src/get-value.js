'use strict';
/* exported getValue */
function getValue(object, key) {
  return object[key];
}
const newObject = {
  name: 'Kyle',
  lastName: 'Spence',
};
console.log(getValue(newObject, 'lastName'));
