/* exported setValue */
function setValue(object: any, key: any, value: any): any {
  object[key] = value;
}

const newObject3 = {
  name: 'Kyle',
  lastName: 'Spence',
};

setValue(newObject3, 'age', '36');
console.log(newObject3);
