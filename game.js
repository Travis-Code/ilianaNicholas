var Parkour = Parkour || {};

Parkour.GameState = {

    init: function() {
        //constants
        this.RUNNING_SPEED = 380;
        this.JUMPING_SPEED = 500;
        this.BOUNCING_SPEED = 150;
        this.catColorOne = [0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7c786a, 0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
        this.tintCatColor = this.catColorOne[this.game.rnd.between(0, this.catColorOne.length - 1)];
        this.catColorTwo = [0x4CC3D9, 0x93648D, 0x7c786a, 0x588c73, 0x8c4646, 0x2a5b84, 0x73503c];
        this.tintCatColorTwo = this.catColorTwo[this.game.rnd.between(0, this.catColorTwo.length - 1)];


        //gravity
        this.game.physics.arcade.gravity.y = 1000;

        this.game.stage.backgroundColor = "#4488AA";

        //set the size of the world
        this.game.world.setBounds(0, 0, 7600, 600);

        //cursor keys to move the player
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    create: function() {
        this.playerAlive = true;
        this.playerHasHat = false;
        this.game.bgMusic = this.game.add.audio("coolHipHop");
        this.game.bgMusic.loopFull(1);
        this.squeek = this.game.add.audio("squeekSound");
        this.ouch = this.game.add.audio("ouch");
        this.meow = this.game.add.audio("meow");
        this.cheer = this.game.add.audio("cheer");
        this.boing = this.game.add.audio("boing");


        //load current level method.
        this.loadLevel();

        //this.createOnscreenControls();
        this.createOnscreenControls();



    },

    update: function() {

        this.player.body.velocity.x = 0;

        paralax2.x = this.game.camera.x * 0.3;
        paralax2.y = this.game.camera.y * 0.1 + 240;
        paralax1.x = this.game.camera.x * 0.2;
        paralax1.y = this.game.camera.y * 0.2 - 300; //move it down a few pixels to account for the missing pixels when moving with camera

        //set up collisions for ground and platforms.
        this.game.physics.arcade.collide(this.player, this.grounds);
        this.game.physics.arcade.collide(this.player, this.boxy);
        this.game.physics.arcade.collide(this.boxy, this.grounds);
        this.game.physics.arcade.collide(this.boxy, this.boxy);
        this.game.physics.arcade.collide(this.friendlyCats, this.grounds);
        this.game.physics.arcade.collide(this.monsters, this.grounds);

        //this.game.physics.arcade.collide(this.waters, this.boxy);
        this.game.physics.arcade.collide(this.player, this.pipeWarp);
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.player, this.metalPlatforms);
        this.game.physics.arcade.collide(this.soccerBalls, this.metalPlatforms);
        this.game.physics.arcade.collide(this.player, this.box);
        this.game.physics.arcade.collide(this.player, this.wood);
        //this.game.physics.arcade.collide(this.player, this.fires);
        this.game.physics.arcade.collide(this.box, this.grounds);
        this.game.physics.arcade.overlap(this.player, this.hat);
        this.game.physics.arcade.collide(this.soccerBalls, this.grounds);
        this.game.physics.arcade.overlap(this.player, this.soccerBalls);


        //{"x": 2804, "y": 400}
        this.soccerBalls.forEach(function(element) {
            if (element.x <= 2500) {
                element.kill();
            }
        }, this);

        this.game.physics.arcade.overlap(this.player, this.godzilla);
        this.game.physics.arcade.overlap(this.pipeWarp, this.godzilla);
        //this.game.physics.arcade.collide(this.fires, this.grounds);

        /*if (this.playerAlive) {
            this.game.physics.arcade.overlap(this.player, this.fires, null, function(p, f) {
                //this.playerAlive = false;
                this.game.bgMusic.stop();
                console.log('burned by fire!');
                //Parkour.game.state.start('Game');
            }, this);
        }*/

        //overlap(object1, object2, overlapCallback, processCallback, callbackContext) → {boolean}

        if (this.playerAlive) {
            this.game.physics.arcade.overlap(this.player, this.waters, function(player, waters) {
                this.playerAlive = false;
                this.game.bgMusic.stop();
                console.log('auch!');
                Parkour.game.state.start('Game');
            }, null, this);
        }

        if (this.playerAlive) {
            this.game.physics.arcade.overlap(this.player, this.hat, null, function(p, h) {
                //this.game.bgMusic.stop();
                console.log('got the hat!');
                this.cheer.play();

                this.hat.destroy();
                //this.loadGodzilla();
            }, this);
        }

        if (this.playerAlive) {
            this.game.physics.arcade.overlap(this.player, this.godzilla, null, function(p, g) {
                this.game.bgMusic.stop();
                console.log('you got eaten by godzilla!');
                this.godzilla.body.velocity.x = this.levelData.godzillaSpeed + 200;
                //Parkour.game.state.start('Game');
                //this.godzilla.destroy();
                //Parkour.game.state.start('TitleScreen');
            }, this);
        }

        //collision between player and friendlyCats
        this.game.physics.arcade.collide(this.player, this.friendlyCats, this.hitCat, null, this);
        this.game.physics.arcade.collide(this.player, this.jumpingFishes, this.hitFish, null, this);
        this.game.physics.arcade.collide(this.player, this.soccerBalls, this.soccerHit, null, this);
        this.game.physics.arcade.collide(this.player, this.monsters, this.hitMonster, null, this);
        this.game.physics.arcade.collide(this.player, this.trampolineGroup, this.hitTramp, null, this);
       // this.game.physics.arcade.collide(this.player, this.trampoline2, this.hitTramp, null, this);
        //this.game.physics.arcade.collide(this.player, this.trampoline3, this.hitTramp, null, this);


        //player climbing ladder
        this.game.physics.arcade.overlap(this.player, this.ladders, null, function(p, l) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
        }, this);

       

        if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            this.player.play("player");
        } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            this.player.play("player");
        } else {
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
    },

    /* loadGodzilla :function(){
     //create godzilla.
         this.godzilla = this.add.sprite(1000, this.game.height / 2 - 120, 'godzilla');
         var yummy = this.godzilla.animations.add("yummy", [0,1], 4, true);
         this.godzilla.play("yummy");
         this.game.physics.arcade.enable(this.godzilla);
         this.godzilla.body.velocity.x = this.levelData.godzillaSpeed;
         this.godzilla.immovable = true;
         //this.godzilla.body.moves = false;
         this.godzilla.body.allowGravity = false;
         console.log("GODZILLA IS COMING!");
         if(this.godzilla.body.y > this.game.height){
             this.godzilla.destroy();
             console.log("godzilla is dead");
         } 

          this.game.physics.arcade.overlap(this.godzilla, this.pipeWarp, null, function(g, p) {
             this.pipeWarp.body.immovable = false;
             this.pipeWarp.destroy();
         },this);
     },*/

 
     hitTramp:function(player, trampoline){
         if (trampoline.body.touching.up) {

            trampoline.animations.add("trampolineSpring", [0,1,2,3], 4, true);
            trampoline.play("trampolineSpring");
            
            this.boing.play();
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function(){
                trampoline.animations.stop();
                trampoline.frame=0;
            }, this);
            this.player.body.velocity.y = -this.JUMPING_SPEED*2;
            var jumpTramp = this.game.add.tween(this.player).to({
                    //x: this.player.x + this.game.rnd.between(100, 200),
                    //y: this.player.y + this.game.rnd.between(-500, 800),
                    rotation: 6.3
                }, 1000, Phaser.Easing.Linear.None, true);
        }

     },

    hitMonster: function(player, monster) {
        if (monster.body.touching.up) {
            monster.kill();
            this.squeek.play();
            this.player.body.velocity.y = -this.JUMPING_SPEED;
        } else {
            //monster.body.velocity.y = -this.BOUNCING_SPEED;
            //monster.body.velocity.x = +this.BOUNCING_SPEED;
            monster.game.bgMusic.stop();
            Parkour.game.state.start('Game');
        }
    },

    hitFish: function(player, fish) {
        if (fish.body.touching.up) {
            fish.kill();
            this.squeek.play();
            this.player.body.velocity.y = -this.JUMPING_SPEED;
        } else {
            fish.body.velocity.y = -this.BOUNCING_SPEED;
            fish.body.velocity.x = +this.BOUNCING_SPEED;
            this.ouch.play();
            this.game.bgMusic.stop();
            Parkour.game.state.start('Game');
        }
    },

    hitCat: function(player, cat) {
        if (cat.body.touching.up) {
            //cat.kill();
            this.squeek.play();
            player.body.velocity.y = -this.BOUNCING_SPEED;

        } else {
            cat.body.velocity.y = -this.BOUNCING_SPEED;
            cat.body.velocity.x = +this.BOUNCING_SPEED;
            this.meow.play();
        }
    },

    soccerHit: function(player, soccer) {
        if (soccer.body.touching.up) {
            //cat.kill();

        } else {
            soccer.body.velocity.y = -this.BOUNCING_SPEED;
            soccer.body.velocity.x = +this.BOUNCING_SPEED;

        }
    },
    loadLevel: function() {

        //parse json file
        this.levelData = JSON.parse(this.game.cache.getText("level"));

        paralax1 = this.game.add.tileSprite(0, 800, 6300, 816, 'clouds');
        paralax2 = this.game.add.tileSprite(0, 400, 6300, 816, 'backgroundCity');

        //create group for ground and enable physics body on all elements.
        this.grounds = this.add.group();
        this.grounds.enableBody = true;

        //loop that cycles thru each element and adds each ground to a x,y location.
        this.levelData.floorData.forEach(function(element) {
            this.grounds.create(element.x, this.game.height / 2 + element.y, "ground");
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

        //create group for ground and enable physics body on all elements.
        this.ladders = this.add.group();
        this.ladders.enableBody = true;

        //loop that cycles thru each element and adds each ground to a x,y location.
        this.levelData.ladderData.forEach(function(element) {
            this.ladders.create(element.x, element.y, "ladder");
        }, this);

        //set grounds properties immovable and no gravity.
        this.ladders.setAll("body.immovable", true);
        this.ladders.setAll("body.allowGravity", false);

        this.metalPlatforms = this.add.group();
        this.metalPlatforms.enableBody = true;

        this.levelData.metalPlatformData.forEach(function(element) {
            this.metalPlatforms.create(element.x, element.y, "metalPlatform");
        }, this);

        this.metalPlatforms.setAll("body.immovable", true);
        this.metalPlatforms.setAll("body.allowGravity", false);

        //make box group and enable physics.
        this.boxy = this.add.group();
        this.boxy.enableBody = true;

        //loop that cycles thru each element and adds a box to a x,y location.
        this.levelData.boxData.forEach(function(element) {
            this.boxy.create(element.x, this.game.height / 2 + element.y, "boxTwo");
        }, this);

        this.boxy.setAll("body.immovable", false);
        this.boxy.setAll("body.allowGravity", true);

        //make wood group and enable physics on it.
        this.wood = this.add.group();
        this.wood.enableBody = true;

        //loop that cycles thru each element and adds each wood to a x,y location.
        this.levelData.woodData.forEach(function(element) {
            this.wood.create(element.x, this.game.height / 2 + element.y, "wood");
        }, this);

        //set wood properties and no gravity.
        this.wood.setAll("body.immovable", true);
        this.wood.setAll("body.allowGravity", false);

        //add danger sign to the game.
        this.danger = this.add.sprite(1600, this.game.height / 2 - 120, "danger");

        //create starting box.
        this.box = this.add.sprite(10, this.game.height / 2 + 200, "box");
        this.game.physics.arcade.enable(this.box);
        this.box.body.allowGravity = false;
        this.box.immovable = true;
        this.box.body.moves = false;


         //add fish1a
        this.jumpingFishes = this.add.group();
        var sampleFisha = new Parkour.Fish(this.game, 3020, 400, "pufferFish", undefined);
        this.jumpingFishes.add(sampleFisha);
        this.jumpingFishes.scale.setTo(0.7);
        //add fish1
        var sampleFish = new Parkour.Fish(this.game, 3050, 400, "pufferFish", undefined);
        this.jumpingFishes.add(sampleFish);
        this.jumpingFishes.scale.setTo(0.5);
        //add fish2
        var sampleFish2 = new Parkour.Fish(this.game, 3455, 400, "pufferFish", undefined);
        this.jumpingFishes.add(sampleFish2);
        this.jumpingFishes.scale.setTo(0.5);   
        //add fish3
        var sampleFish2 = new Parkour.Fish(this.game, 3855, 400, "pufferFish", undefined);
        this.jumpingFishes.add(sampleFish2);
        this.jumpingFishes.scale.setTo(0.5);   
        //add fish4
        var sampleFish2 = new Parkour.Fish(this.game, 4000, 400, "pufferFish", undefined);
        this.jumpingFishes.add(sampleFish2);
        this.jumpingFishes.scale.setTo(0.5);   
        //add fish4
        var sampleFish2 = new Parkour.Fish(this.game, 7000, 400, "pufferFish", undefined);
        this.jumpingFishes.add(sampleFish2);
        this.jumpingFishes.scale.setTo(0.5);   

        this.trampolineGroup = this.add.group();
        this.trampolineGroup.enableBody = true;

        this.levelData.trampolineData.forEach(function(element) {
            this.trampolineGroup.create(element.x, element.y, "trampoline");
        }, this);

        this.trampolineGroup.setAll("body.immovable", true);
        this.trampolineGroup.setAll("body.allowGravity", true);
        this.trampolineGroup.setAll("body.moves", false);


        //add monsters.
        this.monsters = this.add.group();
        var monster = new Parkour.Monsters(this.game, 700, this.game.height / 2, "smallMonster", undefined, 800, 90);
        monster.animations.add("monsterWalk", [0, 1,2,3,4,5,6], 10, true);
        monster.play("monsterWalk");
        //sampleCat.tint =  this.tintCatColor;
        this.monsters.add(monster);
        //this.monsters.scale.setTo(0.3);
        var monster = new Parkour.Monsters(this.game, 900, this.game.height / 2, "smallMonster", undefined, 1000, 600);
        monster.animations.add("monsterWalk", [0, 1,2,3,4,5,6], 10, true);
        monster.play("monsterWalk");
        //sampleCat.tint =  this.tintCatColor;
        this.monsters.add(monster);
        //this.monsters.scale.setTo(0.3);
        var monster = new Parkour.Monsters(this.game, 6500, this.game.height / 2, "monster", undefined, 7000, 6000);
        monster.animations.add("monsterWalk", [0, 1,2,3,4,5,6], 10, true);
        monster.play("monsterWalk");
        //sampleCat.tint =  this.tintCatColor;
        this.monsters.add(monster);
        //this.monsters.scale.setTo(0.3);
       
        //add friendly cats.
        this.friendlyCats = this.add.group();
        var sampleCat = new Parkour.Cats(this.game, 6500, this.game.height / 2 + 150, "cat", undefined);
        sampleCat.animations.add("catWalk", [0, 1], 4, true);
        sampleCat.play("catWalk");
        //sampleCat.tint =  this.tintCatColor;
        this.friendlyCats.add(sampleCat);
        //add sampleCat2
        var sampleCat2 = new Parkour.Cats(this.game, 6400, this.game.height / 2 + 150, "cat", undefined);
        sampleCat2.animations.add("catWalk", [0, 1], 4, true);
        sampleCat2.play("catWalk");
        //sampleCat2.tint =  this.tintCatColorTwo;
        this.friendlyCats.add(sampleCat2);

        //create hat with throbbing tween
        this.hat = this.add.sprite(2200, this.game.height / 2 - 50, "marioHat");
        this.hat.anchor.set(0.5);
        this.game.physics.arcade.enable(this.hat);
        this.hat.body.allowGravity = false;
        this.hat.body.immovable = true;

        //tween(target).to(properties, ease, autoStart, delay, repeat)
        var hatTween = this.game.add.tween(this.hat).to({
            width: 130,
            height: 80
        }, 1500, "Linear", true, 0, -1);
        //yoyo method gives yoyo effect plays forward then reverses if set to true.
        //if yoyo method is set to false it will repeat without reversing.
        hatTween.yoyo(true);

        this.pipeWarp = this.add.sprite(2200, this.game.height / 2 + 100, "pipeWarp");
        this.game.physics.arcade.enable(this.pipeWarp);
        this.pipeWarp.body.allowGravity = false;
        this.pipeWarp.body.immovable = true;
        this.pipeWarp.body.moves = false;

        this.pipeWarp2 = this.add.sprite(6244, this.game.height - 400, "pipeWarp");
        this.game.physics.arcade.enable(this.pipeWarp2);
        this.pipeWarp2.anchor.setTo(0.5);
        this.pipeWarp2.angle = 230;
        this.pipeWarp2.body.allowGravity = false;
        this.pipeWarp2.body.immovable = true;
        this.pipeWarp2.body.moves = false;

        //6004
        // 0 is the first frame in the array, then 1,2,1, 6 refers to the fps, true means forever
        //this.player.animations.add('playerWalking', [0, 1, 2, 1], 6, true);

        //create player.
        this.player = this.add.sprite(4000, 300, 'player', 5);
        this.player.anchor.setTo(0.5);
        this.player.animations.add("player", [0, 1, 2, 3, 4, 5], 7, true);
        this.player.animations.add("playerJump", [6, 7], 7, true);
        this.game.physics.arcade.enable(this.player);
        //create a custom object for the player controls.
        this.player.customParams = {};
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(1, 0);
        //follow player with the camera.
        this.game.camera.follow(this.player);

        this.soccerBalls = this.add.group();
        this.soccerBalls.enableBody = true;

        this.createSoccerBall();
        this.soccerBallCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.soccerBallFrequency, this.createSoccerBall, this);

        //make waters group and enable physics on it.
        this.waters = this.add.group();
        this.waters.enableBody = true;
        this.waters.tint = '#000000';

        //loop that cycles thru each element and adds each cloud to a x,y location.
        this.levelData.waterData.forEach(function(element) {
            this.waters.create(element.x, this.game.height / 2 + element.y, "water");
        }, this);

        //set water properties and no gravity.
        this.waters.setAll("body.immovable", true);
        this.waters.setAll("body.allowGravity", false);
    },

    createSoccerBall: function() {
        //get the first dead sprite.
        var soccerBall = this.soccerBalls.getFirstExists(true);

        if (!soccerBall) {
            soccerBall = this.soccerBalls.create(0, 0, "fire", 0);
        }

        soccerBall.animations.add("fire", [0, 1, 2, 3], 12, true);
        soccerBall.scale.x = -1;
        soccerBall.play("fire");
        soccerBall.body.collideWorldBounds = true;
        soccerBall.body.bounce.set(1, 0);

        //{"x": 5804, "y": 200}
        //soccerBall.reset(this.levelData.soccerBallspawn.x, this.levelData.soccerBallspawn.y);
        soccerBall.reset(6154, this.game.height / 2 - 80);
        soccerBall.body.velocity.x = -this.levelData.soccerBallspeed;
    },
    //6004
    //150

    createOnscreenControls: function() {
        this.leftArrow = this.add.button(80, this.game.height - 80, 'arrowButton');
        this.leftArrow.scale.x = -1;
        this.rightArrow = this.add.button(100, this.game.height - 80, 'arrowButton');
        //this.rightArrow.scale.x = -1;
        this.actionButton = this.add.button(this.game.width - 100, this.game.height - 75, 'actionButton');

        this.leftArrow.alpha = 0.7;
        this.rightArrow.alpha = 0.7;
        this.actionButton.alpha = 1;

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        //jump
        this.actionButton.events.onInputDown.add(function() {
            this.player.customParams.mustJump = true;
        }, this);

        this.actionButton.events.onInputUp.add(function() {
            this.player.customParams.mustJump = false;
        }, this);

        this.actionButton.events.onInputOver.add(function() {
            this.player.customParams.mustJump = true;
        }, this);

        this.actionButton.events.onInputOut.add(function() {
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