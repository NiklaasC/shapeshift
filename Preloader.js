var Shapeshifter = Shapeshifter || {};

Shapeshifter.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Shapeshifter.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(169, 120, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlepage', 'res/title.png');
    this.load.spritesheet('entities', 'res/entities.png', 64, 64, 5);
    this.load.image('endgame', 'res/endgame.png');
    this.load.image('cucumberLarge', 'res/cucumber_large.png');
    this.load.image('mouseLarge', 'res/mouse_large.png');
    this.load.image('catLarge', 'res/cat_large.png');
    this.load.image('shardLarge', 'res/shard_large.png');
    this.load.image('shapeLarge', 'res/shape_large.png');
    
    this.load.image('replayMessage', 'res/replay_message.png');
    this.load.image('cucumberMessage', 'res/cucumber_message.png');
    this.load.image('mouseMessage', 'res/mouse_message.png');
    this.load.image('catMessage', 'res/cat_message.png');
    this.load.image('oopsMessage', 'res/oops_message.png');
    this.load.image('doneitMessage', 'res/doneit_message.png');
    
    this.load.audio('plip', 'res/Muted.wav');
    this.load.audio('shift', 'res/DOOK.wav');
    this.load.audio('failed', 'res/BEND.wav');
    this.load.audio('pickup', 'res/DOO.wav');
    this.load.audio('win', 'res/woo.wav');
    this.load.audio('death', 'res/slap.wav');
    
		//this.load.audio('titleMusic', ['res/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		//if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		//{
			this.ready = true;
			this.state.start('MainMenu');
		//}

	}

};
