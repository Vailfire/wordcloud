
const parse = (element) => {
  if (element === undefined) {
    return '';
  }

  if (typeof element !== 'object') {
    return element;
  }

  const normalizedParent = [].concat(element)[0];

  if (normalizedParent.tag === undefined) {
    throw new Error('Failed to parse elements with wrong syntax.');
  }

  const children = normalizedParent.children.map(child => (parse(child))).join('');

  let attributes = '';
  if (typeof normalizedParent.attributes === 'object') {
    Object.keys(normalizedParent.attributes).forEach((key) => {
      attributes += ` ${key}="${normalizedParent.attributes[key]}"`;
    });
  }

  return `<${normalizedParent.tag}${attributes}>${children}</${normalizedParent.tag}>`;
};

export default parse;
