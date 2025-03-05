'use strict';
const prices = [42.42, 10, 28.2234, 3.2, 5, 12];
const newObj = prices.map((p) => ({ price: p, salePrice: p / 2 }));
console.log('Obj Prices:', newObj);
const formattedObj = prices.map((p) => `$${p.toFixed(2)}`);
console.log('Formatted:', formattedObj);
