/* eslint-disable no-undef */
import 'phaser';
import spritesheet from '../assets/map/spritesheet.png';
import map from '../assets/map/map.json';
import players from '../assets/RPG_assets.png';
import damon from '../assets/damon.png';
import shadow from '../assets/shadow.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', '../assets/zenva_logo.png');
    // map tiles
    this.load.image('tiles', spritesheet);

    // map in json format
    this.load.tilemapTiledJSON('map', map);

    // enemies
    this.load.image('damon', damon);
    this.load.image('shadow', shadow);

    // our two characters
    this.load.spritesheet('player', players, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    this.scene.start('Preloader');
  }
}
/* eslint-enable no-undef */