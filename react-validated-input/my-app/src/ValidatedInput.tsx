import { useState } from 'react';
import { Foo } from './Icon';

function validatePassword(pwd: string) {
  const isLongEnough = pwd.length >= 8;
  const hasNumber = /\d/.test(pwd);
  const hasCapital = /[A-Z]/.test(pwd);
  const hasSpecial = /[!@#$%^&*]/.test(pwd);

  const errorMessages: string[] = [];
  if (!isLongEnough)
    errorMessages.push('Password must be at least 8 characters.');
  if (!hasCapital)
    errorMessages.push('Password must contain 1 capital letter.');
  if (!hasNumber)
    errorMessages.push('Password must include at least one number.');
  if (!hasSpecial)
    errorMessages.push('Password must include at least one special character.');

  return { isLongEnough, hasNumber, hasCapital, hasSpecial, errorMessages };
}
export function ValidatedInput() {
  const [password, setPassword] = useState('');
  const { isLongEnough, hasNumber, hasCapital, hasSpecial, errorMessages } =
    validatePassword(password);
  return (
    <div className="flex w-full m-12">
      <label>
        <span className="text-gray-700">Password</span>
        <div className="relative w-100">
          <input
            className="w-full py-1 pl-2 pr-8 border border-gray-200 rounded"
            type="text"
            value={password}
            onChange={(change) => setPassword(change.target.value)}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Foo
              isValid={isLongEnough && hasNumber && hasSpecial && hasCapital}
            />
          </div>
        </div>
        <div className="p-1 text-red-700">
          {errorMessages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      </label>
    </div>
  );
}
