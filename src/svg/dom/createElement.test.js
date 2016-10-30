/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import createElement, { standardizeAttributes } from './createElement';

test('standardizeAttributes() should transform element attributes to objects that are given with different type', (t) => {
  t.deepEqual(standardizeAttributes('string'), { string: '' });
  t.deepEqual(standardizeAttributes(['another', 'string']), { another: '', string: '' });
  t.deepEqual(standardizeAttributes(1), { 1: '' });
  t.deepEqual(standardizeAttributes([1, 2]), { 1: '', 2: '' });
  t.deepEqual(standardizeAttributes({ a: 'b', c: 'd' }), { a: 'b', c: 'd' });
});

test('should return empty array when no argument is defined', (t) => {
  t.deepEqual(createElement(), []);
});

test('should attach undefined arguments with empty placeholders', (t) => {
  t.deepEqual(createElement('element'), [{ tag: 'element', attributes: {}, children: [] }]);
});

test('should wrap single primitive (string or number) attribute', (t) => {
  t.deepEqual(createElement('element', 'enabled'), [{ tag: 'element', attributes: { enabled: '' }, children: [] }]);
});

test('should wrap multiple primitive attributes', (t) => {
  const element = createElement('element', ['enabled', 'data-target']);

  const expectedStructure = [{
    tag: 'element',
    attributes: {
      enabled: '',
      'data-target': '',
    },
    children: [],
  }];

  t.deepEqual(element, expectedStructure);
});

test('should handle single child', (t) => {
  t.deepEqual(createElement('element', {}, 'Hello world!'), [{ tag: 'element', attributes: { }, children: ['Hello world!'] }]);
});

test('should handle multiple children given as array', (t) => {
  const element = createElement('element', {}, ['Hello ', createElement('span', {}, 'world'), '!']);

  const expectedStructure = [{
    tag: 'element',
    attributes: {},
    children: [
      'Hello ', { tag: 'span', attributes: { }, children: ['world'] }, '!',
    ],
  }];

  t.deepEqual(element, expectedStructure);
});
