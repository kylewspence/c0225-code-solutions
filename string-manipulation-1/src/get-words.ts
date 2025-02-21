/* exported getWords */
function getWords(input: string): string[] {
  if (input === '') return [];
  return input.split(' ');
}

console.log(getWords('Kyle Spence'));
