// Importaciones
//import { Character } from '../character.js';
import { Button } from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
//import Button from '../button.js';

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
		// Fondo
		this.load.image('battleBackground', 'assets/Escenas/EscenaCombate/EscenaCombate.png');
		// Maria Pita (Animaciones)
		this.load.spritesheet('MariaPita_idle', 'assets/MariaPita/MariaPita_Idle.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('MariaPita_idleBack', 'assets/MariaPita/MariaPita_IdleBack.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('MariaPita_jump', 'assets/MariaPita/MariaPita_Jump.png', {frameWidth: 32, frameHeight: 32});
		// Descripcion
		this.load.image('description', 'assets/Escenas/EscenaCombate/Descripcion.png');
		// Acciones
		this.load.image('cuadroAcciones', 'assets/Escenas/EscenaCombate/CuadroAcciones.png');
		this.load.image('textoAcciones', 'assets/Escenas/EscenaCombate/Capas/textoAcciones.png');
		this.load.image('botones', 'assets/Escenas/EscenaCombate/Capas/Botones.png');

		this.load.image('pruebaBoton', 'assets/Escenas/EscenaCombate/Capas/Boton.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Fondo
		var background = this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		var player = new Player(this, 250, 475);

		// Descripcion
		var description = this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Acciones
		var cuadroAcciones = this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		var botones = this.add.image(0, 0, 'botones').setOrigin(0, 0);
		var textoAcciones = this.add.image(0, 0, 'textoAcciones').setOrigin(0, 0);
		
		// Interactivo
		//new Button(this, 500, 50, 'pruebaBoton', 0, 0, 0, 'pointerup');

		//var button = this.add.image(50, 50, 'pruebaBoton').setOrigin(0, 0).setInteractive();
		/*button.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });*/

		// Transicion escena
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('optionsScene');
        });
	}

	update() {

	}
}
