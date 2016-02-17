var Parkour = Parkour || {};

// setting game config and loading the assets for the loading screen.
Parkour.BootState ={
	init: function(){
		this.game.stage.backgroundColor =#fff;
		this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		//initialize the arcade physics system
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	preload: function (){
		// assets we'll use in the loading screen.
		this.load.image("loadingBar", "assets/images/LoadingBar.png");
	},
	create: function(){
		this.state.start("Preload");
	}

};