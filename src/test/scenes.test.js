import 'babel-polyfill';
import 'jest-canvas-mock';
import Phaser from 'phaser';
import BattleScene from '../Scenes/BattleScene';
import BootScene from '../Scenes/BootScene';
import CreditsScene from '../Scenes/CreditsScene';
import GameOver from '../Scenes/GameOver';
import GameScene from '../Scenes/GameScene';
import GetName from '../Scenes/getName';
import InstructionsScene from '../Scenes/Instructions';
import Message from '../Scenes/Message';
import OptionsScene from '../Scenes/OptionsScene';
import PreloaderScene from '../Scenes/PreloaderScene';
import Scores from '../Scenes/Scores';
import TitleScene from '../Scenes/TitleScene';
import UIScene from '../Scenes/UIScene';

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

test('GetName is an instance of Scene', () => {
  expect(GetName.prototype instanceof Phaser.Scene).toBe(true);
});

test('InstructionsScene is a function', () => {
  expect(typeof InstructionsScene).toBe('function');
});

test('InstructionsScene is an instance of Scene', () => {
  expect(InstructionsScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('InstructionsScene is a function', () => {
  expect(typeof InstructionsScene).toBe('function');
});

test('Message is an instance of Scene', () => {
  expect(Message.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});

test('Message is a function', () => {
  expect(typeof Message).toBe('function');
});

test('OptionsScene is an instance of Scene', () => {
  expect(OptionsScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('OptionsScene is a function', () => {
  expect(typeof OptionsScene).toBe('function');
});

test('PreloaderScene is a function', () => {
  expect(typeof PreloaderScene).toBe('function');
});

test('PreloaderScene is an instance of Scene', () => {
  expect(PreloaderScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('Scores is an instance of Scene', () => {
  expect(Scores.prototype instanceof Phaser.Scene).toBe(true);
});

test('Scores is a function', () => {
  expect(typeof Scores).toBe('function');
});

test('TitleScene is an instance of Scene', () => {
  expect(TitleScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('TitleScene is a function', () => {
  expect(typeof TitleScene).toBe('function');
});

test('UIScene is an instance of Scene', () => {
  expect(UIScene.prototype instanceof Phaser.Scene).toBe(true);
});

test('UIScene is a function', () => {
  expect(typeof UIScene).toBe('function');
});