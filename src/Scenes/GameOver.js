import Phaser from 'phaser';
import { setScore } from '../api/scoreBoard';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.text(
      game.config.width / 2,
      70,
      'Thanks for playing', {
        fill: '#ffffff',
        fontSize: '22px',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      100,
      'Fire & Ice', {
        fill: '#ffffff',
        fontSize: '32px',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      180,
      'Score:', {
        fill: '#ffffff',
        fontSize: '24px',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      220,
      `${window.playerName}: ${window.score}`, {
        fill: '#ffffff',
        fontSize: '24px',
      },
    ).setOrigin(0.5);

    setScore(window.playerName, window.score);
  }
}