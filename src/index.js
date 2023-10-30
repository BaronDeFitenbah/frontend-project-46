import path from 'path';
import calcDiff from './calcDiff.js';
import format from './formatters/index.js';
import parse from './parsers.js'
import _ from 'lodash';
import { readFileSync } from 'fs';

const getPath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filepath) => readFileSync(getPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const parsed1 = parse(data1, getFormat(file1));
  const parsed2 = parse(data2, getFormat(file2));
  const data = calcDiff(parsed1, parsed2);

  return format(data, formatName);
};

export default genDiff;