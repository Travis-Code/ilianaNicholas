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

        //paralax2.x= this.game.camera.x*0.1; 
        //paralax2.y= this.game.camera.y*0.1+340;
        paralax1.x= this.game.camera.x*0.2;
        paralax1.y= this.game.camera.y*0.2-300; //move it down a few pixels to account for the missing pixels when moving with camera

        //set up collisions for ground and platforms.
        this.game.physics.arcade.collide(this.player, this.grounds);
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.player, this.box);
        this.game.physics.arcade.collide(this.player, this.wood);
        this.game.physics.arcade.collide(this.box, this.grounds);

        this.game.physics.arcade.overlap(this.player, this.waters, this.drownPlayer);
        this.game.physics.arcade.overlap(this.player, this.ladder, this.climbLadder);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            this.player.play("playerWalking");
        } else {
            this.player.animations.stop();
            this.player.frame = 3;
        }

        if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            this.player.play("playerWalking");
        } else {
            this.player.animations.stop();
            this.player.frame = 3;
        }

        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
        }

        this.game.physics.arcade.overlap(this.player, this.ladder, null, function(p,l)
        {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
        }, this);
    },

    drownPlayer: function(player, water) {
        console.log('auch!');
        //Parkour.game.state.start('Game');
    },
   
    loadLevel: function() {

        //parse json file
        this.levelData = JSON.parse(this.game.cache.getText("level"));

         paralax1 = this.game.add.tileSprite(0, 800, 3300,  816, 'clouds');   
        //paralax2 = this.game.add.tileSprite(0, 400, 3300, 816, 'clouds');

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
        this.game.physics.arcade.enable(this.box);
        this.box.immovable = true;
        this.box.body.moves = false;

        //create player.
        this.player = this.add.sprite(40, this.game.height/2-40, 'playerWalking', 3);
        this.player.anchor.setTo(0.5);

        // 0 is the first frame in the array, then 1,2,1, 6 refers to the fps, true means forever
        //this.player.animations.add('playerWalking', [0, 1, 2, 1], 6, true);
        this.player.animations.add("playerWalking", [0,1,2,1], 7, true);
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