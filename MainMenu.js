var Shapeshifter = Shapeshifter || {};

Shapeshifter.MainMenu = function (game) {
	// Nout!
};

Shapeshifter.MainMenu.prototype = {
	create: function () {
		this.music = this.add.audio('titleMusic');
		this.music.play("",0,0.5,true);

		this.add.sprite(0, 0, 'titlepage');
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
