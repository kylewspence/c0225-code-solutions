/* exported toObject */
function toObject(keyValuePair: [string, any]): any {
  const object: Record<string, any> = {};
  object[keyValuePair[0]] = keyValuePair[1];
  return object;
}

console.log(toObject(['name', 'kyle']));
