import { decodeAccountNumber } from '../src';
import { useCase1 } from './fixtures';

describe('decodeAccountNumber', () => {
  it.each(useCase1)(
    'can translate encoded account numbers into decimal format',
    (encoded: string, decoded: string) => {
      expect(decodeAccountNumber(encoded)).toEqual(decoded);
    }
  );

  it('throws when encoded number is more than 3 lines', () => {
    const encoded = `
          kf
               test
    fl
    `;

    expect(() => decodeAccountNumber(encoded)).toThrowError();
  });

  it('throws when encoded number is less than 3 lines', () => {
    const encoded = `
          kf
    `;

    expect(() => decodeAccountNumber(encoded)).toThrowError();
  });
});
