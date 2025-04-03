'use strict';
/* exported getValues */
function getValues(object) {
  const keysArray = [];
  for (const key in object) {
    keysArray.push(object[key]);
  }
  return keysArray;
}
const newObject2 = {
  name: 'Kyle',
  lastName: 'Spence',
};
console.log(getValues(newObject2));
