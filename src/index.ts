import { readFileSync, writeFileSync } from 'fs';
import {
  LINES_PER_ACCOUNT_NUMBER,
  decodeAccountNumber,
  validateChecksum,
} from './parser';

const inputFile = 'fixtures/use_case_3.txt';
const outputFile = 'bin/use_case_3.out.txt';

function main() {
  const fileContents = readFileSync(inputFile, {
    encoding: 'utf8', // specifying an encoding returns the file contents as a string
  });

  const dataToSave = decodeAccountSheet(fileContents);

  writeFileSync(outputFile, dataToSave, { encoding: 'utf8' });
}

function decodeAccountSheet(fileContents: string): string {
  const lines = fileContents.split('\n').filter((line) => line !== '');

  let encodedNumbers = [];

  for (let line = 0; line < lines.length; line += LINES_PER_ACCOUNT_NUMBER) {
    encodedNumbers.push(lines[line] + lines[line + 1] + lines[line + 2]);
  }

  const decodedNumbers = encodedNumbers.map(decodeAccountNumber).map((n) => {
    if (n.includes('?')) {
      return `${n} ILL`;
    }

    if (!validateChecksum(n)) {
      return `${n} ERR`;
    }

    return n;
  });

  return decodedNumbers.join('\n');
}

// Program entry
main();
