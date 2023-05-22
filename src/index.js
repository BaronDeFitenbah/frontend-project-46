import path from 'path';
import _ from 'lodash';
import { readFileSync } from 'fs';

const getPath = (filename) => path.resolve('__fixtures__', filename);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

function markChangeWithNeutral(key, value) {
  return `    ${key}: ${value}`;
}

function markChangeWithPlus(key, value) {
  return `  + ${key}: ${value}`;
}

function markChangeWithMinus(key, value) {
  return `  - ${key}: ${value}`;
}

function formatResult(resultList) {
  return `\n{\n${resultList.join('\n')}\n}`;
}

const calcDiff = (value1, value2, key, result = []) => { // функция получения разницы
  if (typeof value1 === 'undefined') {
    // ключ отсутствует в 1 файле
    result.push(markChangeWithPlus(key, value2));
  } else if (typeof value2 === 'undefined') {
    // ключ отсутствует в 2 файле
    result.push(markChangeWithMinus(key, value1));
  } else if (typeof value1 === 'object') {
    // объект. Рекурсия
    // пока не работает
    return calcDiff(key, result);
  } else if (value1 === value2) {
    // равны значения
    result.push(markChangeWithNeutral(key, value1));
  } else {
    // разнятся значения
    result.push(markChangeWithMinus(key, value1), markChangeWithPlus(key, value2));
  }
  return result;
};

const parser = (filepath1, filepath2) => { // основная функция
  const path1 = getPath(filepath1); // получение пути файла
  const data1 = JSON.parse(readFile(path1)); // чтение файла

  const path2 = getPath(filepath2); // получение пути файла
  const data2 = JSON.parse(readFile(path2)); // чтение файла

  // объединение и сортировка ключей двух файлов
  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const diffList = allKeys.reduce((result, key) => {
    const res = calcDiff(data1[key], data2[key], key);
    result.push(...res);
    return result;
  }, []);

  return formatResult(diffList);
};

export default parser;
