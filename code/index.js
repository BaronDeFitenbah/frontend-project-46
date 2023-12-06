import fs from 'fs';
import path from 'path';
import compare from './calcDiff.js';
import ast from './formatters/index.js';
import parse from './parsers.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);

const getData = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  const fileExtName = path.extname(filePath).slice(1);
  return parse(fileContent, fileExtName);
};

const getDiff = (file1, file2, format = 'stylish') => ast(compare(getData(file1), getData(file2)), format);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = getPath(file1);
  const data2 = getPath(file2);
  const data = getDiff(data1, data2, formatName);
  return data;
};

export default genDiff;
