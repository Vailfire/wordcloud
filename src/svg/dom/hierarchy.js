/**
 * Append one or multiple element(s) to the children of a parent element at
 * an specified index. The children elements can be passed as a single
 * object or as an array containing multiple objects that represent elements.
 * It is also possible to pass a primitive (string, number) or an array
 * of primitives as children.
 * The parent element can also be passed with or without square brackets, so
 * it is easier to reference to a specific element inside a complex hierarchy.
 * (@see createElement/.createElement())
 * @param {(Object|Object[])} parent A parent element to that the children
 * are attached that cannot be omitted. Otherwise, an empty array will be
 * returned.
 * @param {(string|string[]|number|number[]|Object|Object[])} [element=[]]
 * A single element or elements that are going to be attached to the
 * children.
 * @param  {Number} [index=0] The index at which children are inserted.
 * @return {Object[]} An array containing the parent element with attached
 * children.
 * @memberof svg/dom
 */
export const appendAt = (parent, element = [], index = 0) => {
  if (parent === undefined) {
    return [];
  }

  // [].concat(parent) to ensure that it is wrapped in square brackets
  const normalizedParent = [].concat(parent);

  const children = [
    ...normalizedParent[0].children.slice(0, index),
    element,
    ...normalizedParent[0].children.slice(index),
  ];
  return [
    // apply children without mutating
    Object.assign({}, normalizedParent[0], { children: [].concat(...children) }),
    ...normalizedParent.slice(1),
  ];
};

/**
 * Append one or multiple element(s) to the beginning of the children of a
 * parent element. (@see .appendAt())
 * @param {(Object|Object[])} parent A parent element to that the children
 * are attached that cannot be omitted. Otherwise, an empty array will be
 * returned.
 * @param {(string|string[]|number|number[]|Object|Object[])} [element=[]]
 * A single element or elements that are going to be attached to the
 * beginning of the children.
 * @return {Object[]} An array containing the parent element with attached
 * children at the beginning.
 * @memberof svg/dom
 */
export const prepend = (parent, element) => appendAt(parent, element, 0);

/**
 * Append one or multiple element(s) to the end of the children of a
 * parent element. (@see .appendAt())
 * @param {(Object|Object[])} parent A parent element to that the children
 * are attached that cannot be omitted. Otherwise, an empty array will be
 * returned.
 * @param {(string|string[]|number|number[]|Object|Object[])} [element=[]]
 * A single element or elements that are going to be attached to the
 * end of the children.
 * @return {Object[]} An array containing the parent element with attached
 * children at the end.
 * @memberof svg/dom
 */
export const append = (parent, element) => (
  // [].concat(parent) to ensure that it is wrapped in square brackets
  appendAt(parent, element, [].concat(parent)[0].children.length)
);
