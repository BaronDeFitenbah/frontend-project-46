import path from 'path';
import compare from './code/calcDiff.js';
import ast from './code/formatters/index.js';
import fs from 'fs';
import parse from './code/parsers.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = getPath(file1);
  const data2 = getPath(file2);
  const data = getDiff(data1, data2, formatName);
  return data
};

  const getData = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
    const fileExtName = path.extname(filePath).slice(1);
    return parse(fileContent, fileExtName);
  };
  
const getDiff = (file1, file2, format = 'stylish') => ast(compare(getData(file1), getData(file2)), format);

export default genDiff;
