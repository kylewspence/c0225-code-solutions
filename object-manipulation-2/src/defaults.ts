/* exported defaults */

function defaults(target: any, source: any): any {
  for (const key in source) {
    if (!(key in target)) {
      target[key] = source[key];
    }
  }
}

const sampleObject = {
  name: 'kyle',
  last: 'spence',
  age: 99,
  location: 'irvine',
};

const tarObject = {
  name: 'cole',
  age: 88,
};

defaults(tarObject, sampleObject);
console.log('Defaults Test:', tarObject);
