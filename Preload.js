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
		this.load.image("arrowButton", "assets/sprites/glassArrow.png");
		this.load.image("actionButton", "assets/sprites/whiteButton.png");
	    //this.load.spritesheet('fire', 'assets/sprites/fire_spritesheet.png', 20, 21, 2, 1, 1);
	    this.load.spritesheet('fire', 'assets/sprites/fireSprite.png', 169, 112);      

	    this.load.image('barrel', 'assets/sprites/barrel.png');    
	    //this.load.image('goal', 'assets/sprites/gorilla3.png');    
	   // this.load.image('platform', 'assets/sprites/platform.png');    
	    this.load.image('metalPlatform', 'assets/sprites/metalPlatform.png');  
	    this.load.image('pole', 'assets/sprites/pole.png');      
	    this.load.image('ground', 'assets/sprites/ground.png');    
	    this.load.image('cloud', 'assets/sprites/clouds.png');    
	    this.load.image('clouds', 'assets/sprites/cloudstile.png');    
	    this.load.image('box', 'assets/sprites/box.png');    
	    this.load.image('boxTwo', 'assets/sprites/boxTwo.png');    
	    this.load.image('water', 'assets/sprites/water.png');    
	    this.load.image('wood', 'assets/sprites/wood.png');    
	    this.load.image('ladder', 'assets/sprites/ladder.png');
	    this.load.image('danger', 'assets/sprites/danger.png');
	  	this.load.image('marioHat', 'assets/sprites/redHat.png');
	    this.load.image('pipeWarp', 'assets/sprites/pipeWarp.png');
	    this.load.image('backgroundCity', 'assets/sprites/backgroundPic.png');
	    this.load.image('superPKTitle', 'assets/sprites/superPKTitleTwo.png');
	    this.load.image('playButton', 'assets/sprites/playButton.png');
	   	//this.load.image('godzilla', 'assets/sprites/godzillaSpriteProto.png');
	   	this.load.spritesheet('godzilla', 'assets/sprites/godZillaAnimate.png', 534, 932);
	    this.load.spritesheet('cat', 'assets/sprites/cat.png', 61.9, 47);    

	    this.game.load.audio("coolHipHop", ["assets/sprites/coolHipHop.mp3","assets/sounds/coolHipHop.ogg"]);
	    this.game.load.audio("jumpPark", ["assets/sprites/jumpPark.mp3","assets/sounds/jumpPark.ogg"]);



	    //spritesheet ("key", "path", xframeSize, yframeSize, num of frames in sheet.)    
	    //this.load.spritesheet("player", "assets/sprites/playerIdle.png",60,84);
	    this.load.spritesheet("player", "assets/sprites/playerRunJump.png",52,86);

	    //this.load.spritesheet("player", "assets/sprites/player_spritesheet.png",28, 30, 5, 1,1);

	    //load json file.
	    this.load.text("level", "assets/prefabrications/level.json");

		},
		create:function(){
			this.state.start("TitleScreen");
		}
	};
