'use strict';
/* exported pick */
function pick(source, keys) {
  const newObject = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key in source && source[key] !== undefined) {
      newObject[key] = source[key];
    }
  }
  return newObject;
}
const sampleObj = {
  key1: 'anything',
  key2: 'something',
  key3: 'java',
  key4: 'script',
};
const sampleArray = ['key1', 'key2', 'key5'];
console.log(pick(sampleObj, sampleArray));
// key is set equal to the current index.
// if the current index in source object && source object at current index is not undefined then
// in the new object at current index should equal whatever the source current index is.
