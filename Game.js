var Shapeshifter = Shapeshifter || {};

Shapeshifter.Game = function (game) {
  // Nothin'!
};

Shapeshifter.Game.prototype = {
  create: function () {
    this.add.sprite(0, 0, 'background');
    
    // 640, 360
    this.world.setBounds(-32, -32, 688, 408);
    
    //audio
    this.killNoise = this.game.add.audio('plip');
    this.failNoise = this.game.add.audio('failed');
    this.winNoise = this.game.add.audio('win');
    this.music = this.add.audio('titleMusic');
    this.music.play("",0,0.5,true);
    
    this.gameState = 'preplay';
    // preplay, play, transition, gameover, gameinit
    this.collectableGroup = this.add.group();
    this.entityGroup = this.add.group();
          
    this.player = new Shapeshifter.Player(this.game, 320, 180);
    
    this.collectable = new Shapeshifter.Collectable(this.game, this.game.rnd.integerInRange(0, 640), this.game.rnd.integerInRange(0, 360), this.player,this.collectableGroup);
    
    this.entity;
    
    for (var entitySpawner = 0; entitySpawner <= 6; entitySpawner += 1) {
      this.entity = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
      this.entity = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
      this.entity = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
    }
    
    this.fader = this.add.sprite(0,0,'endgame');
    this.fader.alpha = 0.8;
    
    this.largeCucumber = this.add.sprite(18, 360, 'cucumberLarge');
    this.largeMouse = this.add.sprite(18, 360, 'mouseLarge');
    this.largeCat = this.add.sprite(18, 360, 'catLarge');
    this.largeShape = this.add.sprite(18, 360, 'shapeLarge');
    
    this.messageReplay = this.add.sprite(285,360, 'replayMessage');
    this.messageCucumber = this.add.sprite(285,-210,'cucumberMessage');
    this.messageMouse = this.add.sprite(285,-210,'mouseMessage');
    this.messageCat = this.add.sprite(285,-210,'catMessage');
    this.messageOops = this.add.sprite(285,-210,'oopsMessage');
    this.messageDoneit = this.add.sprite(285,-210,'doneitMessage');
    
    this.game.add.tween(this.fader).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.playState, this);
    
    // Move anything too near the player!
    for (var search = 0; search < this.entityGroup.length; search++) {
    	// if dead ...
      if (this.game.physics.arcade.distanceBetween(this.entityGroup.children[search], this.player) < 112) {
        // ... recycle
        this.entityGroup.children[search].kill();
        this.spawn(this.entityGroup.children[search]);
      }
    }
  },
  update: function () {
    // Clean up dead sprites and respawn them!
    for (var search = 0; search < this.entityGroup.length; search++) {
    	// if dead ...
      if (this.entityGroup.children[search].alive === false) {
        // ... recycle
        this.killNoise.play("",0,0.5);
        this.spawn(this.entityGroup.children[search]);
        // Make the revived sprite pop-in!
        this.entityGroup.children[search].height = 16;
        this.entityGroup.children[search].width = 16;
        
        this.game.add.tween(this.entityGroup.children[search]).to( { height: 64, width: 64 }, 100, Phaser.Easing.Linear.None, true, 0);
      }
    }
    if (this.player.score >= 10 && this.gameState === 'play') {
      // this.player.kill();
      this.music.stop();
      this.winNoise.play("",0,0.5);
      this.gameState = 'transition';
      this.game.add.tween(this.fader).to( { alpha: 0.8 }, 2000, Phaser.Easing.Linear.None, true, 0);
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameoverState, this);
      this.game.add.tween(this.largeShape).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
      this.game.add.tween(this.messageDoneit).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
      this.game.add.tween(this.messageReplay).to( { y: 280 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
    }
    
    if ( this.player.alive === false && this.gameState === 'play') {
      this.music.stop();
      this.failNoise.play("",0,0.5);
      this.gameState = 'transition';
      this.game.add.tween(this.fader).to( { alpha: 0.8 }, 2000, Phaser.Easing.Linear.None, true, 0);
      this.game.add.tween(this.messageReplay).to( { y: 280 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
      
      switch (this.player.deathBy) {
        case 'cucumber':
          this.game.add.tween(this.largeCucumber).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          this.game.add.tween(this.messageCucumber).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          break;
        case 'mouse':
          this.game.add.tween(this.largeMouse).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          this.game.add.tween(this.messageMouse).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          break;
        case 'cat':
          this.game.add.tween(this.largeCat).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          this.game.add.tween(this.messageCat).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          break;
        default:
          this.game.add.tween(this.largeShape).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          this.game.add.tween(this.messageOops).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
      }
      
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameoverState, this);
      
    }
    
    if (this.input.activePointer.isDown && this.gameState === 'gameover') {
      this.state.start('Game');
    }
  },
  spawn: function (entity) {
    entity.x = this.world.randomX;
    entity.y = this.world.randomY;
    if (this.game.physics.arcade.distanceBetween(entity, this.player) < 96) {
      this.spawn(entity);
    }
    entity.revive();
  },
  gameoverState: function () {
    this.gameState = 'gameover';
  },
  playState: function () {
    this.gameState = 'play';
  },
  quitGame: function (pointer) {
    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    
    //  Then let's go back to the main menu.
    this.state.start('MainMenu');
  }
};
