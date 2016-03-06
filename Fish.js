var Parkour = Parkour || {};

Parkour.Fish = function(game, x, y, key, velocity){
    Phaser.Sprite.call(this, game, x, y, key);
    
    this.game = game;
    this.anchor.setTo(0.5);

    //give a random speed if none given.
    if(velocity === undefined){
        velocity = (40+Math.random()*20) * (Math.random()<0.5 ? 1:-1);
    }

    //enable physics
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1,0);
    this.body.velocity.y = velocity;
    this.body.gravity.y = 1000;
};

Parkour.Fish.prototype = Object.create(Phaser.Sprite.prototype);
Parkour.Fish.prototype.constructor = Parkour.Fish;
Parkour.Fish.prototype.update = function(){

    if(this.body.y >= 1050){
        //this.scale.setTo(1,1);
        this.body.velocity.y *= 20;
        console.log("hello");
    }
    else if(this.body.y >=500){
        //this.scale.setTo(-1,1);
        this.body.velocity.y += -3000;
        console.log("hello2");
    }
};