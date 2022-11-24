// Importación de Librería Phaser
import Phaser from './lib/phaser.js'

// Importación de Escenas
import Title from './scenes/titleScene.js'
import Levels from './scenes/levelMenuScene.js'
import Battle from './scenes/battleScene.js'
import Options from './scenes/optionsScene.js'
import Inventory from './scenes/inventoryScene.js'
import Cinematic from './scenes/cinematicScene.js'
import GameOver from './scenes/gameOverScene.js'

// Archivo de configuración del juego
let config = {
    type: Phaser.CANVAS,
    // Coge el canvas creado en el HTML con id = "juego"
    canvas: document.getElementById("juego"),

    /* CAMBIAR RESOLUCION A LA QUE QUEREMOS*/
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
    // El orden de las escenas es la  siguiente
    scene: [Title, Battle, Levels, Options, Inventory, Cinematic, GameOver],//[Title, Battle, Levels, Options, Inventory, Cinematic, GameOver],
};

// Crea nuevo juego Phaser con la configuración dada
new Phaser.Game(config);

//Carga la fuente de texto
var newFont = new FontFace('Silkscreen', 'url(assets/Silkscreen-Regular.ttf)');
newFont.load().then(function (loaded) {
document.fonts.add(loaded); })
