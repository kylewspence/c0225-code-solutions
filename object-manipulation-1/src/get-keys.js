'use strict';
/* exported getKeys */
function getKeys(object) {
  const keysArray = [];
  for (const key in object) {
    keysArray.push(key);
  }
  return keysArray;
}
const newObject4 = {
  name: 'Kyle',
  lastName: 'Spence',
};
console.log(getKeys(newObject4));
