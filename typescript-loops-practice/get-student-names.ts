/* exported getStudentNames */
function getStudentNames(students: any[]): any {
  const names = [];
  for (const student of students) {
    names.push(student.name);
  }
  return names;
}
