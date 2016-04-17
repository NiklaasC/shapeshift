var Shapeshifter = Shapeshifter || {};

Shapeshifter.Collectable = function(game, x, y, player, group, score) {
	//	Create sprite
	Phaser.Sprite.call(this, game, x, y, 'entities', 4);
  
	//	Sprite info
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
  // game.physics.enable(sprite, Phaser.Physics.ARCADE);
  
  this.player = player;
  this.group = group;
  
  this.pickup = this.game.add.audio('pickup');
  
  //	Add this sprite to the game
	//  this.game.add.existing(this);
  this.group.add(this);
};

Shapeshifter.Collectable.prototype = Object.create(Phaser.Sprite.prototype);
Shapeshifter.Collectable.prototype.constructor = Shapeshifter.Collectable;
Shapeshifter.Collectable.prototype.update = function() {
  if (this.game.physics.arcade.distanceBetween(this, this.player) < 32) {
    this.kill();
    this.pickup.play();
    this.player.score += 1;
  }
  
  if (this.alive === false) {
    this.x = this.game.rnd.integerInRange(0, 640);
    this.y = this.game.rnd.integerInRange(0, 360);
    this.revive();
  }
};
