'use strict';
/* exported setValue */
function setValue(object, key, value) {
  object[key] = value;
}
const newObject3 = {
  name: 'Kyle',
  lastName: 'Spence',
};
setValue(newObject3, 'age', '36');
console.log(newObject3);
