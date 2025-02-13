/* exported getStudentNames */
function getStudentNames(students: any[]): any {
  const array = [];
  for (const student of students) {
    array.push(student.name);
  }
  return array;
}
