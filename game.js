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
        this.game.world.setBounds(0, 0, 2000, 350);

        //cursor keys to move the player
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    create: function() {

        //load current level method.
        this.loadLevel();
        //this.createOnscreenControls();
        this.createOnscreenControls();

        //test monster class.
        /*var monster1 = new Parkour.Monster();
        var monster2 = new Parkour.Monster();
        console.log(monster1.energy);
        console.log(monster2.energy);*/

    },

    update: function() {



        //set up collisions for ground and platforms.
        this.game.physics.arcade.collide(this.player, this.grounds);
        this.game.physics.arcade.collide(this.player, this.platforms);
   
        this.game.physics.arcade.overlap(this.player, this.waters, this.drownPlayer);

        

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            //this.player.playering("walking");
        } else {
            //this.player.animations.stop();
            //this.player.frame = 3;
        }


        if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            //this.player.playering("walking");
        } else {
            //this.player.animations.stop();
            //this.player.frame = 3;
        }

        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
        }


    },

    drownPlayer: function(player, water) {
        console.log('auch!');
    Parkour.game.state.start('Game');
      },
   
    loadLevel: function() {

        //parse json file
        this.levelData = JSON.parse(this.game.cache.getText("level"));

        /*	//make a platforms group and enable physics on all bodies.
        	this.platforms = this.add.group();
        	this.platforms.enableBody = true;

        	//loop that cycles thru each element and adds each platform to a x,y location.
        	this.levelData.platformData.forEach(function(element){
        		this.platforms.create(element.x, element.y, "platform");
        	},this);

        	//set platforms properties immovable and no gravity.
        	this.platforms.setAll("body.immovable", true);
        	this.platforms.setAll("body.allowGravity", false); */





        //create group for ground and enable physics body on all elements.
        this.grounds = this.add.group();
        this.grounds.enableBody = true;

        //loop that cycles thru each element and adds each ground to a x,y location.
        this.levelData.floorData.forEach(function(element) {
            this.grounds.create(element.x, element.y, "ground");
        }, this);

        //set grounds properties immovable and no gravity.
        this.grounds.setAll("body.immovable", true);
        this.grounds.setAll("body.allowGravity", false);


        //make a clouds group and enable physics on all bodies.
        this.clouds = this.add.group();
        this.clouds.enableBody = true;

        //loop that cycles thru each element and adds each cloud to a x,y location.
        this.levelData.cloudData.forEach(function(element) {
            this.clouds.create(element.x, element.y, "cloud");
        }, this);

        //set clouds properties immovable and no gravity.
        this.clouds.setAll("body.immovable", true);
        this.clouds.setAll("body.allowGravity", false);

        //make waters group and enable physics on it.
        this.waters = this.add.group();
        this.waters.enableBody = true;

        //loop that cycles thru each element and adds each cloud to a x,y location.
        this.levelData.waterData.forEach(function(element){
            this.waters.create(element.x, element.y, "water");
        }, this);

        //set water properties and no gravity.
        this.waters.setAll("body.immovable", true);
        this.waters.setAll("body.allowGravity", false);

        //create starting box.
        this.box = this.add.sprite(10, 200, "box");
        this.game.physics.arcade.enable(this.box);
        this.box.body.allowGravity = false;
        this.box.enableBody = true;

        //create player.
        this.player = this.add.sprite(10, 0, 'player');
        this.player.anchor.setTo(0.5);
        //this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
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