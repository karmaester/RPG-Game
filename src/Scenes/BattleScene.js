class BattleScene extends Phaser.Scene {

    constructor() {
        super('BattleScene');
      }

    create ()
    {    
        // change the background to green
        this.cameras.main.setBackgroundColor("rgba(0, 98, 184, 0.5)");
        this.startBattle();
        // on wake event we call startBattle too
        this.sys.events.on('wake', this.startBattle, this);             
    }

    startBattle () {
        // player character - warrior
        var warrior = new PlayerCharacter(this, 350, 70, "player", 1, "Firebeast", 100, 20);        
        this.add.existing(warrior);
        
        // player character - mage
        var mage = new PlayerCharacter(this, 350, 150, "player", 4, "Icebeast", 80, 8);
        this.add.existing(mage);            
        
        var dragonblue = new Enemy(this, 70, 65, "damon", null, "Demon", 3, 3);
        this.add.existing(dragonblue);
        
        var dragonOrange = new Enemy(this, 70, 170, "shadow", null,"Shadow", 3, 3);
        this.add.existing(dragonOrange);
        
        // array with heroes
        this.heroes = [ warrior, mage ];
        // array with enemies
        this.enemies = [ dragonblue, dragonOrange ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        
        this.index = -1; // currently active unit
        
        this.scene.run("UIScene");        
    }

    nextTurn () {  
        // if we have victory or game over
        if(this.checkEndBattle()) {           
            this.endBattle();
            return;
        }
        do {
            // currently active unit
            this.index++;
            // if there are no more units, we start again from the first one
            if(this.index >= this.units.length) {
                this.index = 0;
            }            
        } while(!this.units[this.index].living);
        // if its player hero
        if(this.units[this.index] instanceof PlayerCharacter) {
            // we need the player to select action and then enemy
            this.events.emit("PlayerSelect", this.index);
        } else { // else if its enemy unit
            // pick random living hero to be attacked
            var r;
            do {
                r = Math.floor(Math.random() * this.heroes.length);
            } while(!this.heroes[r].living) 
            // call the enemy's attack function 
            this.units[this.index].attack(this.heroes[r]);  
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }
    // check for game over or victory
    checkEndBattle () {        
        var victory = true;
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    }

    // when the player have selected the enemy to be attacked
    receivePlayerSelection (action, target) {
        if(action == "attack") {            
            this.units[this.index].attack(this.enemies[target]);              
        }
        // next turn in 3 seconds
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }

    endBattle () {       
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();            
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UIScene');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('Game');
    }
};

// base class for heroes and enemies
class Unit extends Phaser.GameObjects.Sprite {

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
    setMenuItem (item) {
        this.menuItem = item;
    }

    // attack the target unit
    attack (target) {
        if(target.living) {
            target.takeDamage(this.damage);
            this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
        }
    }

    takeDamage (damage) {
        this.hp -= damage;
        if(this.hp <= 0) {
            this.hp = 0;
            this.menuItem.unitKilled();
            this.living = false;
            this.visible = false;   
            this.menuItem = null;
        }
    }    
};

class Enemy extends Unit {

    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame, type, hp, damage, 0.8);
        this.setScale(2);
      }
};

class PlayerCharacter extends Unit {

    constructor(scene, x, y, texture, frame, type, hp, damage) {
        super(scene, x, y, texture, frame, type, hp, damage, 1.3);
    
        this.flipX = true;
        this.setScale(4);
      }
};

class MenuItem extends Phaser.GameObjects.Text {
    constructor(x, y, text, scene) {
      super(scene, x, y, text, { color: '#ffffff', align: 'left' });
    }
  
    select() {
      this.setColor('#f8ff38');
    }
  
    deselect() {
      this.setColor('#ffffff');
    }
  
    unitKilled() {
      this.active = false;
      this.visible = false;
    }
};

// base menu class, container for menu items
class Menu extends Phaser.GameObjects.Container {
    constructor(x, y, scene, heroes) {
      super(scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.x = x;
      this.y = y;
      this.heroes = heroes;
      this.selected = false;
    }
  
    addMenuItem(unit) {
      const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
      this.menuItems.push(menuItem);
      this.add(menuItem);
      return menuItem;
    }
  
    moveSelectionUp() {
      this.menuItems[this.menuItemIndex].deselect();
      do {
        this.menuItemIndex -= 1;
        if (this.menuItemIndex < 0) {
          this.menuItemIndex = this.menuItems.length - 1;
        }
      } while (!this.menuItems[this.menuItemIndex].active);
      this.menuItems[this.menuItemIndex].select();
    }
  
    moveSelectionDown() {
      this.menuItems[this.menuItemIndex].deselect();
      do {
        this.menuItemIndex += 1;
        if (this.menuItemIndex > this.menuItems.length - 1) {
          this.menuItemIndex = 0;
        }
      } while (!this.menuItems[this.menuItemIndex].active);
      this.menuItems[this.menuItemIndex].select();
    }
  
    // select the menu as a whole and an element with index from it
    select(index) {
      if (!index) {
        index = 0;
      }
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = index;
  
      while (!this.menuItems[this.menuItemIndex].active) {
        this.menuItemIndex += 1;
        if (this.menuItemIndex >= this.menuItems.length) {
          this.menuItemIndex = 0;
        }
        if (this.menuItemIndex === index) {
          return;
        }
      }
      this.menuItems[this.menuItemIndex].select();
      this.selected = true;
    }
  
    // deselect this menu
    deselect() {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = 0;
      this.selected = false;
    }
  
    clear() {
      for (let i = 0; i < this.menuItems.length; i += 1) {
        this.menuItems[i].destroy();
      }
      this.menuItems.length = 0;
      this.menuItemIndex = 0;
    }
  
    remap(units) {
      this.clear();
      for (let i = 0; i < units.length; i += 1) {
        const unit = units[i];
        unit.setMenuItem(this.addMenuItem(unit.type));
      }
      this.menuItemIndex = 0;
    }
};

class HeroesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
  }
};

