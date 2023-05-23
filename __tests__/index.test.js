import { readFileSync } from 'fs';
import path from 'path';

import parser from '../src/index.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);

test('json files', () => {
  const filename1 = getPath('file1.json');
  const filename2 = getPath('file2.json');
  const resultname = getPath('result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});

test('yaml files', () => {
  const filename1 = getPath('file1.yaml');
  const filename2 = getPath('file2.yaml');
  const resultname = getPath('result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});
