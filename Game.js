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
        this.world.setBounds(-16, -16, 672, 392);
        //this.cucumberGroup = this.add.group();
        //this.mouseGroup = this.add.group();
        //this.catGroup = this.add.group();
        this.entityGroup = this.add.group();
        
                
        this.player = new Shapeshifter.Player(this.game, 320, 180);
        
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
        
        // Move anything near the player!
        for (var search = 0; search < this.entityGroup.length; search++) {
      		// if dead ... kill!
          if (this.game.physics.arcade.distanceBetween(this.entityGroup.children[search], this.player) < 64) {
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
            this.spawn(this.entityGroup.children[search]);
          }
      	}
        if ( this.player.alive === false) {
          // End game?
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
    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
