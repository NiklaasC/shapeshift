var Shapeshifter = Shapeshifter || {};

Shapeshifter.Mouse = function(game, x, y, player, group) {
	//	Create sprite
	Phaser.Sprite.call(this, game, x, y, "mouse");
  
	//	Sprite info
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
  // game.physics.enable(sprite, Phaser.Physics.ARCADE);
  
  this.species = "mouse";
  this.player = player;
  this.group = group;
	this.velocity = 200;
  //this.timeToPointer = 250;

	//	Add this sprite to the game
	// this.game.add.existing(this);
  //  Add it to the group!
  this.group.add(this);
};

Shapeshifter.Mouse.prototype = Object.create(Phaser.Sprite.prototype);
Shapeshifter.Mouse.prototype.constructor = Shapeshifter.Mouse;
Shapeshifter.Mouse.prototype.update = function() {
	//	Handle input
  //  See what the closest thing is .. then react to it!
  //  Make sure to exclude self!
  var neighbour = this.closestNeighbour(this, this.group, this.player);
  
  
  
  if ( (neighbour.species === "shapeshifter") || (neighbour.species === "cucumber") ) {
    if( this.game.physics.arcade.distanceBetween(this, neighbour) < 32 ) {
      //  If the distance between the mouse and it's targets is pretty close ... it doesn't have to move!
        this.body.velocity.setTo(0,0);
    } else {
      this.game.physics.arcade.moveToObject(this, neighbour, this.velocity);
    }
  } else {
    this.game.physics.arcade.moveToObject(this, neighbour, -this.velocity);
  }
  
};

Shapeshifter.Mouse.prototype.closestNeighbour = function (callee, group, player) {
  var distance;
  var closestDistance;
  var closest;
  for (var search = 0; search < group.length; search++) {
		// if they are not the entity doing the searching!
		if (group.children[search] !== callee) {
			// grab the distance
			distance = this.game.physics.arcade.distanceBetween(this, group.children[search]);
			if (!closestDistance) {
				closestDistance = distance;
				closest = group.children[search];
			} else if (distance < closestDistance ) {
				closestDistance = distance;
				closest = group.children[search];
			}
		}
  }
  
  // Remember to check Player!
  if (this.game.physics.arcade.distanceBetween(this, player) < closestDistance ) {
    closestDistance = distance;
    closest = player;
  }
  
  return closest;
};
