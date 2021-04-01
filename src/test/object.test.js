import 'babel-polyfill';
import 'jest-canvas-mock';
import 'phaser';
import Button from '../Objects/Button';

test('Menu is an instance of container', () => {
  expect(Button.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});

test('Menu is a function', () => {
  expect(typeof Button).toBe('function');
});