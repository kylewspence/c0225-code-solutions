import { FormEvent } from 'react';

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event?.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData);
  console.log(data);
}

export function RegistrationFormUncontrolled() {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
