function markChangeWithNeutral(key, value) {
  return `    ${key}: ${value}`;
}

function markChangeWithPlus(key, value) {
  return `  + ${key}: ${value}`;
}

function markChangeWithMinus(key, value) {
  return `  - ${key}: ${value}`;
}

const calcDiff = (value1, value2, key, result = []) => { // функция получения разницы
  if (typeof value1 === 'undefined') {
    // ключ отсутствует в 1 файле
    result.push(markChangeWithPlus(key, value2));
  } else if (typeof value2 === 'undefined') {
    // ключ отсутствует в 2 файле
    result.push(markChangeWithMinus(key, value1));
  } else if (typeof value1 === 'object') {
    // объект. Рекурсия. пока не работает
    if (typeof value2 === 'object') {
      return calcDiff(key, result);
    }
  } else if (value1 === value2) {
    // равны значения
    result.push(markChangeWithNeutral(key, value1));
  } else {
    // разнятся значения
    result.push(markChangeWithMinus(key, value1), markChangeWithPlus(key, value2));
  }
  return result;
};

export default calcDiff;
