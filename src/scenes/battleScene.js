// Importaciones
//import { Character } from '../character.js';
import {Button} from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import {DrunkRuffian, StinkyPirate} from '../enemy.js'
import DialogBox from '../dialogBox.js';;
import { KeyboardInput } from '../keyboardInput.js';

// Comprueba si han muerto todos los enemigos para marcar el nivel como completado
const levelCompleted = function(enemies){
	let completado = true;
	let i = 0;
	while (i < enemies.length){
		if (enemies[i].healthController.getCurrentHealth() > 0) completado = false;
		i++;
	}
	return completado;
}

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

		this.level;
		this.enemies;
		this.loot;
	}

	/**
	 * Inicializa variables
	 * - Cargar nivel seleccionado
	*/
	init(level) {
		this.level = level;
		this.enemies = level.enemies;
		this.loot = level.loot;
		this.state  = 'Waiting';
		this.isBusy = false;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar:
	 * 		- Fondo
	 * 		- Hud
	 * 		- Personajes
	 */
	preload() {
		// Fondo
		this.load.image('battleBackground', 'assets/scenes/battle/battleBackground.png');
		// Maria Pita (Animaciones)
		this.load.spritesheet('player_idle', 'assets/characters/mariaPita/mariaPita_idle.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_idleBack', 'assets/characters/mariaPita/mariaPita_idleBack.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_jump', 'assets/characters/mariaPita/mariaPita_jump.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_attack', 'assets/characters/mariaPita/mariaPita_attack.png', {frameWidth: 50, frameHeight: 32});

		// Enemy (Animaciones)
		//this.load.spritesheet('enemy', 'assets/enemy.png', {frameWidth: 97, frameHeight: 97});
		this.load.spritesheet('drunkRuffian', 'assets/characters/enemies/drunkRuffian.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('stinkyPirate', 'assets/characters/enemies/stinkyPirate.png', {frameWidth: 32, frameHeight:32});
		// Descripcion
		this.load.image('description', 'assets/scenes/battle/dialogBox.png');
		// Acciones
		this.load.image('cuadroAcciones', 'assets/scenes/battle/actionsBox.png');
		this.load.spritesheet('botonAtaque', 'assets/scenes/battle/attackButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonDefensa', 'assets/scenes/battle/defenseButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonObjetos', 'assets/scenes/battle/objectsButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonQueLocura', 'assets/scenes/battle/queLocuraButton.png', {frameWidth: 241, frameHeight: 67});
		
		// Barra de vida
		this.load.image('lifeBar', 'assets/ui/lifeBar38x8sinCorazon.png');
		this.load.spritesheet('lifeBarColors', 'assets/ui/lifeBarColors16x4.png', {frameWidth: 4, frameHeight: 4});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Fondo
		var background = this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		this.player = new Player(this, 250, 475, 25);
			
		// Enemy1
		// this.enemy = new DrunkRuffian(this, 750, 200);
		this.enemies.forEach(enemy => enemy.setScene(this));
			
		// Descripcion
		var description = this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Cuadro de dialogo
		this.dialogBox = new DialogBox(this, 545, 565, 450); 
		//this.dialogBox.setTextToDisplay('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,');

		// Acciones
		var cuadroAcciones = this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Interactivo
		var self = this;
		this.keyboardInput = new KeyboardInput(this);
		this.botones = [new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, this.keyboardInput, () => {if(this.state === 'Waiting')this.state = 'PlayerDescription'}),
		 new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, this.keyboardInput, () => {if(this.state === 'Waiting'){this.scene.pause();this.scene.launch('inventoryScene', 'battleScene');}}),
		 new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, this.keyboardInput, () => {this.player.defense()}),
		 new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, this.keyboardInput, () => {this.player.quelocura()})];
		//this.keyboardInput.loadButtonArray(this.botones);

		this.botones[0].setAdjacents(null, this.botones[2], null, this.botones[1]);
		this.botones[1].setAdjacents(null, this.botones[3], this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, this.botones[3]);
		this.botones[3].setAdjacents(this.botones[1], null, this.botones[2], null);
		this.keyboardInput.setStartButton(this.botones[0]);
	}

	update(t,dt) {
		super.update(t,dt);
		this.previousLetterTime += dt; //Contador del tiempo transcurrido desde la ultima letra
		this.keyboardInput.processInput();

		//Si ha pasado el tiempo necesario y no ha terminado de escribir escribe la siguiente letra
		if(this.dialogBox.isWritting && this.dialogBox.timePerLetter <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}

		// Si no está esperando a que el jugador seleccione una opción
		if(this.state !== 'Waiting'){
			// console.log(this.state);
			// console.log(this.isBusy);
			if(!this.dialogBox.isWritting && !this.isBusy){ 														// Si no se está escribiendo en el cuadro de texto
				if(this.state === 'PlayerDescription'){ 															// Si Maria Pita decide atacar
					this.dialogBox.clearText();																		// Borrar texto previo
					this.dialogBox.setTextToDisplay('Maria Pita ataca a enemigo');									// Enviar el nuevo texto
					this.state = 'PlayerTurn';																		// Pasar al estado de ataque de Maria Pita
				}
				else if(this.state === 'PlayerTurn'){																// Si Maria Pita ha empezado a atacar
						this.player.attack(this.enemies[0]);														// Atacar al enemigo correspondiente	
						this.isBusy = true;																			// Marcar que se está realizando el ataque
						this.time.delayedCall(1000, ()=> {this.state = 'EnemyDescription'; this.isBusy = false;}); 	// Después de un tiempo, cambiar de estado al ataque enemigo
						if (levelCompleted(this.enemies)) this.scene.start('levelMenuScene', this.level); 			// Comprobar si se completa el nivel
					}
				else if(this.state === 'EnemyDescription'){															// Si el enemigo va a tacar
					this.dialogBox.clearText();																		// Borrar texto previo
					this.dialogBox.setTextToDisplay('Enemigo ataca a Maria Pita');									// Enviar el nuevo texto
					this.state = 'EnemyTurn';																		// Pasar al estado de ataque de Enemigo
				}
				else if(this.state === 'EnemyTurn'){																// Si el enemigo ha empezado a atacar
						this.enemies[0].attack(this.player);														// Enemigo correspondiente ataca a Maria Pita
						this.isBusy = true;																			// Marcar que se está realizando el ataque 
						this.time.delayedCall(1000, ()=> {this.state = 'Waiting'; this.isBusy = false;}); 			// Después de un tiempo, cambiar de estado al siguiente turno
				}
			}
		}
	}
}
