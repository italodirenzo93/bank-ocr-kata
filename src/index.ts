import { readFile, writeFile } from 'fs/promises';

const inputFile = 'fixtures/use_case_1.txt';
const outputFile = 'bin/use_case_1.out.txt';

async function main() {
  // Async read contents of file into memory.
  const fileContents = await readFile(inputFile, {
    encoding: 'utf8', // specifying an encoding returns the file contents as a string
  });

  const dataToSave = magicalDataTransformer(fileContents);

  // Async write data to a file, replacing the file if it already exists.
  await writeFile(outputFile, dataToSave, { encoding: 'utf8' });
}

function magicalDataTransformer(fileContents: string): string {
  return '';
}

// Program entry
main();

