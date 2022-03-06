import { decodeAccountNumber, CHARACTERS_PER_LINE } from '../src/parser';
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
