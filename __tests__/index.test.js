import { readFileSync } from 'fs';
import path from 'path';

import parser from '../src/index.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);

test('json files', test(`json`));

test('yaml files', test(`yml`));

function test(format){
  const filename1 = getPath(`file1.${format}`);
  const filename2 = getPath(`file2.${format}`);
  const resultname = getPath('result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
}