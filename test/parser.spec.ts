import {
  decodeAccountNumber,
  CHARACTERS_PER_LINE,
  validateChecksum,
} from '../src/parser';
import { useCase1 } from './fixtures';

describe('decodeAccountNumber', () => {
  it('throws RangeError when more than 3 lines', () => {
    const encoded = Array(CHARACTERS_PER_LINE * 5).join('');
    expect(() => decodeAccountNumber(encoded)).toThrowError(RangeError);
  });

  it('throws RangeError when less than 3 lines', () => {
    const encoded = Array(CHARACTERS_PER_LINE * 2).join('');
    expect(() => decodeAccountNumber(encoded)).toThrowError(RangeError);
  });

  it.each(useCase1)(
    'can decode %s to %s',
    (encoded: string, decoded: string) => {
      expect(decodeAccountNumber(encoded)).toEqual(decoded);
    }
  );
});

describe('validateChecksum', () => {
  it('throws RangeError if more than 9 characters', () => {
    expect(() => validateChecksum('1234567890')).toThrowError(RangeError);
  });

  it('throws RangeError if less than 9 characters', () => {
    expect(() => validateChecksum('12345678')).toThrowError(RangeError);
  });

  it('throws EvalError if contains non-digit characters', () => {
    expect(() => validateChecksum('312m0#989')).toThrowError(EvalError);
  });

  // prettier-ignore
  it.each([
    ['345882865'],
    ['000000051'],
    ['457508000'],
  ])(
    'returns true for valid number %s',
    (accountNumber: string) => {
      expect(validateChecksum(accountNumber)).toBe(true);
    }
  );

  // prettier-ignore
  it.each([
    ['345882866'],
    ['664371495'],
  ])(
    'returns false for invalid number %s',
    (accountNumber: string) => {
      expect(validateChecksum(accountNumber)).toBe(false);
    }
  );
});
