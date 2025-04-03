import { takeAChance } from './take-a-chance.js';

const testPromise = takeAChance('Kyle');

testPromise.then((message) => {
  console.log(message);
});

testPromise.catch((error) => {
  console.log(error.message);
});
