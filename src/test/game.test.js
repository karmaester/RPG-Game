import 'babel-polyfill';
import 'jest-canvas-mock';
import Game from '../index';

test('Game is a function', () => {
  expect(typeof Game).toBe('object');
});
