import { useState } from 'react';
import { Foo } from './Icon';

function containsNumber(pwd: string): boolean {
  const numbers = '0123456789';
  for (const char of pwd) {
    if (numbers.includes(char)) {
      return true;
    }
  }
  return false;
}

function containsSpecial(pwd: string): boolean {
  const specialChars = '!@#$%^&*';
  for (const char of pwd) {
    if (specialChars.indexOf(char) !== -1) {
      return true;
    }
  }
  return false;
}

function containsCapital(pwd: string): boolean {
  for (const char of pwd) {
    if (char >= 'A' && char <= 'Z') {
      return true;
    }
  }
  return false;
}

export function ValidatedInput() {
  const [password, setPassword] = useState('');
  const isLongEnough = password.length >= 8;
  const hasNumber = containsNumber(password);
  const hasSpecial = containsSpecial(password);
  const hasCapital = containsCapital(password);
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
          {!isLongEnough && <div>Password must be at least 8 characters.</div>}
          {!hasCapital && <div>Password must contain 1 capital letter.</div>}
          {!hasNumber && <div>Password must include at least one number.</div>}
          {!hasSpecial && (
            <div>Password must include at least one special character.</div>
          )}
        </div>
      </label>
    </div>
  );
}
