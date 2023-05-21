import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

const parser = (filepath1, filepath2) => { //основная функция
  const path1 = getPath(filepath1); //получение пути файла
  const data1 = JSON.parse(readFile(path1)); //чтение файла

  const path2 = getPath(filepath2); //получение пути файла
  const data2 = JSON.parse(readFile(path2)); //чтение файла

  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort(); //объединение и сортировка ключей двух файлов

  const diffList = allKeys.reduce((result, key) => {
    const res = calcDiff(data1[key], data2[key], key);
    result.push(...res);
    return result;
  }, []);
  
  return formatResult(diffList);
};

const calcDiff = (value1, value2, key, result = []) => { //функция получения разницы
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

function markChangeWithNeutral(key, value) {
  return  `    ${key}: ${value}`;
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

export default parser;
