import { useState, FormEvent } from 'react';

export type User = {
  username: string;
  password: string;
};

type UserFormProps = {
  user?: User;
};

export function UserForm({ user }: UserFormProps) {
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState(user?.password || '');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = { username, password };
    if (user) {
      console.log({ user: newUser, action: 'edited' });
    } else {
      console.log({ user: newUser, action: 'created' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
