import { readFileSync, writeFileSync } from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  LINES_PER_ACCOUNT_NUMBER,
  decodeAccountNumber,
  validateChecksum,
} from './parser';

function main() {
  let args = yargs(hideBin(process.argv))
    .option('input-file', {
      alias: 'i',
      demandOption: true,
      description: 'File containing data set to parse.',
      type: 'string',
    })
    .option('output-file', {
      alias: 'o',
      description: 'Name of the file to print the results to.',
      type: 'string',
    })
    .parseSync();

  // Set default output file name if one wasn't provided
  if (!args.outputFile) {
    args.outputFile = `${args.inputFile}.out`;
  }

  const fileContents = readFileSync(args.inputFile, { encoding: 'utf8' });

  const dataToSave = decodeAccountSheet(fileContents);

  writeFileSync(args.outputFile, dataToSave, { encoding: 'utf8' });
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
