import Unit from './Unit';

export default class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage, 0.8);
    this.setScale(2);
  }
}