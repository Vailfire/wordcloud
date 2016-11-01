/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import { add, subtract, multiply, divide, dot, magnitude, normalize } from './vector';

const vectors = [[2, 4], [-0.75, 2], [], [1, 2, 3, 4]];

const noArguments = { caption: 'no arguments', args: [] };
const missingArguments = { caption: 'missing arguments', args: [vectors[0]] };
const vectorsIncludingFloats = { caption: 'a vector including floating-point values', args: [vectors[1], vectors[0]] };
const emptyVectors = { caption: 'an empty vector', args: [vectors[2], vectors[0]] };
const multidimensionalVectors = { caption: 'an multidimensional vector', args: [vectors[3], vectors[0]] };
const manyVectors = { caption: 'many vectors', args: [vectors[0], vectors[0], vectors[0]] };

const testCases = [
  missingArguments,
  vectorsIncludingFloats,
  emptyVectors,
  multidimensionalVectors,
  manyVectors,
];

const fixedParametersTestCases = [
  noArguments,
  missingArguments,
  vectorsIncludingFloats,
  emptyVectors,
  multidimensionalVectors,
];

// redefine given arguments from fixedParametersTestCases
const modifyingScalarTestCases = fixedParametersTestCases.map(({ caption, args }) => ({
  caption,
  // include only one argument for testCase, so the result should be itself
  // because no operation can be handled
  args: caption === missingArguments.caption ? args : [args[0], 2],
}));

const singleVectorTestCases = Array
  .of(vectorsIncludingFloats, emptyVectors, multidimensionalVectors)
  .map(({ caption, args }) => ({
    caption,
    args: [args[0]],
  }));

const runTestcase = (method, title, args, exceptation) => {
  test(title, t => t.deepEqual(method(...args), exceptation));
};

const runTestCases = (method, title, cases, exceptations) => {
  cases.forEach(({ caption, args }, index) =>
    runTestcase(method, `${title} ${caption}`, args, exceptations[index])
  );
};

runTestCases(add, 'addition with', testCases, [vectors[0], [1.25, 6], vectors[0], [3, 6, 3, 4], [6, 12]]);
// subtraction with an emptry vector: [] - [2, 4] = [-2, -4] or [2, 4] ?
// Preferring the first result, because we can probably assume an empty vector is a null vector.
runTestCases(subtract, 'subtraction with', testCases, [vectors[0], [-2.75, -2], [-2, -4], [-1, -2, 3, 4], [-2, -4]]);
runTestCases(multiply, 'scalar multiplication with', modifyingScalarTestCases, [vectors[2], vectors[0], [-1.5, 4], vectors[2], [2, 4, 6, 8]]);
runTestCases(divide, 'scalar division with', modifyingScalarTestCases, [vectors[2], vectors[0], [-0.375, 1], vectors[2], [0.5, 1, 1.5, 2]]);

// Dot product of a single vector is 0, because we can also assume an empty vector is a null vector.
runTestCases(dot, 'dot product with', fixedParametersTestCases, [0, 0, 6.5, 0, 10]);

runTestCases(magnitude, 'magnitude of', singleVectorTestCases, [Math.sqrt(73) / 4, 0, Math.sqrt(30)]);

// need to round to compare precisely
const normalizeAndRound = vector => normalize(vector).map(
  component => Math.round(component * 100) / 100
);

runTestCases(normalizeAndRound, 'normalize', singleVectorTestCases, [[-0.35, 0.94], vectors[2], [0.18, 0.37, 0.55, 0.73]]);
