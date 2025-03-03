/* exported getValues */
function getValues(object: any): any {
  const keysArray: any[] = [];
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
