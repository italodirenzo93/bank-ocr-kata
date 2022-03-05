import { decodeAccountNumber } from '../src';
import { useCase1 } from './fixtures';

describe('decodeAccountNumber', () => {
  it.each(useCase1)(
    'can translate strings into numbers',
    (encoded: string, decoded: string) =>
      expect(decodeAccountNumber(encoded)).toEqual(decoded)
  );
});
