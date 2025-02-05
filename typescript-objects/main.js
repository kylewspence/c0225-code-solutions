'use strict';
const student = {
  firstName: 'Kyle',
  lastName: 'Spence',
  age: 35,
};
const firstName = student.firstName;
const lastName = student.lastName;
const fullName = firstName + ' ' + lastName;
console.log('Their full name is', fullName);
student.livesInIrvine = true;
console.log('Do they live in Irvine?', student.livesInIrvine);
student.previousOccupation = 'Banker';
console.log('What was their previous job?', student.previousOccupation);
console.log('value of student', student);
console.log('typeof student:', typeof student);
const vehicle = {
  make: 'Toyota',
  model: '4Runner',
  year: 2025,
};
vehicle['color'] = 'Mudbath';
vehicle['isConvertible'] = false;
console.log('What color?', vehicle['color']);
console.log('Is it convertible?', vehicle['isConvertible']);
console.log('value of vehicle:', vehicle);
const pet = {
  name: 'Rocky',
  kind: 'No, hes an angel.',
};
delete pet.name;
delete pet.kind;
console.log('value of pet:', pet);
console.log('typeof pet:', typeof pet);
