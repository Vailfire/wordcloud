/**
 * Standardize and transform element attributes to objects that are given with a
 * different type. Primitive values will be wrapped to them as corresponding key
 * and an empty string value.
 * @param  {(string|string[]|number|number[]|Object)} attributes
 * @return {Object} standardized attributes
 * @memberof svg/dom
 */
export const standardizeAttributes = (attributes) => {
  if (typeof attributes === 'object' && !Array.isArray(attributes)) {
    return attributes;
  }
  const attributesEnsuredArray = !Array.isArray(attributes) ? [attributes] : attributes;
  const attributesObject = {};
  attributesEnsuredArray.forEach((attribute) => {
    attributesObject[attribute] = '';
  });
  return attributesObject;
};

/**
 * Create a valid DOM-Element that is represented as an object with a tag,
 * attributes and an array containing child elements. Attributes are represented
 * as an object, but can also be passed as a string, number or array. Those are
 * escaped to an object with them as key and an empty string as the attribute.
 * (@see .standardizeAttributes())
 * The returning element is wrapped in an array. This behavior ensures easy
 * modifiability when adding more elements to the hierarchy. When passing nested
 * children, redundant square brackets (only on the second level) will be
 * automatically removed.
 * @param  {string} tag A tag that defines the DOM-Element that cannot be omitted.
 * Otherwise, an empty array will be returned.
 * @param  {(string|string[]|number|number[]|Object)} [attributes={}]
 * @param  {(string|string[]|number|number[]|Object|Object[])}  children
 * @return {Object[]} An array containing an object that represents the DOM-Element.
 * @memberof svg/dom
 */
const createElement = (tag, attributes = {}, children = []) => {
  if (tag === undefined) {
    return [];
  }

  return [{
    tag,
    attributes: standardizeAttributes(attributes),
    children: Array.isArray(children) ? [].concat(...children) : Array.of(children),
  }];
};

export default createElement;
