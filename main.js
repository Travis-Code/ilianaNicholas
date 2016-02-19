
var Parkour = Parkour || {};

Parkour.dimensions = Parkour.getGameLandscapeDimensions(700,350);

//create a new Phaser.Game object and assign it to our custom Parkour.game property.
// then add our states to the game property.
Parkour.game = new Phaser.Game(Parkour.dimensions.w, Parkour.dimensions.h, Phaser.AUTO);
Parkour.game.state.add("Boot", Parkour.BootState);
Parkour.game.state.add("Preload", Parkour.PreloadState);
Parkour.game.state.add("Game", Parkour.GameState);

//start our boot state
Parkour.game.state.start("Boot");

console.log("hello");

