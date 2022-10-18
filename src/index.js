// Importación de Librería Phaser
//import Phaser from './lib/phaser.js'

// Importación de Escenas
import TitleScene from './scenes/titleScene.js'
import LevelMenuScene from './scenes/levelMenuScene.js'
import BattleScene from './scenes/battleScene.js'
import OptionsScene from './scenes/optionsScene.js'
import InventoryScene from './scenes/inventoryScene.js'
import CinematicScene from './scenes/cinematicScene.js'

// Archivo de configuración del juego
let config = {
    type: Phaser.CANVAS,
    // Coge el canvas creado en el HTML con id = "juego"
    canvas: document.getElementById("juego"),

    /* CAMBIAR RESOLUCION A LA QUE QUEREMOS*/
    width:  656,
    height: 376,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 328,
            height: 188
        },
		max: {
            width: 1312,
            height: 752
        },
		zoom: 1
    },
    scene: [TitleScene, LevelMenuScene, BattleScene, OptionsScene, InventoryScene, CinematicScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    }
};

// Crea nuevo juego Phaser con la configuración dada
new Phaser.Game(config);
