var Parkour = Parkour || {};

Parkour.titleScreenState = {

    init: function() {
        this.game.stage.backgroundColor = "#4488AA";
    },
    create: function() {
        this.playerAlive = true;
        var playerVelocity = 50;
        var titlePic = this.game.add.image(this.game.width / 2, this.game.height / 2, "superPKTitle");
            titlePic.anchor.set(0.5);
        var playButton = this.game.add.button(this.game.width / 2, this.game.height - 150, "playButton", this.startGame, this);
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

         //create player.
        this.player = this.add.sprite(40, this.game.height / 2 + 89, 'player', 5);
        this.player.anchor.setTo(0.5);
        this.player.animations.add("player", [0, 1, 2, 3, 4, 5], 7, true);
        this.game.physics.arcade.enable(this.player);
        this.player.body.velocity.x = playerVelocity;
        this.player.body.allowGravity = false;


    },

    update: function() {
        if(this.player.body.x >= 500){
            this.player.scale.setTo(-1,1);
            this.player.body.velocity.x += -2;
            this.player.play("player");
        }
        else if(this.player.body.x <= 90){
            this.player.scale.setTo(1,1);
            this.player.body.velocity.x = this.player.body.velocity.x += 2;
            this.player.play("player");
        }
    },

    startGame: function() {
        var cheer = this.game.add.audio("cheer");
        cheer.play();
        this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function() {
            console.log("it werks");
            this.state.start("Game");
            //this.fade("PlayGame");
        }, this);
    },
};