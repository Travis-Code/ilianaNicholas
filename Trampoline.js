var Parkour = Parkour || {};

Parkour.Trampoline = function(game, x, y, key){
    Phaser.Sprite.call(this, game, x, y, key);
    
    this.game = game;
    this.anchor.setTo(0.5);


    //enable physics
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = true;
    this.immovable = true;
    this.body.moves = false;
};

Parkour.Trampoline.prototype = Object.create(Phaser.Sprite.prototype);
Parkour.Trampoline.prototype.constructor = Parkour.Trampoline;




