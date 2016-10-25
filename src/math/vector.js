/**
 * Add two or more vectors.
 * @param {...number[]} vectors
 * @returns {number[]} resulting vector
 */
export const add = (...vectors) => {
  const resulting = [];
  vectors.forEach((vector) => {
    vector.forEach((value, index) => {
      resulting[index] = isNaN(resulting[index]) ? value : resulting[index] + value;
    });
  });
  return resulting;
};

/**
 * Subtract two or more vectors.
 * @param {...number[]} vectors
 * @returns {number[]} resulting vector
 */
export const subtract = (...vectors) => add(...vectors
  .map((vector, index) => (
    index === 0 ? vector : vector.map(value => value * (-1))
  ))
);

/**
 * Multiply a vector with a scalar.
 * @param {number[]} vector
 * @param {number} scalar
 * @returns {number[]} resulting vector
 */
export const multiply = (vector = [], scalar = 1) => vector.map(value => value * scalar);

/**
 * (NOT COVERED BY UNIT TESTS!)
 * Divide a vector by a scalar.
 * A division can be defined as an inversed multiplication.
 * @param {number[]} vector
 * @param {number} scalar
 * @returns {number[]} resulting vector
 */
export const divide = (vector = [], scalar = 1) => multiply(vector, 1 / scalar);

/**
 * Calculate the dot product that is a single number between two vectors. The dot
 * product is directly related to the cosine of the angle between two vectors in
 * Euclidean space of any number of dimensions.
 * (see {@link https://en.wikipedia.org/wiki/Dot_product}|Wikipedia)
 *
 * Unlike the mathematical definition this method does ignore different cardinalities
 * of the given vectors and fills differences with zero.
 * @param {number[]} vector1
 * @param {number[]} vector2
 * @returns {number} resulting dot product
 */
export const dot = (vector1 = [], vector2 = []) => {
  let result = 0;
  // iterate by the length of the vector with most components
  for (let component = 0; component < Math.max(vector1.length, vector2.length); component += 1) {
    // replace NaN values with 0 to remain a reliable result
    result += vector1[component] * vector2[component] || 0;
  }
  return result;
};


/**
 * Calculate the magnitude of a vector. The magnitude is equivalent to the square
 * root of the dot product of the vector by itself.
 * Geometrically, a vector can be described as an arrow from the origin of the
 * space (vector tail) to a point (vector tip). The magnitude is the distance
 * between its tail and its tip.
 * @see {@link https://en.wikipedia.org/wiki/Magnitude_(mathematics)#Euclidean_vector_space|Wikipedia}
 * @param {number[]} vector
 * @returns {number} magnitude
 */
export const magnitude = vector => Math.sqrt(dot(vector, vector));

/**
 * Normalize a vector.
 * @see {@link https://en.wikipedia.org/wiki/Unit_vector|Wikipedia}
 * @param  {number[]} vector
 * @return {number[]} normalized vector with its magnitude=0
 */
export const normalize = vector => divide(vector, magnitude(vector));
