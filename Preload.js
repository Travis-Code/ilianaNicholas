var Parkour = Parkour || {};

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
		//this.load.image("player", "assets/sprites/parkourKid.png");
		this.load.image("arrowButton", "assets/sprites/arrowButton.png");
		this.load.image("actionButton", "assets/sprites/actionButton.png");
	    this.load.spritesheet('fire', 'assets/sprites/fire_spritesheet.png', 20, 21, 2, 1, 1);      
	    //this.load.image('barrel', 'assets/sprites/barrel.png');    
	    this.load.image('goal', 'assets/sprites/gorilla3.png');    
	    this.load.image('platform', 'assets/sprites/platform.png');    
	    this.load.image('ground', 'assets/sprites/ground.png');    
	    this.load.image('cloud', 'assets/sprites/clouds.png');    
	    this.load.image('clouds', 'assets/sprites/cloudstile.png');    
	    this.load.image('box', 'assets/sprites/box.png');    
	    this.load.image('water', 'assets/sprites/water.png');    
	    this.load.image('wood', 'assets/sprites/wood.png');    
	    this.load.image('ladder', 'assets/sprites/ladder.png');
	    this.load.image('danger', 'assets/sprites/danger.png');

	    //spritesheet ("key", "path", xframeSize, yframeSize, num of frames in sheet.)    
	    this.load.spritesheet("playerWalking", "assets/sprites/parkourKidSheet.png",40.75,83);

	    //load json file.
	    this.load.text("level", "assets/prefabrications/level.json");

		},
		create:function(){
			this.state.start("Game");
		}
	};
