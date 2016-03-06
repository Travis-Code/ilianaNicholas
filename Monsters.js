var Parkour = Parkour || {};

Parkour.Monsters = function(game, x, y, key, velocity, monsterX, monsterX2){
    Phaser.Sprite.call(this, game, x, y, key);
    
    this.game = game;
    this.anchor.setTo(0.5);

    this.monsterX = monsterX;
    this.monsterX2 = monsterX2;

    //give a random speed if none given.
    if(velocity === undefined){
        velocity = (40+Math.random()*20) * (Math.random()<0.5 ? 1:-1);
    }
    //enable physics

    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.set(1,0);
    this.body.allowGravity = true;
    this.body.velocity.x = velocity;
};

Parkour.Monsters.prototype = Object.create(Phaser.Sprite.prototype);
Parkour.Monsters.prototype.constructor = Parkour.Monster;
Parkour.Monsters.prototype.update = function(){

    var direction;
    if(this.body.velocity.x > 0){
        this.scale.setTo(-1,1);
        direction = 1;
  }
    else {
        this.scale.setTo(1, 1);
        direction = -1;
  }
                   // 800
    if(this.body.x >= this.monsterX){
        this.scale.setTo(1,1);
        direction -1;
        this.body.velocity.x *= -1;
    }
                    //90
    else if(this.body.x <= this.monsterX2){
        direction = 1;
        this.scale.setTo(-1,1);
        this.body.velocity.x = this.body.velocity.x += 2;
    }
};