/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import parse from './parse';
import createElement from './createElement';
import { prepend } from './hierarchy';

const element = createElement('p', {}, createElement('span', {}, 'world'));

test('should return empty string when no elemenet is passed', (t) => {
  t.is(parse(), '');
});

test('should throw when passing wrong syntax', (t) => {
  t.throws(() => parse([{ label: 'p', children: ['hello world'] }]));
});

test('should parse valid element', (t) => {
  t.is(parse(element), '<p><span>world</span></p>');
});

test('should parse element without square brackets', (t) => {
  t.is(parse(element[0]), '<p><span>world</span></p>');
});

test('should quote attribute values', (t) => {
  const attributedElement = [Object.assign({}, element[0], { attributes: { draggable: true } })];
  t.is(parse(attributedElement), '<p draggable="true"><span>world</span></p>');
});

test('should unquote attribute names', (t) => {
  const attributedElement = [Object.assign({}, element[0], { attributes: { 'data-target': '#demo' } })];
  t.is(parse(attributedElement), '<p data-target="#demo"><span>world</span></p>');
});

test('should handle primitive children', (t) => {
  const primitiveChildrenElement = prepend(element, 'hello ');
  t.is(parse(primitiveChildrenElement), '<p>hello <span>world</span></p>');
});
