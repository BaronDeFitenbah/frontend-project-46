const formatProperty = (path, value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const generatePlainDiff = (dataDiff, path = '') => {
  const formattedChanges = dataDiff.map((item) => {
    const currentPath = path ? `${path}.${item.key}` : item.key;

    switch (item.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatProperty(currentPath, item.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatProperty(currentPath, item.valueBefore)} to ${formatProperty(currentPath, item.valueAfter)}`;
      case 'nested':
        return generatePlainDiff(item.children, currentPath);
      case 'unchanged': return undefined;
      default:
        throw new Error(`Unknown item type: '${item.type}'!`);
    }
  });
  const result = formattedChanges.filter((el) => el !== undefined);
  return result.join('\n');
};

export default generatePlainDiff;
