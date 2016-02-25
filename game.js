var Parkour = Parkour || {};

Parkour.GameState = {

    init: function() {
        //constants
        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 500;

        //gravity
        this.game.physics.arcade.gravity.y = 1000;

        this.game.stage.backgroundColor = "#4488AA";

        //set the size of the world
        this.game.world.setBounds(0, 0, 2600, 600);

        //cursor keys to move the player
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    create: function() {
        this.playerAlive = true;
        //this.game.bgMusic = this.game.add.audio("coolHipHop");
        //this.game.bgMusic.loopFull(1);

        //load current level method.
        this.loadLevel();
        //this.createOnscreenControls();
        this.createOnscreenControls();

        //test Monster class method.
        //test monster class.
        /*var monster1 = new Parkour.Monster();
        var monster2 = new Parkour.Monster();
        console.log(monster1.energy);
        console.log(monster2.energy);*/
    },

    update: function() {

        paralax2.x= this.game.camera.x*0.15; 
        paralax2.y= this.game.camera.y*0.1+340;
        paralax1.x= this.game.camera.x*0.2;
        paralax1.y= this.game.camera.y*0.2-300; //move it down a few pixels to account for the missing pixels when moving with camera

        //set up collisions for ground and platforms.
        this.game.physics.arcade.collide(this.player, this.grounds);
        this.game.physics.arcade.collide(this.player, this.pipeWarp);
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.player, this.box);
        this.game.physics.arcade.collide(this.player, this.wood);
        this.game.physics.arcade.collide(this.box, this.grounds);
        this.game.physics.arcade.overlap(this.player, this.hat);

        
        if(this.playerAlive){
            this.game.physics.arcade.overlap(this.player, this.waters, null, function(p,w){
                //this.game.bgMusic.stop();
                console.log('auch!');
                Parkour.game.state.start('Game');
            },this);
        }      
       
        if(this.playerAlive){
            this.game.physics.arcade.overlap(this.player, this.hat, null, function(p,h){
                //this.game.bgMusic.stop();
                console.log('got the hat!');
                Parkour.game.state.start('TitleScreen');
            },this);
        }      

       // this.game.physics.arcade.overlap(this.player, this.ladder, this.climbLadder);
        
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            this.player.play("player");
        } 

        else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            this.player.play("player");
        } 

        else {
            this.player.animations.stop();
            this.player.frame = 5;
        }

        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
            var jumper = this.game.add.audio("jumpPark");
            var jump = this.game.add.tween(this.player).to({
                            //x: this.player.x + this.game.rnd.between(100, 200),
                            //y: this.player.y + this.game.rnd.between(-500, 800),
                            rotation: 6.3
                        }, 1000, Phaser.Easing.Linear.None, true);
                jumper.play();
        }

        this.game.physics.arcade.overlap(this.player, this.ladder, null, function(p,l)
        {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
        }, this);
    }, 

   
    loadLevel: function() {

        //parse json file
        this.levelData = JSON.parse(this.game.cache.getText("level"));

        paralax1 = this.game.add.tileSprite(0, 800, 3300,  816, 'clouds');   
        paralax2 = this.game.add.tileSprite(0, 400, 3300, 816, 'backgroundCity');


        //create group for ground and enable physics body on all elements.
        this.grounds = this.add.group();
        this.grounds.enableBody = true;

        //loop that cycles thru each element and adds each ground to a x,y location.
        this.levelData.floorData.forEach(function(element) {
            this.grounds.create(element.x, this.game.height/2 + element.y, "ground");
        }, this);

        //set grounds properties immovable and no gravity.
        this.grounds.setAll("body.immovable", true);
        this.grounds.setAll("body.allowGravity", false);


        //make a clouds group and enable physics on all elements.
        this.clouds = this.add.group();
        this.clouds.enableBody = true;

        //loop that cycles thru each element and adds each cloud to a x,y location.
        this.levelData.cloudData.forEach(function(element) {
            this.clouds.create(element.x, element.y, "cloud");
        }, this);

        //set clouds properties immovable and no gravity.
        this.clouds.setAll("body.immovable", true);
        this.clouds.setAll("body.allowGravity", false);

        //add ladder
        this.ladder = this.add.sprite(1300, this.game.height/2+100,"ladder");
        this.ladder.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.ladder);
        this.ladder.body.allowGravity = false;
        this.ladder.body.immovable = true;

        //make wood group and enable physics on it.
        this.wood = this.add.group();
        this.wood.enableBody = true;

        //loop that cycles thru each element and adds each wood to a x,y location.
        this.levelData.woodData.forEach(function(element){
            this.wood.create(element.x, this.game.height/2 +element.y, "wood");
        },this);

        //set wood properties and no gravity.
        this.wood.setAll("body.immovable", true);
        this.wood.setAll("body.allowGravity", false);

        //make waters group and enable physics on it.
        this.waters = this.add.group();
        this.waters.enableBody = true;
        this.waters.tint = '#000000';


        //loop that cycles thru each element and adds each cloud to a x,y location.
        this.levelData.waterData.forEach(function(element){
            this.waters.create(element.x, this.game.height/2 + element.y, "water");
        }, this);

        //set water properties and no gravity.
        this.waters.setAll("body.immovable", true);
        this.waters.setAll("body.allowGravity", false);

        //add danger sign to the game.
        this.danger = this.add.sprite(1600, this.game.height/2-120, "danger");

        //create starting box.
        this.box = this.add.sprite(10, this.game.height/2 +200, "box");
        this.game.physics.arcade.enable(this.box);
        this.box.body.allowGravity = false;
        this.box.immovable = true;
        this.box.body.moves = false;

        //create player.
        this.player = this.add.sprite(40, this.game.height/2-40, 'player', 5);
        this.player.anchor.setTo(0.5);
        this.player.animations.add("player", [0, 1, 2, 3, 4, 5], 7, true);
        this.player.animations.add("playerJump", [6, 7], 7, true);

        //create hat with throbbing tween
        this.hat = this.add.sprite(2200, this.game.height/2 - 50, "marioHat");
        this.hat.anchor.set(0.5);
        this.game.physics.arcade.enable(this.hat);
        this.hat.body.allowGravity = false;
        this.hat.body.immovable = true;

        //tween(target).to(properties, ease, autoStart, delay, repeat)
        var hatTween = this.game.add.tween(this.hat).to({
            width:100,
            height:60  
        }, 1500, "Linear", true, 0, -1);
        //yoyo method gives yoyo effect plays forward then reverses if set to true.
        //if yoyo method is set to false it will repeat without reversing.
        hatTween.yoyo(true);

        this.pipeWarp = this.add.sprite(2000, this.game.height/2 +100, "pipeWarp");
        this.game.physics.arcade.enable(this.pipeWarp);
        this.pipeWarp.body.allowGravity = false;
        this.pipeWarp.body.immovable = true;
        this.pipeWarp.body.moves = false;


        // 0 is the first frame in the array, then 1,2,1, 6 refers to the fps, true means forever
        //this.player.animations.add('playerWalking', [0, 1, 2, 1], 6, true);


        this.game.physics.arcade.enable(this.player);

        //create a custom object for the player controls.
        this.player.customParams = {};
        this.player.body.collideWorldBounds = true;

        //this.wood = this.add.sprite(10,0,"wood");

        //follow player with the camera.
        this.game.camera.follow(this.player);
    },

createOnscreenControls: function() {
    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowButton');
    this.rightArrow = this.add.button(180, this.game.height - 60, 'arrowButton');
    this.rightArrow.scale.x = -1;
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 1;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputUp.add(function() {
        this.player.customParams.mustJump = false;
    }, this);

    //jump
    this.actionButton.events.onInputDown.add(function() {
        this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function() {
        this.player.customParams.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function() {
        this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function() {
        this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function() {
        this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function() {
        this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function() {
        this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function() {
        this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function() {
        this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function() {
        this.player.customParams.isMovingRight = false;
    }, this);
}
};