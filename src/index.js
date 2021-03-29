import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import InstructionsScene from './Scenes/Instructions';
import Scores from './Scenes/Scores';
import GameOver from './Scenes/GameOver';
import GetName from './Scenes/getName';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';
import { BattleScene, UIScene } from './Scenes/BattleScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Instructions', InstructionsScene);
    this.scene.add('Scores', Scores);
    this.scene.add('GetName', GetName);
    this.scene.add('GameOver', GameOver);
    this.scene.add('Game', GameScene);
    this.scene.add('UIScene', UIScene);
    this.scene.add('BattleScene', BattleScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();