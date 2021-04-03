/* eslint-disable no-undef */
export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.type = type;
    if (type === 'Warrior') {
      this.maxHP = 100;
    }
    if (type === 'Mage') {
      this.maxHP = 50;
    }

    this.hp = hp;
    this.damage = damage; // default damage
    // this.setScale(scale);

    this.living = true;
    this.menuItem = null;
  }

  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
    this.menuItem = item;
  }

  // attack the target unit
  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
    }
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  }
}
/* eslint-enable no-undef */