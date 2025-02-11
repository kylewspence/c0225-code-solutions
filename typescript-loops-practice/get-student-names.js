'use strict';
/* exported getStudentNames */
function getStudentNames(students) {
  const array = [];
  for (const student of students) {
    array.push(student.name);
    console.log(array);
  }
  return array;
}
