// Importaciones
//import { Character } from '../character.js';
import {Button} from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import {DrunkRuffian, StinkyPirate} from '../enemy.js'
import DialogBox from '../dialogBox.js';;
import { keyboard } from '../keyboard_input.js';

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
		this.state = 0;
		this.isBusy = false;
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
		//this.load.spritesheet('enemy', 'assets/enemy.png', {frameWidth: 97, frameHeight: 97});
		this.load.spritesheet('drunkRuffian', 'assets/enemies/rufianEmbriagado.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('stinkyPirate', 'assets/enemies/pirataMaloliente.png', {frameWidth: 32, frameHeight:32});
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
		this.player = new Player(this, 250, 475, 25);
			
		//Enemy1
		this.enemy = new DrunkRuffian(this, 750, 200);
			
		// Descripcion
		var description = this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Cuadro de dialogo
		this.dialogBox = new DialogBox(this, 545, 565, 450); 
		//this.dialogBox.setTextToDisplay('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,');

		// Acciones
		var cuadroAcciones = this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Interactivo
		var self= this;
		this._keyboard=new keyboard(this);
		this.botones=[new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, () => {this.state = 1},function(){self._keyboard.setBeingUsed(0)}),
		 new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, function() {this.player.objects()},function(){self._keyboard.setBeingUsed(1)}),
		 new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, function() {this.player.defense()},function(){self._keyboard.setBeingUsed(2)}),
		 new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, function() {this.player.quelocura()},function(){self._keyboard.setBeingUsed(3)})];
		this._keyboard.loadButtonArray(this.botones);
		// Transicion escena
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('optionsScene');
        });
	}

	update(t,dt) {
		super.update(t,dt);
		this.previousLetterTime += dt; //Contador del tiempo transcurrido desde la ultima letra
		this._keyboard.processInput();

		//Si apasado el tiempo necesario y no ha terminado de escribir escribe la siguiente letra
		if(this.dialogBox.isWritting && this.dialogBox.timePerLetter <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}

		if(this.state >= 0){
			if(!this.dialogBox.isWritting){
				if(this.state === 1){
					this.dialogBox.clearText();
					this.dialogBox.setTextToDisplay('Maria Pita ataca a enemigo');
					this.state = 2;
				}
				else if(this.state === 2){
					if(!this.isBusy){
						this.player.attack(this.enemy);
						this.isBusy = true;
						this.time.delayedCall(1000, ()=> {this.state = 3; this.isBusy = false;});
					}
				}
				else if(this.state === 3){
					this.dialogBox.clearText();
					this.dialogBox.setTextToDisplay('Enemigo ataca a Maria Pita');
					this.state = 4;
				}
				else if(this.state === 4){
					if(!this.isBusy){
						this.enemy.attack(this.player);
						this.isBusy = true;
						this.time.delayedCall(1000, ()=> {this.state = 0; this.isBusy = false;});
					}
				}
			}
		}
	}
}
