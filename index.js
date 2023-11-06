import path from 'path';
import calcDiff from './code/calcDiff.js';
import format from './code/formatters/index.js';
import parse from './code/parsers.js'
import _ from 'lodash';
import { readFileSync } from 'fs';

const getPath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filepath) => readFileSync(getPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = getPath(file1);
  const data2 = getPath(file2);
  const data = calcDiff(data1, data2, formatName);

  return data;
};

export default genDiff;