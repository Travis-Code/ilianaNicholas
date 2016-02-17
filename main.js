//create an empty object 
var Parkour = Parkour || {};

Parkour.game = new Phaser.Game(480, 360, Phaser.AUTO);

Parkour.game.state.add("Boot", Parkour.BootState);
Parkour.game.state.add("Preload", Parkour.PreloadState);
Parkour.game.state.add("Game", Parkour.game);

Parkour.game.state.start("boot");
