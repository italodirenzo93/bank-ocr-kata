import { platform } from 'os';

/**
 * Transforms an encoded account number into a decimal representation
 * @param encoded Encoded account number to parse
 * @returns Decoded account number in decimal form
 */
export function decodeAccountNumber(encoded: string): string {
  const lines = encoded.split('\n').filter((line) => line !== '');

  if (lines.length !== 3)
    throw new Error(
      'Encoded account number must be exactly 3 lines of 27 characters each.'
    );

  for (let line = 0; line < 3; line++) {
    for (let character = 0; character < 27; character += 3) {}
  }

  return '';
}

console.log(`Running on ${platform()}`);
