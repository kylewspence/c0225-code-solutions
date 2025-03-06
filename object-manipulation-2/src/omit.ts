/* exported omit */
function omit(source: any, keys: string[]): any {
  const newObject: any = {};
  for (const key in source) {
    if (!keys.includes(key)) {
      newObject[key] = source[key];
    }
  }
  return newObject;
}

const sampleObj2 = {
  key1: 'anything',
  key2: 'something',
  key3: 'java',
  key4: 'script',
};

const sampleArray2 = ['key1', 'key2', 'key5'];

console.log(omit(sampleObj2, sampleArray2));
