var Shapeshifter = Shapeshifter || {};

Shapeshifter.Boot = function (game) {
  //  Nothing!
};

Shapeshifter.Boot.prototype = {

    init: function () {

        //  Multi-touch disabled
        this.input.maxPointers = 1;
        
        //  Start physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
/*
        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            //this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x270 and no higher than 1024x576"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 270, 1024, 576);
            this.scale.forceLandscape = true;
            //this.scale.pageAlignHorizontally = true;
        }*/

    },

    preload: function () {
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'res/preloader_background.png');
        this.load.image('preloaderBar', 'res/preloader_bar.png');
    },
    create: function () {
        //  So now let's start the real preloader going
        this.state.start('Preloader');
    }
};
