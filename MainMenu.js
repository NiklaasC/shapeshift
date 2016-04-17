var Shapeshifter = Shapeshifter || {};

Shapeshifter.MainMenu = function (game) {
	// Nout!
};

Shapeshifter.MainMenu.prototype = {
	create: function () {
		this.music = this.add.audio('titleMusic');
		this.music.play("",0,0.5,true);
    
		this.add.sprite(0, 0, 'titlepage');
    
    this.logo = this.add.sprite( 60,16, 'logo');
    this.shapeshifter = this.add.sprite(75,180, 'mediumShape');
    this.shapeshifter.anchor.setTo(0.5, 0.5);
    
    // Tweens!
    // properties, duration, ease, autoStart, delay, repeat, yoyo
    this.game.add.tween(this.shapeshifter).to( { height: 96 }, 600, Phaser.Easing.Linear.None, true, 0, -1, true);
    this.game.add.tween(this.logo).to( { y: 8 }, 1100, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
	},
	update: function () {
		//	Click to play!
    if(this.input.activePointer.isDown) {
      this.startGame();
    }
	},
	startGame: function (pointer) {
		this.music.stop();
		this.state.start('Game');
	}
};
