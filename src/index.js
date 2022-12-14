import Phaser from './lib/phaser.js'
import Title from './scenes/titleScene.js'
import Levels from './scenes/levelMenuScene.js'
import Battle from './scenes/battleScene.js'
import Inventory from './scenes/inventoryScene.js'
import Cinematic from './scenes/cinematicScene.js'
import GameOver from './scenes/gameOverScene.js'
import Credits from './scenes/creditsScene.js'

// Archivo de configuración del juego
let config = {
    type: Phaser.CANVAS,

    // Coge el canvas creado en el HTML con id = "juego"
    canvas: document.getElementById("juego"),

    // Resolución del juego
    width: 1024,
    height: 768,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,

		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 256,
            height: 192
        },
		max: {
            width: 1024,
            height: 768
        },
		zoom: 1
    },
    
    // Orden de las escenas
    scene: [Title, Battle, Levels, Inventory, Cinematic, GameOver, Credits]
};

// Carga de la fuente de texto
var newFont = new FontFace('Silkscreen', 'url(assets/Silkscreen-Regular.ttf)');
newFont.load().then(function (loaded) {
document.fonts.add(loaded); })

// Crea nuevo juego Phaser con la configuración dada
new Phaser.Game(config);