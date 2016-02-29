var Parkour = Parkour || {};

Parkour.titleScreenState = {

init: function() {

        this.game.stage.backgroundColor = "#4488AA";


    
    },
    create: function() {
        this.playerAlive = true;
		var titlePic = this.game.add.image(this.game.width/2, this.game.height/2, "superPKTitle");
		titlePic.anchor.set(0.5);
		/*var titlePicTween = this.game.add.tween(titlePic).to({
			width:460,
			height:191
		}, 500, "Linear", true, 0, -1);
		//yoyo method gives yoyo effect plays forward then reverses if set to true.
		//if yoyo method is set to false it will repeat without reversing.
	titlePicTween.yoyo(true);*/

        //this.game.bgMusic = this.game.add.audio("coolHipHop");
        //this.game.bgMusic.stop();
		var playButton = this.game.add.button(this.game.width/2, this.game.height-150,"playButton", this.startGame, this);
		playButton.anchor.set(0.5);
		playButton.tint = 0xFCBE12;
		//tween(target).to(properties, ease, autoStart, delay, repeat)
		var playButtonTween = this.game.add.tween(playButton).to({
			width:220,
			height:91
		}, 1500, "Linear", true, 0, -1);
		//yoyo method gives yoyo effect plays forward then reverses if set to true.
		//if yoyo method is set to false it will repeat without reversing.
		playButtonTween.yoyo(true);
    },

    startGame: function(){
		var jump = this.game.add.audio("jumpPark");
		jump.play();
		this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function(){
			console.log("it werks");
			this.state.start("Game");
			//this.fade("PlayGame");
		}, this);
	},
};
