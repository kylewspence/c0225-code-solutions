interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

async function fetchData(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user: User[] = (await response.json()) as User[];
    console.log(user);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
