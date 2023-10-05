import path from 'path';
import _ from 'lodash';
import { readFileSync } from 'fs';
import calcDiff from './calcDiff.js';
import parse from './parsers.js';
import format from './formatters/stylish.js';

const getPath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filepath) => {
  try {
    return readFileSync(filepath, 'utf8');
  } catch (error) {
    console.error(`Ошибка при чтении файла: ${error}`);
    // Обработка ошибки, например, возврат значения по умолчанию или более детальная обработка
    return null;
  }
  readFileSync(filepath, 'utf8')};

const getFileFormat = (filename) => path.extname(filename).slice(1);

function formatResult(resultList) {
  return `\n{\n${resultList.join('\n')}\n}`;
}

const parser = (filepath1, filepath2) => { // основная функция
  const path1 = getPath(filepath1); // получение пути файла
  const data1 = parse(readFile(path1), getFileFormat(filepath1)); // чтение файла

  const path2 = getPath(filepath2); // получение пути файла
  const data2 = parse(readFile(path2), getFileFormat(filepath2)); // чтение файла

  // объединение и сортировка ключей двух файлов
  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const diffList = allKeys.reduce((result, key) => {
    const res = calcDiff(data1[key], data2[key], key);
    result.push(...res);
    return result;
  }, []);

  return format(diffList);
};

export default parser;
