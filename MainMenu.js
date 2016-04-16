var Shapeshifter = Shapeshifter || {};

Shapeshifter.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

Shapeshifter.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlepage');
    
    
	},

	update: function () {

		//	Do some nice funky main menu effect here
    if(this.input.mousePointer.isDown) {
      this.startGame();
    }

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
