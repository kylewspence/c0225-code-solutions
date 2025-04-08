import { evenNumbers, toDollars, divideBy, multiplyBy } from './numbers';

describe('evenNumbers()', () => {
  it('returns only even numbers from the array', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, -2, -4];
    const expected = [2, 4, 6, 8, 10, 0, -2, -4];
    const result = evenNumbers(input);
    expect(result).toEqual(expected);
  });
});

describe('toDollars()', () => {
  it('should convert to dollars', () => {
    const input = 83923.45;
    const expected = '$83923.45';
    const result = toDollars(input);
    expect(result).toEqual(expected);
  });
});

describe('divideBy()', () => {
  it('should divide each number by the divisor', () => {
    const numbers = [1, 3, 5, 10, 92, 38];
    const divisor = 3;
    const expected = [1 / 3, 3 / 3, 5 / 3, 10 / 3, 92 / 3, 38 / 3];
    const result = divideBy(numbers, divisor);
    expect(result).toEqual(expected);
  });
});

describe('multiplyBy()', () => {
  it('should multiply object by the key - only if a number', () => {
    const input = {
      a: 2,
      b: 'hello',
      c: 4,
      d: null,
      e: true,
    };
    const multiplier = 3;
    const expected = {
      a: 6,
      b: 'hello',
      c: 12,
      d: null,
      e: true,
    };
    const result = multiplyBy(input, multiplier);
    expect(result).toEqual(expected);
  });
});
