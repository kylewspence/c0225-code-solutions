import { useState, FormEvent } from 'react';

export function RegistrationFormControlled() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Dedicated event handlers for clarity. Moving the arrow functions to the top makes the code
  // cleaner and more clear for someone else wanting to work on it.
  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Insert validation logic here if needed
    console.log({ username, password });
  };
  // notice the of htmlFor below. This helps with screen readability?
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
