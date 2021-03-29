import Phaser from 'phaser';
// import { setScore } from '../api/scoreBoard';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.text(
      game.config.width / 2,
      20,
      'Thanks for Playing', {
        fill: '#ffffff',
        fontSize: '22px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      50,
      'Fire & Ice', {
        fill: '#ffffff',
        fontSize: '32px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      100,
      'Your Score:', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      140,
      `${window.playerName}: ${window.score}`, {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    // setScore(window.playerName, window.score);
  }
}