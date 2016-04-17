var Shapeshifter = Shapeshifter || {};

Shapeshifter.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};

Shapeshifter.Game.prototype = {

    create: function () {
      
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(0, 0, 'preloaderBackground');
        
        // 640, 360
        this.world.setBounds(-32, -32, 688, 408);
        
        
        //audio
        this.killNoise = this.game.add.audio('plip');
        this.failNoise = this.game.add.audio('failed');
        this.winNoise = this.game.add.audio('win');
        
        
        this.gameState = 'preplay';
        // preplay, play, transition, gameover, gameinit
        //this.cucumberGroup = this.add.group();
        //this.mouseGroup = this.add.group();
        //this.catGroup = this.add.group();
        this.collectableGroup = this.add.group();
        this.entityGroup = this.add.group();
                
        this.player = new Shapeshifter.Player(this.game, 320, 180);
        
        this.collectable = new Shapeshifter.Collectable(this.game, this.game.rnd.integerInRange(0, 640), this.game.rnd.integerInRange(0, 360), this.player,this.collectableGroup);
        
        // HACKY HACKY HACKY
        this.cucumber = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.mouse = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cat = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cucumber = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.mouse = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cat = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cucumber = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.mouse = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cat = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cucumber = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.mouse = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cat = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cucumber = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.mouse = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cat = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cucumber = new Shapeshifter.Cucumber(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.mouse = new Shapeshifter.Mouse(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        this.cat = new Shapeshifter.Cat(this.game, this.world.randomX,this.world.randomY, this.player, this.entityGroup);
        //this.entityGroup.setAll('body.collideWorldBounds', true);
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
        
        // Move anything near the player!
        for (var search = 0; search < this.entityGroup.length; search++) {
      		// if dead ... kill!
          if (this.game.physics.arcade.distanceBetween(this.entityGroup.children[search], this.player) < 92) {
            // Recycle
            this.entityGroup.children[search].kill();
            this.spawn(this.entityGroup.children[search]);
          }
      	}
        
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //  this.player.update();
        
        for (var search = 0; search < this.entityGroup.length; search++) {
      		// if dead ... kill!
          if (this.entityGroup.children[search].alive === false) {
            // Recycle
            this.killNoise.play();
            this.spawn(this.entityGroup.children[search]);
          }
      	}
        if (this.player.score >= 10 && this.gameState === 'play') {
          // this.player.kill();
          this.winNoise.play();
          this.gameState = 'transition';
          this.game.add.tween(this.fader).to( { alpha: 0.8 }, 2000, Phaser.Easing.Linear.None, true, 0);
          this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameoverState, this);
          this.game.add.tween(this.largeShape).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          this.game.add.tween(this.messageDoneit).to( { y: 51 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
          this.game.add.tween(this.messageReplay).to( { y: 280 }, 2000, Phaser.Easing.Bounce.Out, true, 0);
        }
        
        if ( this.player.alive === false && this.gameState === 'play') {
          this.failNoise.play();
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
        
        if (this.input.activePointer.isDown && this.gameState === 'gameover'){
          this.state.start('Game');
        }
    },
    spawn: function (entity) {
      entity.x = this.world.randomX;
      entity.y = this.world.randomY;
      if (this.game.physics.arcade.distanceBetween(entity, this.player) < 64) {
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
