import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 420,
  height: 340,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false, // set to true to view zones
    },
  },
//   scene: [
//     BootScene,
//     WorldScene,
//     BattleScene,
//     UIScene
// ]
};
