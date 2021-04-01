import 'babel-polyfill';
import 'jest-canvas-mock';
import Phaser from 'phaser';
import Button from '../Objects/Button';

test('Button is an instance of container', () => {
  expect(Button.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});

test('Button is a function', () => {
  expect(typeof Button).toBe('function');
});