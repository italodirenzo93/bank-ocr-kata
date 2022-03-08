// prettier-ignore
export const characterMap: ReadonlyMap<string, number> = new Map([
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

export const SPACES_PER_CHARACTER = 3;
export const CHARACTERS_PER_LINE = 27;
export const LINES_PER_ACCOUNT_NUMBER = 3;

/**
 * Transforms an encoded account number into a decimal representation
 * @param encoded Encoded account number to parse
 * @returns Decoded account number in decimal form
 */
export function decodeAccountNumber(encoded: string): string {
  // Validate input string
  if (encoded.length !== CHARACTERS_PER_LINE * LINES_PER_ACCOUNT_NUMBER) {
    throw new RangeError(
      `Encoded account number must be exactly ${LINES_PER_ACCOUNT_NUMBER} lines long and have ${CHARACTERS_PER_LINE} characters each.`
    );
  }

  let result = '';

  const getIndex = (line: number, char: number) =>
    line * CHARACTERS_PER_LINE + char;

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

    const encodedNumber = indices.map((i) => encoded[i]).join('');

    result += characterMap.get(encodedNumber) ?? '?';
  }

  return result;
}

/**
 * Validate an account number by calculating a checksum using the following formula - (d1 + 2*d2 + 3*d3 +..+ 9*d9) mod 11 = 0
 * @param accountNumber Account number under validation
 * @returns True for valid accounts or false otherwise
 */
export function validateChecksum(accountNumber: string): boolean {
  if (accountNumber.length !== 9) {
    throw new RangeError('Account number must be exactly 9 digits long.');
  }

  const digits = Array.from(accountNumber).map(Number);

  if (digits.some(isNaN)) {
    throw new EvalError('Only numerical characters are allowed (0-9).');
  }

  const sum = digits
    .reverse()
    .reduce((prev, current, index) => prev + (index + 1) * current);

  return sum % 11 === 0;
}
