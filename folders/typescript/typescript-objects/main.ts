interface StudentProps {
  firstName: string;
  lastName: string;
  age: number;
  livesInIrvine?: boolean;
  previousOccupation?: string;
}

interface Vehicle {
  make: string;
  model: string;
  year: number;
  color?: string;
  isConvertible?: boolean;
}

interface Pet {
  name?: string;
  kind?: string;
}

const student: StudentProps = {
  firstName: 'Kyle',
  lastName: 'Spence',
  age: 35,
};

const firstName: string = student.firstName;
const lastName: string = student.lastName;
const fullName: string = firstName + ' ' + lastName;
console.log('Their full name is', fullName);

student.livesInIrvine = true;
console.log('Do they live in Irvine?', student.livesInIrvine);

student.previousOccupation = 'Banker';
console.log('What was their previous job?', student.previousOccupation);

console.log('value of student', student);
console.log('typeof student:', typeof student);

const vehicle: Vehicle = {
  make: 'Toyota',
  model: '4Runner',
  year: 2025,
};

vehicle['color'] = 'Mudbath';
vehicle['isConvertible'] = false;

console.log('What color?', vehicle['color']);
console.log('Is it convertible?', vehicle['isConvertible']);
console.log('value of vehicle:', vehicle);

const pet: Pet = {
  name: 'Rocky',
  kind: 'No, hes an angel.',
};

delete pet.name;
delete pet.kind;
console.log('value of pet:', pet);
console.log('typeof pet:', typeof pet);
