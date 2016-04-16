var Shapeshifter = Shapeshifter || {};

Shapeshifter.Player = function(game, x, y) {
	//	Create sprite
	Phaser.Sprite.call(this, game, x, y, "shapeshifter");
  
	//	Sprite info
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
  // game.physics.enable(sprite, Phaser.Physics.ARCADE);

	this.velocity = 300;
  this.timeToPointer = 250;

	//	Add this sprite to the game
	this.game.add.existing(this);
};

Shapeshifter.Player.prototype = Object.create(Phaser.Sprite.prototype);
Shapeshifter.Player.prototype.constructor = Shapeshifter.Player;
Shapeshifter.Player.prototype.update = function() {
	//	Handle player input
  if (this.game.input.mousePointer.isDown)
    {
        //  400 is the speed it will move towards the mouse
        this.game.physics.arcade.moveToPointer(this, this.velocity, this.game.input.mousePointer, this.timeToPointer);

        //  if it's overlapping the mouse, don't move any more
      if(  this.game.physics.arcade.distanceToPointer(this) < 10) {
        this.body.velocity.setTo(0,0);
      }
        /*
      if (Phaser.Rectangle.contains(this.body, this.game.input.x, this.game.input.y))
        {
            this.body.velocity.setTo(0, 0);
        }*/
    }
    else
    {
       this.body.velocity.setTo(0, 0);
    }
};
