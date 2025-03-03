/* exported getValue */
function getValue(object: any, key: any): any {
  return object[key];
}

const newObject = {
  name: 'Kyle',
  lastName: 'Spence',
};
console.log(getValue(newObject, 'lastName'));
