const values = [10, 1, 22, 23, 41, 5, 18, 7, 80, 9];

values.forEach((element) => console.log('In order:', element));
values.forEach((element, i) =>
  console.log('Reverse:', values[values.length - 1 - i])
);