class ActionsMenu extends Menu {
    constructor(x, y, scene) {
      super(x, y, scene);
      this.addMenuItem('Attack');
    }
  
    confirm() {
      this.scene.events.emit('SelectedAction');
    }
};

class EnemiesMenu extends Menu {
    // eslint-disable-next-line no-useless-constructor
    constructor(x, y, scene) {
      super(x, y, scene);
    }
  
    confirm() {
      this.scene.events.emit('Enemy', this.menuItemIndex);
    }
};

// User Interface scene
class UIScene extends Phaser.Scene {
    constructor() {
      super('UIScene');
    }
  
    create() {
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);
  
      // rectangle 1
      this.graphics.strokeRect(2, 250, 140, 100);
      this.graphics.fillRect(2, 250, 140, 100);
      // rectangle 2
      this.graphics.strokeRect(145, 250, 130, 100);
      this.graphics.fillRect(145, 250, 130, 100);
      // rectangle 3
      this.graphics.strokeRect(278, 250, 140, 100);
      this.graphics.fillRect(278, 250, 140, 100);
  
      // menus
      this.menus = this.add.container();
  
      this.heroesMenu = new HeroesMenu(295, 263, this);
      this.actionsMenu = new ActionsMenu(178, 283, this);
      this.enemiesMenu = new EnemiesMenu(18, 263, this);
  
      this.currentMenu = this.actionsMenu;
  
      this.menus.add(this.heroesMenu);
      this.menus.add(this.actionsMenu);
      this.menus.add(this.enemiesMenu);
  
      // getting heroes and enemies from battleScene
      this.battleScene = this.scene.get('BattleScene');
  
      // cursors
      this.input.keyboard.on('keydown', this.onKeyInput, this);
  
      // listener for turn-events
      this.battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);
      this.events.on('SelectedAction', this.onSelectedAction, this);
      this.events.on('Enemy', this.onEnemy, this);
  
      // wake event listener
      this.sys.events.on('wake', this.createMenu, this);
  
      // messages
      this.message = new Message(this, this.battleScene.events);
      this.add.existing(this.message);
  
      this.createMenu();
    }
  
    createMenu() {
      this.remapHeroes();
      this.remapEnemies();
  
      this.battleScene.nextTurn();
    }
  
    remapHeroes() {
      const { heroes } = this.battleScene;
      this.heroesMenu.remap(heroes);
    }
  
    remapEnemies() {
      const { enemies } = this.battleScene;
      this.enemiesMenu.remap(enemies);
    }
  
    onKeyInput(event) {
      if (this.currentMenu && this.currentMenu.selected) {
        if (event.code === 'ArrowUp') {
          this.currentMenu.moveSelectionUp();
        } else if (event.code === 'ArrowDown') {
          this.currentMenu.moveSelectionDown();
        } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
          this.currentMenu.confirm();
        }
      }
    }
  
    onPlayerSelect(id) {
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
    }
  
    onSelectedAction() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    }
  
    onEnemy(index) {
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection('attack', index);
    }
};

// the message class extends containter 
class Message extends Phaser.GameObjects.Container {
    constructor(scene, events) {
      super(scene, 160, 30);
      const graphics = this.scene.add.graphics();
      this.add(graphics);
  
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(-50, -15, 200, 30);
      graphics.fillRect(-50, -15, 200, 30);
  
      this.text = new Phaser.GameObjects.Text(scene, 50, 0, '', {
        color: '#ffffff',
        align: 'center',
        fontSize: 12,
        wordWrap: { width: 195, useAdvancedWrap: true },
      }).setOrigin(0.5);
      this.add(this.text);
  
      events.on('Message', this.showMessage, this);
      this.visible = false;
    }
  
    showMessage(text) {
      this.text.setText(text);
      this.visible = true;
      if (this.hideEvent) {
        this.hideEvent.remove(false);
      }
      this.hideEvent = this.scene.time.addEvent(
        { delay: 2000, callback: this.hideMessage, callbackScope: this },
      );
    }
  
    hideMessage() {
      this.hideEvent = null;
      this.visible = false;
    }
  };

  export { BattleScene, UIScene };