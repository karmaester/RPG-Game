import 'babel-polyfill';
import 'jest-canvas-mock';
import Phaser from 'phaser';
import Menu from '../Menus/Menu';

test('Player is a subclass of Sprite', () => {
  expect(Menu.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});