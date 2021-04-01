import 'babel-polyfill';
import 'jest-canvas-mock';
import Phaser from 'phaser';
import Menu from '../Menus/Menu';
import MenuItem from '../Menus/MenuItem';
import ActionsMenu from '../Menus/ActionsMenu';
import EnemiesMenu from '../Menus/EnemiesMenu';
import HeroesMenu from '../Menus/HeroesMenu';

test('Menu is an instance of container', () => {
  expect(Menu.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});

test('Menu is a function', () => {
  expect(typeof Menu).toBe('function');
});

test('MenuItem is an instance of Text', () => {
  expect(MenuItem.prototype instanceof Phaser.GameObjects.Text).toBe(true);
});

test('MenuItem is a function', () => {
  expect(typeof MenuItem).toBe('function');
});

test('ActionsMenu is an instance of Text', () => {
  expect(ActionsMenu.prototype instanceof Menu).toBe(true);
});

test('ActionsMenu is a function', () => {
  expect(typeof ActionsMenu).toBe('function');
});

test('EnemiesMenu is an instance of Text', () => {
  expect(EnemiesMenu.prototype instanceof Menu).toBe(true);
});

test('EnemiesMenu is a function', () => {
  expect(typeof EnemiesMenu).toBe('function');
});

test('HeroesMenu is an instance of Text', () => {
  expect(HeroesMenu.prototype instanceof Menu).toBe(true);
});

test('HeroesMenu is a function', () => {
  expect(typeof HeroesMenu).toBe('function');
});