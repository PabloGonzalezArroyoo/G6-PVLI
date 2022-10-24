// Importaciones
//import { Character } from '../character.js';
import {Button} from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import {Enemy1} from '../enemy.js'
import DialogBox from '../dialogBox.js';;

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
		this.load.spritesheet('botonAtaque', 'assets/Escenas/EscenaCombate/botonAtaque.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonDefensa', 'assets/Escenas/EscenaCombate/botonDefensa.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonObjetos', 'assets/Escenas/EscenaCombate/botonObjetos.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonQueLocura', 'assets/Escenas/EscenaCombate/botonQueLocura.png', {frameWidth: 241, frameHeight: 67});
		
		// Barra de vida
		this.load.image('lifeBar', 'assets/GUI/lifeBar38x8.png');
		this.load.spritesheet('lifeBarColors', 'assets/GUI/lifeBarColors16x4.png', {frameWidth: 4, frameHeight: 4});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Fondo
		var background = this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		var player = new Player(this, 250, 475);
			
		//Enemy1
		var enemy = new Enemy1(this, 750, 200);
			
		// Descripcion
		var description = this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Acciones
		var cuadroAcciones = this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Interactivo
		var botonAtaque = new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, function() {player.attack(enemy)});
		var botonDefensa = new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, function() {player.defense()});
		var botonObjetos = new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, function() {player.objects()});
		var botonQueLocura = new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, function() {player.quelocura()});

		// Cuadro de dialogo
		this.dialogBox = new DialogBox(this, 545, 565, 450); 
		this.dialogBox.setTextToDisplay('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,');

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
