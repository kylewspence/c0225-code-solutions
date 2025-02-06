/* exported getDescriptionOfPerson */
function getDescriptionOfPerson(person: any): any {
  return (
    person.name +
    ' is a ' +
    person.occupation +
    ' from ' +
    person.birthPlace +
    '.'
  );
}
