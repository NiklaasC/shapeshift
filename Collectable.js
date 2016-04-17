var Shapeshifter = Shapeshifter || {};

Shapeshifter.Collectable = function(game, x, y, player, group, score) {
	//	Create sprite
	Phaser.Sprite.call(this, game, x, y, 'entities', 4);
  
	//	Sprite info
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
  
  this.player = player;
  this.group = group;
  
  this.pickup = this.game.add.audio('pickup');
  
  //	Add this sprite to the game
  this.group.add(this);
  
  this.game.add.tween(this).to( { height: 80, width: 80 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
};

Shapeshifter.Collectable.prototype = Object.create(Phaser.Sprite.prototype);
Shapeshifter.Collectable.prototype.constructor = Shapeshifter.Collectable;
Shapeshifter.Collectable.prototype.update = function() {
  if (this.game.physics.arcade.distanceBetween(this, this.player) < 32) {
    this.kill();
    this.pickup.play("",0,0.5);
    this.player.score += 1;
    // Reset and tween!
    this.player.height = 64;
    this.player.width = 64;
    this.game.add.tween(this.player).to( { height: 80, width: 80 }, 100, Phaser.Easing.Linear.None, true, 0, 0, true);
  }
  
  if (this.alive === false) {
    this.x = this.game.rnd.integerInRange(0, 640);
    this.y = this.game.rnd.integerInRange(0, 360);
    this.revive();
  }
};
