/* exported getInitialsOfPerson */
function getInitialsOfPerson(person: any): any {
  return person.firstName.charAt(0) + person.lastName.charAt(0);
}
