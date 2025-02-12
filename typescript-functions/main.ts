function convertMinutesToSeconds(minutes: number): number {
  return minutes * 60;
}

const numOfSeconds: number = convertMinutesToSeconds(5);
console.log('Number of seconds:', numOfSeconds);

function greet(name: string): string {
  return `Hello ${name}!`;
}

const firstGreet: string = greet('Kyle');
console.log('Greeting function:', firstGreet);

const getArea = (width: number, height: number): number => {
  return width * height;
};

const totalArea: number = getArea(5, 10);
console.log('Total area function:', totalArea);

interface Person {
  firstName: string;
  lastName: string;
}

const person: Person = {
  firstName: 'Kyle',
  lastName: 'Spence',
};

const getFirstName = (person: Person): string => {
  return person.firstName;
};

const firstName: string = getFirstName(person);
console.log('Get first name function:', firstName);

const colors: string[] = ['red', 'white', 'blue'];

const getLastElement = (colors: string[]): string => {
  const lastColor: string = colors[colors.length - 1];
  return lastColor;
};

const lastElement: string = getLastElement(colors);
console.log('Get last element function:', lastElement);

function callOtherFunction(otherFunction: Function, params: unknown): any {
  return otherFunction(params);
}

const finalFunction: any = callOtherFunction(greet, 'Kyle');
console.log('Functions on functions on functions:', finalFunction);
