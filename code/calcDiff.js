import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import ast from './formatters/index.js';
import getFormatting from './formatters/index.js'

const compare = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        type: 'added',
      }; 
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if(_.isObject(obj1[key]) && _.isObject(obj2[key])){
      return {
        key,
        type: 'nested',
        children: compare(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]){
      return {
        key,
        valueBefore: obj1[key],
        valueAfter: obj2[key],
        type: 'changed',
      };
    }
    return {
      key,
      value: obj1[key],
      type: 'unchanged'
    };
  });
  return result;
}

const getData = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  const fileExtName = path.extname(filePath).slice(1);
  return parse(fileContent, fileExtName);
};

const getDiff = (file1, file2, format = 'stylish') => ast(compare(getData(file1), getData(file2)), format);

export default getDiff;