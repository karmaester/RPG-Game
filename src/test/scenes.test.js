import 'babel-polyfill';
import 'jest-canvas-mock';
import Phaser from 'phaser';
import BattleScene from '../Scenes/BattleScene';
import BootScene from '../Scenes/BootScene';
import CreditsScene from '../Scenes/CreditsScene';
import GameOver from '../Scenes/GameOver';
import GameScene from '../Scenes/GameScene';

test('BattleScene is an instance of Scene', () => {
  expect(BattleScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('BattleScene is a function', () => {
  expect(typeof BattleScene).toBe('function');
});

test('BootScene is an instance of Scene', () => {
  expect(BootScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('BootScene is a function', () => {
  expect(typeof BootScene).toBe('function');
});

test('CreditsScene is an instance of Scene', () => {
  expect(CreditsScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('CreditsScene is a function', () => {
  expect(typeof CreditsScene).toBe('function');
});

test('GameOver is an instance of Scene', () => {
  expect(GameOver.prototype instanceof Phaser.Scene).toBe(true);
});

test('GameOver is a function', () => {
  expect(typeof GameOver).toBe('function');
});

test('GameScene is an instance of Scene', () => {
  expect(GameScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('GameScene is a function', () => {
  expect(typeof GameScene).toBe('function');
});