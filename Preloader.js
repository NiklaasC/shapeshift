var Shapeshifter = Shapeshifter || {};

Shapeshifter.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
  
	this.ready = false;
};

Shapeshifter.Preloader.prototype = {
	preload: function () {
		//	These are the assets we loaded in Boot.js
		//	A nice sparkly (hah!) background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(169, 120, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
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
    
		this.load.audio('titleMusic', ['res/ldjam35-01.ogg', 'res/ldjam35-01.mp3']);
		//	+ lots of other required assets here
	},
	create: function () {
		//	Disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
	},
	update: function () {
		//	Wait for our audio file to be decoded before proceeding to the MainMenu.
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
