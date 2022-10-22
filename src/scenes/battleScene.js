// Importaciones
//import { Character } from '../character.js';
import { Button } from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import {Enemy1} from '../enemy.js'
import DialogBox from '../dialogBox.js';;
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
		this.dialogBox;
		this.previousLetterTime = 0;
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
		this.load.spritesheet('player_idle', 'assets/MariaPita/MariaPita_Idle.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_idleBack', 'assets/MariaPita/MariaPita_IdleBack.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_jump', 'assets/MariaPita/MariaPita_Jump.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_attack', 'assets/MariaPita/MariaPita_Attack.png', {frameWidth: 50, frameHeight: 32});

		// Enemy (Animaciones)
		this.load.spritesheet('enemy', 'assets/enemy.png', {frameWidth: 97, frameHeight: 97})
		// Descripcion
		this.load.image('description', 'assets/Escenas/EscenaCombate/Descripcion.png');
		// Acciones
		this.load.image('cuadroAcciones', 'assets/Escenas/EscenaCombate/CuadroAcciones.png');
		this.load.image('textoAcciones', 'assets/Escenas/EscenaCombate/Capas/textoAcciones.png');
		this.load.image('boton', 'assets/Escenas/EscenaCombate/Capas/Boton.png');
		
		// Barra de vida
		this.load.image('lifeBar', 'assets/GUI/lifeBar38x8.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Fondo
		var background = this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		var player = new Player(this, 250, 475);
			// Barra de vida de Maria Pita
			var player_lifeBar = this.add.image(player.x, player.y - 150, 'lifeBar').setScale(5, 5);
		//Enemy1
		var enemy = new Enemy1(this,750,200);

		// Descripcion
		var description = this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Acciones
		var cuadroAcciones = this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Interactivo
		var botonAtaque = new Button(this, 135, 617, 'boton', 0, 0, 0, function() {player.attack()});
		var botonDefensa = new Button(this, 135, 697, 'boton', 0, 0, 0, function() {player.defense()});
		var botonObjetos = new Button(this, 375, 617, 'boton', 0, 0, 0, function() {player.objects()});
		var botonQueLocura = new Button(this, 375, 697, 'boton', 0, 0, 0, function() {player.quelocura()});

		var textoAcciones = this.add.image(0, 0, 'textoAcciones').setOrigin(0, 0);

		// Cuadro de dialogo
		/* Si cambiais el scale volved a contar los caracteres y actualizarlo en la clase BoxDialog en el metodo setTextToDisplay 
		Si quereis cambiar solo el tamaño de letra hacedlo en la clase DialogBox*/
		this.dialogBox = new DialogBox(this, 545, 567, 380).setScale(1.2, 1.2); 
		this.dialogBox.setTextToDisplay('Este es un texto de ejemplo Este es un texto de ejemplo Este es un texto de ejemplo Este es un texto de ejemplo Este es un texto de ejemplo');

		// Transicion escena
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('optionsScene');
        });
	}

	update(t,dt) {
		super.update(t,dt);
		this.previousLetterTime += dt; //Contador del tiempo transcurrido desde la ultima letra

		//Si apasado el tiempo necesario y no ha terminado de escribir escribe la siguiente letra
		if(this.dialogBox.isWritting && this.dialogBox.timePerLetter <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}
	}
}
