import { decodeAccountNumber } from '../src/parser';
import { useCase1 } from './fixtures';

describe('decodeAccountNumber', () => {
  it.each(useCase1)(
    'can translate encoded account numbers into decimal format',
    (encoded: string, decoded: string) => {
      expect(decodeAccountNumber(encoded)).toEqual(decoded);
    }
  );
});
