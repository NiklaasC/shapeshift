var Shapeshifter = Shapeshifter || {};

Shapeshifter.Cat = function(game, x, y, player, group) {
	//	Create sprite
	Phaser.Sprite.call(this, game, x, y, 'entities', 2);
  
	//	Sprite info
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);

  this.species = "cat";
  this.player = player;
  this.group = group;
	this.velocity = 75;
  
  this.killedPlayer = this.game.add.audio('death');
  
  //  Add it to the group!
  this.group.add(this);
  
  this.height = 16;
  this.width = 16;
  
  this.game.add.tween(this).to( { height: 64, width: 64 }, 100, Phaser.Easing.Linear.None, true, 0);
};

Shapeshifter.Cat.prototype = Object.create(Phaser.Sprite.prototype);
Shapeshifter.Cat.prototype.constructor = Shapeshifter.Cat;
Shapeshifter.Cat.prototype.update = function() {
  var neighbour = this.closestNeighbour(this, this.group, this.player);
  
  if ( (neighbour.species === "shapeshifter") || (neighbour.species === "mouse") ) {
    if( this.game.physics.arcade.distanceBetween(this, neighbour) < 32 ) {
      //  If the distance between the mouse and it's targets is pretty close ... it doesn't have to move!
        this.body.velocity.setTo(0,0);
        neighbour.kill();
        if (neighbour === this.player) {
          this.player.deathBy = 'cat';
          this.killedPlayer.play("",0,0.5);
        }
    } else {
      this.game.physics.arcade.moveToObject(this, neighbour, this.velocity);
    }
  } else {
    this.game.physics.arcade.moveToObject(this, neighbour, -this.velocity);
  }
  this.game.world.wrap(this, 0, false);
};
Shapeshifter.Cat.prototype.closestNeighbour = function (callee, group, player) {
  var distance;
  var closestDistance;
  var closest;
  for (var search = 0; search < group.length; search++) {
		// if they are not the entity doing the searching!
		if (group.children[search] !== callee) {
      if(group.children[search].alive) {
  			// grab the distance
  			distance = this.game.physics.arcade.distanceBetween(this, group.children[search]);
        // ignore your own species!
        if (group.children[search].species !== this.species) {
    			if (!closestDistance) {
    				closestDistance = distance;
    				closest = group.children[search];
    			} else if (distance < closestDistance ) {
    				closestDistance = distance;
    				closest = group.children[search];
    			}
        }
      }
		}
  }
  // Remember to check Player!
  if (this.game.physics.arcade.distanceBetween(this, player) < closestDistance && player.alive) {
    closestDistance = distance;
    closest = player;
  }
  return closest;
};
