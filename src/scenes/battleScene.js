// Importaciones
//import { Character } from '../character.js';
import {Button} from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import { DrunkRuffian, StinkyPirate, ScurviedSailor, ExperiencedBuccaneer, AlienatedCosair, EnsignDrake }  from '../enemy.js'
import DialogBox from '../dialogBox.js';;
import { keyboard } from '../keyboardInput.js';
import EventDispatcher from '../eventDispatcher.js';

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

// Comprueba si el jugador ha muerto
const levelFailed = function(player) {
	let muerto = false;
	if (player.healthController.getCurrentHealth() < 0) muerto = true;
	return muerto;
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
		this.load.spritesheet('scurviedSailor', 'assets/characters/enemies/scurviedSailor.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('experiencedBuccaneer', 'assets/characters/enemies/experiencedBuccaneer.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('alienatedCosair', 'assets/characters/enemies/alienatedCosair.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('ensignDrake', 'assets/characters/enemies/ensignDrake.png', {frameWidth: 32, frameHeight:32});
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
		this.player = new Player(this, 250, 475, 50);
			
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
		this._keyboard = new keyboard(this);
		this.botones = [new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, () => {this.PlayerTurn()},function(){self._keyboard.setBeingUsed(0)}),
		 new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, () => {if(this.state === 'Waiting'){this.scene.pause();this.scene.launch('inventoryScene', 'battleScene')}},function(){self._keyboard.setBeingUsed(1)}),
		 new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, function() {self.player.defense()},function(){self._keyboard.setBeingUsed(2)}),
		 new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, function() {self.player.quelocura()},function(){self._keyboard.setBeingUsed(3)})];
		this._keyboard.loadButtonArray(this.botones);
		
		// Transicion escena
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('optionsScene');
        });

        this.emitter = EventDispatcher.getInstance();
	}

	update(t,dt) {
		super.update(t,dt);
		this.previousLetterTime += dt; //Contador del tiempo transcurrido desde la ultima letra
		this._keyboard.processInput();

		//Si ha pasado el tiempo necesario y no ha terminado de escribir escribe la siguiente letra
		if(this.dialogBox.isWritting && this.dialogBox.timePerLetter <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}
		if (levelCompleted(this.enemies)){
			this.dialogBox.clearText();																	// Borrar texto previo							// Si Maria Pita ha empezado a atacar
			this.time.delayedCall(2000,()=>{this.scene.start('levelMenuScene', this.level);});
		} 
	}

	PlayerTurn(){
		this.DisableButtons();																		//Desactiva los botones
		this.dialogBox.clearText();																	// Borrar texto previo
		this.dialogBox.setTextToDisplay('Maria Pita ataca a enemigo');								// Si Maria Pita ha empezado a atacar
		this.emitter.once('finishTexting', () => {this.player.attack(this.enemies[0]);				// Crea un evento para que el jugador ataque y crea otro evento
			this.emitter.once('finishTurn', () => {if(!levelCompleted(this.enemies))this.EnemyTurn(0)})});
										// Evento para que el enemygo ataque
	}

	EnemyTurn(index){
		if(!index)index=0;
		this.dialogBox.clearText();																		// Borrar texto previo
		this.dialogBox.setTextToDisplay('Enemigo ataca a Maria Pita');									// Enviar el nuevo texto
		this.emitter.once('finishTexting', () => {this.enemies[index].attack(this.player);					// Crea un evento para que el enemigo ataque y crea otro evento
				index++;
				if(index<this.enemies.length) {this.emitter.once('finishTurn', () => {this.EnemyTurn(index)}); console.log("queda otro");}
				else this.emitter.once('finishTurn', () => {this.EnableButtons();})});						// Evento que vuelve a crear los botones
		
	}

	// Desactiva y vuelve invisible los botones
	DisableButtons(){
		for(var i=0; i < this.botones.length; i++) {
			this.botones[i].disableInteractive();
			this.botones[i].visible = false;
		}
	}

	// Activa y vuelve visible los botones
	EnableButtons(){
		for(var i=0; i < this.botones.length; i++) {
			this.botones[i].setInteractive();
			this.botones[i].visible = true;
		}
	}
}
