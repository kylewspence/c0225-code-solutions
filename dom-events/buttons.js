'use strict';
const $clickbutton = document.querySelector('.click-button');
if (!$clickbutton) throw new Error('$button does not exist');
function handleClick(event) {
  console.log('button clicked');
  console.log(event);
  console.log(event.target);
}
$clickbutton.addEventListener('click', handleClick);
const $hoverbutton = document.querySelector('.hover-button');
if (!$hoverbutton) throw new Error('Error on mouseover');
function handleMouseover(event) {
  console.log('button hovered');
  console.log(event);
  console.log(event.target);
}
$hoverbutton.addEventListener('mouseover', handleMouseover);
const $doubleclick = document.querySelector('.double-click-button');
if (!$doubleclick) throw new Error('Error on double-click');
function handleDoubleClick(event) {
  console.log('double clicked');
  console.log(event);
  console.log(event.target);
}
$doubleclick.addEventListener('dblclick', handleDoubleClick);
// This function will be passed as a callback function to the addEventListener
// method in the next step and should perform the following functionality:
// log the message 'button clicked' to the console
// log the event object to the console
// the event object will be passed in as an argument and assigned to
// the event parameter when the function is called
// log the target property of the event object to the console
// The target property of the event object stores the element which dispatches the event.
// // This property will be extremely useful going forward as it makes finding elements
// that users interact with easy to find
// function greeting(name: string): string {
//   return `Hello ${name}`;
// }
// function processUserInput(callback: (input: string) => void): void {
//   const name = prompt('Please enter your name');
//   callback(name);
// }
// console.log(processUserInput(greeting));
