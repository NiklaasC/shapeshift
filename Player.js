var Shapeshifter = Shapeshifter || {};

Shapeshifter.Player = function(game, x, y) {
	//	Create sprite
	Phaser.Sprite.call(this, game, x, y, 'entities', 3);
  
	//	Sprite info
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
  
  this.species = 'shapeshifter'; // Or Mouse, Cat, Cucumber
	this.velocity = 60;
  this.timeToPointer = 250;
  this.deathBy;
  this.score = 0;
  
  this.shift = this.game.add.audio('shift');
  
  this.game.time.events.add(Phaser.Timer.SECOND * 3, this.shapeshift, this);
  
	// 	Add this sprite to the game
	this.game.add.existing(this);
};

Shapeshifter.Player.prototype = Object.create(Phaser.Sprite.prototype);
Shapeshifter.Player.prototype.constructor = Shapeshifter.Player;
Shapeshifter.Player.prototype.update = function() {
	//	Handle player input
  if (this.game.input.activePointer.isDown) {
    this.game.physics.arcade.moveToPointer(this, this.velocity, this.game.input.activePointer, this.timeToPointer);
    
    //  if it's overlapping the mouse, don't move any more
    if(  this.game.physics.arcade.distanceToPointer(this) < 10) {
      this.body.velocity.setTo(0,0);
    }
  } else {
    this.body.velocity.setTo(0, 0);
  }
};
Shapeshifter.Player.prototype.shapeshift = function () {
  var shift = this.game.rnd.integerInRange(0, 3);
  switch (shift) {
    case 0:
      this.species = "cucumber";
      this.frame = 0;
      break;
    case 1:
      this.species = "mouse";
      this.frame = 1;
      break;
    case 2:
      this.species = "cat";
      this.frame = 2;
      break;
    case 3:
      this.species = "shapeshifter";
      this.frame = 3;
      break;
    default:
      this.species = "shapeshifter";
      this.frame = 3;
  }
  // Reset to original size before tween to prevent tweens colliding and taking a new initial height/width and getting stuck big!
  this.height = 64;
  this.width = 64;
  this.game.add.tween(this).to( { height: 80, width: 80 }, 100, Phaser.Easing.Linear.None, true, 0, 0, true);
  var nextShift = this.game.rnd.integerInRange(3,5)
  this.game.time.events.add(Phaser.Timer.SECOND * nextShift, this.shapeshift, this);
  if (this.alive) {
    this.shift.play("",0,0.5);
  }
};
