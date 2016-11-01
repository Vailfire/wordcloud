/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import createElement from './createElement';
import { appendAt, prepend, append } from './hierarchy';

const element = createElement('element');
const elementWithManyChildren = createElement('element', {}, ['1', '2', '3', '4', '5']);

const children = [
  'primitive',
  ['multiple', 'primitives'],
  createElement('child'),
  [...createElement('first'), ...createElement('second')],
];

test('appendAt() should return empty array when no argument is defined', (t) => {
  t.deepEqual(appendAt(), []);
});

test('appendAt() should return parent when no child is defined', (t) => {
  t.deepEqual(appendAt(element), element);
});

test('appendAt() should allow parent without square brackets', (t) => {
  // referencing to contained element should be possible without errors
  t.deepEqual(appendAt(element[0], children[0]), createElement('element', {}, children[0]));
});

test('appendAt() should append single primitive child', (t) => {
  t.deepEqual(appendAt(element, children[0]), createElement('element', {}, children[0]));
});

test('appendAt() should append multiple primitive children', (t) => {
  t.deepEqual(appendAt(element, children[1]), createElement('element', {}, children[1]));
});

test('appendAt() should append child element without square brackets', (t) => {
  t.deepEqual(appendAt(element, children[2][0]), createElement('element', {}, children[2][0]));
});

test('appendAt() should not mutate the parent', (t) => {
  const noMutatingElement = createElement('element');

  t.deepEqual(appendAt(noMutatingElement, children[2]), createElement('element', {}, children[2]));
  // mutation would result in duplicate children
  t.deepEqual(appendAt(noMutatingElement, children[2]), createElement('element', {}, children[2]));
});

test('appendAt() should append multiple children elements', (t) => {
  t.deepEqual(appendAt(element, children[3]), createElement('element', {}, children[3]));
});

test('appendAt() should prepend child when no index is specified', (t) => {
  t.deepEqual(appendAt(elementWithManyChildren, children[2]), createElement('element', {}, [children[2], '1', '2', '3', '4', '5']));
});

test('appendAt() should insert child at specified index', (t) => {
  t.deepEqual(appendAt(elementWithManyChildren, children[2], 2), createElement('element', {}, ['1', '2', children[2], '3', '4', '5']));
});

test('prepend() should insert child before existing children', (t) => {
  t.deepEqual(prepend(elementWithManyChildren, children[2]), createElement('element', {}, [children[2], '1', '2', '3', '4', '5']));
});

test('prepend() should allow parent without square brackets', (t) => {
  // referencing to contained element should be possible without errors
  t.deepEqual(prepend(elementWithManyChildren[0], children[2]), createElement('element', {}, [children[2], '1', '2', '3', '4', '5']));
});

test('append() should insert child after existing children', (t) => {
  t.deepEqual(append(elementWithManyChildren, children[2]), createElement('element', {}, ['1', '2', '3', '4', '5', children[2]]));
});

test('append() should allow parent without square brackets', (t) => {
  // referencing to contained element should be possible without errors
  t.deepEqual(append(elementWithManyChildren[0], children[2]), createElement('element', {}, ['1', '2', '3', '4', '5', children[2]]));
});
