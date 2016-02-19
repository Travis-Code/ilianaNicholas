var Parkour = Parkour ||{};

	//load game assets
	Parkour.PreloadState = {
		preload: function(){
			//show loading screen
			this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loadingBar");
			this.loadingBar.anchor.setTo(0.5);
			this.loadingBar.scale.setTo(3);
			//method that expands the loading bar from 0-100%
			this.load.setPreloadSprite(this.loadingBar);
			//load assets
		this.load.image("player", "assets/sprites/parkourKid.png");
		this.load.image("arrowButton", "assets/sprites/arrowButton.png");
		this.load.image("actionButton", "assets/sprites/actionButton.png");

		},
		create:function(){
			this.state.start("Game");
		}
	};
