// Importaciones
// Importación de Librería Phaser
import Phaser from './lib/phaser.js'

/**
 * Escena de Batalla.
 * @extends Phaser.Scene
 */
export default class BattleScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'battleScene' });
	}

	/**
	 * Inicializa variables
	 * - Cargar nivel seleccionado
	*/
	init() {

	}

	/**
	 * Cargamos todos los assets que vamos a necesitar:
	 * 		- Fondo
	 * 		- Hud
	 * 		- Personajes
	 */
	preload() {

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintar el fondo
		// var back = this.add.image(0, 0, 'background').setOrigin(0, 0

		// Pintar personajes
		// ...

		// Pintar HUD y hacer botones interactivos
		// ...
		//Para seleccionar botones con teclas, creamos el objeto tecla
		var keys = this.scene.input.keyboard.addKeys('LEFT, UP, RIGHT,DOWN,W,A,S,D');
		var Esc = this.scene.input.keyboard.addKey('ESC,X');
		var Enter = this.scene.input.keyboard.addKey('ENTER,Z')
		//Ejemplo: Al pulsar la flecha izquierda
		keys.LEFT.on('down', function () {/*Destaca el boton de la izquierda al actual y desdestaca el actual*/ });
		//Ejemplo: Al pulsar el enter
		Enter.on('down', function () {/*Marca el botón*/ });
		Enter.on('up', function () {
			 //Se selecciona la accion deseada (if/else para saber qué boton hace qué cosas)
		});
		Esc.on('down', function () {
			this.scene.start('optionsScene');//Se abre el menu de opciones
		});
	}

	update() {

	}

	/**
	 * @param {Phaser.GameObjects.Sprite} sprite 
	 */
	createButtonFromSprite(sprite, pointerdown, pointerup, pointerover, pointerout){
		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	pointerdown(); // Marcar botón
	    });

	    sprite.on('pointerup', pointer => {
			pointerup(); //Cambiamos a la escena de la cinemática
	    });

		sprite.on('pointerover', () => {
			pointerover(); // Destacar botón
	    });

	    sprite.on('pointerout', () => {
			pointerout(); // Desdestacar botón
	    });
	}

}
