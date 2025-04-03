'use strict';
/* exported invert */
function invert(source) {
  const newObj = {};
  for (const key in source) {
    const value = source[key];
    newObj[value] = key;
  }
  return newObj;
}
const sampleObj3 = {
  key1: 'anything',
  key2: 'something',
  key3: 'java',
  key4: 'script',
};
// const sampleArray3 = ['key1', 'key2', 'key5'];
console.log('Sample object:', invert(sampleObj3));
// Create new object.
// Iterate over source for keys. Create new variable to store keys.
// Set newobj
