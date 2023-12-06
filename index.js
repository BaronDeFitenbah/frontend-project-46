import path from 'path';
import calcDiff from './code/calcDiff.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = getPath(file1);
  const data2 = getPath(file2);
  const data = calcDiff(data1, data2, formatName);

  return data;
};

export default genDiff;
