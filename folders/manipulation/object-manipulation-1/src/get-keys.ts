/* exported getKeys */
function getKeys(object: any): any {
  const keysArray: any[] = [];
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
