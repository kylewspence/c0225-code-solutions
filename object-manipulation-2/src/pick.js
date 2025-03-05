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
