import { useState, useMemo } from 'react';
import { Foo } from './Icon';

interface ValidationResult {
  isLongEnough: boolean;
  hasNumber: boolean;
  hasCapital: boolean;
  hasSpecial: boolean;
  errorMessages: string[];
}

function validatePassword(pwd: string): ValidationResult {
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

  // Memoize the validation result so it only recalculates when password changes.
  const { isLongEnough, hasNumber, hasCapital, hasSpecial, errorMessages } =
    useMemo(() => validatePassword(password), [password]);

  const allValid = isLongEnough && hasNumber && hasCapital && hasSpecial;

  return (
    <div className="flex w-full m-12">
      <label>
        <span className="text-gray-700">Password</span>
        <div className="relative w-100">
          <input
            className="w-full py-1 pl-2 pr-8 border border-gray-200 rounded"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Foo isValid={allValid} />
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
