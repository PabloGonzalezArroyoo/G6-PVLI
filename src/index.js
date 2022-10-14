import Animation from './escenas/animation.js';
import Title from './escenas/title.js'
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("juego"),
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
    scene: [Title, Animation],
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

new Phaser.Game(config);
