var Parkour = Parkour || {};

Parkour.winScreenState = {

    init: function() {
        this.game.stage.backgroundColor = "#4488AA";
    },
    create: function() {

        var catVelocity = 50;
        var titlePic = this.game.add.image(this.game.width / 2, this.game.height / 2, "winner");
            titlePic.anchor.set(0.5);
        var playButton = this.game.add.button(300, this.game.height - 200, "playButton", this.startGame, this);
            playButton.anchor.set(0.5);
            playButton.tint = 0xFCBE12;
            

        //tween(target).to(properties, ease, autoStart, delay, repeat)
        var playButtonTween = this.game.add.tween(playButton).to({
            width: 220,
            height: 91
        }, 1500, "Linear", true, 0, -1);

        //yoyo method gives yoyo effect plays forward then reverses if set to true.
        //if yoyo method is set to false it will repeat without reversing.
        playButtonTween.yoyo(true);
    },

    startGame: function() {
        var cheer = this.game.add.audio("cheer");
        cheer.play();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function() {
            console.log("it werks");
            this.state.start("TitleScreen");
            //this.fade("PlayGame");
        }, this);
    },
};