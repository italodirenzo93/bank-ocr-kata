// prettier-ignore
export const characterMap = new Map<string, number>([
  [
    ' _ ' +
    '| |' +
    '|_|',
    0,
  ],
  [
    '   ' +
    '  |' +
    '  |',
    1,
  ],
  [
    ' _ ' +
    ' _|' +
    '|_ ',
    2,
  ],
  [
    ' _ ' +
    ' _|' +
    ' _|',
    3,
  ],
  [
    '   '+
    '|_|' +
    '  |',
    4,
  ],
  [
    ' _ ' +
    '|_ ' +
    ' _|',
    5,
  ],
  [
    ' _ ' +
    '|_ ' +
    '|_|',
    6,
  ],
  [
    ' _ ' +
    '  |' +
    '  |',
    7,
  ],
  [
    ' _ ' +
    '|_|' +
    '|_|',
    8,
  ],
  [
    ' _ ' +
    '|_|' +
    ' _|',
    9,
  ],
]);

const SPACES_PER_CHARACTER = 3;
const CHARACTERS_PER_LINE = 27;

/**
 * Transforms an encoded account number into a decimal representation
 * @param encoded Encoded account number to parse
 * @returns Decoded account number in decimal form
 */
export function decodeAccountNumber(encoded: string): string {
  let result = '';

  const getIndex = (line: number, char: number) => line * CHARACTERS_PER_LINE + char;

  for (let char = 0; char < CHARACTERS_PER_LINE; char += SPACES_PER_CHARACTER) {
    const indices = [
      // First line
      getIndex(0, char),
      getIndex(0, char + 1),
      getIndex(0, char + 2),

      // Second line
      getIndex(1, char),
      getIndex(1, char + 1),
      getIndex(1, char + 2),

      // Third line
      getIndex(2, char),
      getIndex(2, char + 1),
      getIndex(2, char + 2),
    ];

    const encodedNumber = indices.map(i => encoded[i]).join('');

    result += characterMap.get(encodedNumber) ?? 'X';
  }

  return result;
}
