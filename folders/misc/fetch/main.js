'use strict';
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchData();
