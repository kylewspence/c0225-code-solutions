import './App.css';

import { UserForm } from './UserForm';

function App() {
  return (
    <>
      <h3>Create User</h3>
      <UserForm />
      <h3>Edit User</h3>
      <UserForm user={{ username: 'Fred', password: 'Astaire' }} />
    </>
  );
}

export default App;
