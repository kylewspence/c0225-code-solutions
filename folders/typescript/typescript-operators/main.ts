/* eslint-disable no-unused-vars */

interface Customer {
  name: string;
  details?: {
    address?: {
      city: string;
      street: string;
      zip: string;
    };
    age?: number;
  };
}

const v1 = { value: 'Something' };
const v2 = '';
const v3 = undefined;
const v4 = [3, 5, 7, 9];
const v5: Customer = {
  name: 'Carl',
  details: {
    age: 82,
  },
};

// v

v1 && console.log('v1 is truthy');
v2 && console.log('v2 is truthy');

// config

const config1 = v1 || 'default-value';
const config2 = v2 || 'default-value';
console.log('config1:', config1);
console.log('config2:', config2);

// cfg

const cfg1 = v1 ?? 'default-value';
console.log('cfg1', cfg1);

const cfg2 = v2 ?? 'default-value';
console.log('cfg2:', cfg2);

const cfg3 = v3 ?? 'default-value';
console.log('cfg3:', cfg3);

// tern

const tern1 = v1 ? 'truthy' : 'falsy';
console.log('tern1:', tern1);

const tern2 = v2 ? 'truthy' : 'falsy';
console.log('tern2:', tern2);

const tern3 = v3 ? 'truthy' : 'falsy';
console.log('tern3:', tern3);

// oc

const oc1 = v1?.value;
console.log('oc1', oc1);

const oc2 = v5?.details?.address?.city;
console.log('oc2', oc2);

// sObj

const sObj = { ...v1, foo: 'bar' };
console.log('sObj:', sObj);

// sArr

const sArr = [100, ...v4];
console.log('sArr:', sArr);
