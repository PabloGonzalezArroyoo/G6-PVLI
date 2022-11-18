// Importaciones
//import { Character } from '../character.js';
import {Button} from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import DialogBox from '../dialogBox.js';
import Inventory from '../inventory.js';
import { KeyboardInput } from '../keyboardInput.js';
import EventDispatcher from '../eventDispatcher.js';

// Comprueba si han muerto todos los enemigos para marcar el nivel como completado
const levelCompleted = function(enemies){
	let completado = true;
	let i = 0;
	while (i < enemies.length && completado){
		if (enemies[i].healthController.getCurrentHealth() > 0) completado = false;
		i++;
	}
	return completado;
}

// Comprueba si el jugador ha muerto
const levelFailed = function(player) {
	let muerto = false;
	if (player.healthController.getCurrentHealth() <= 0) muerto = true;
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

		this.level;
		this.enemies;
		this.loot;
	}

	/**
	 * Inicializa variables
	 * - Cargar nivel seleccionado.
	 * @param {[Level, Inventory]} data los niveles a cargar
	*/
	init(data) {
		this.level = data.level;
		this.enemies = data.level.enemies;
		this.loot = data.level.loot;
		this.inventory = data.inventory;
		this.inventoryBackup = data.inventory.getInfo();
		console.log(this.inventoryBackup);
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
		this.load.spritesheet('mariaPita_defendBack', 'assets/characters/mariaPita/mariaPita_defendBack.png', {frameWidth: 50, frameHeight: 32});

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
		this.player = new Player(this, 250, 475, this.inventory);
    
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
		this.botones = [new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('attack')}),
		 new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, this.keyboardInput, () => {this.scene.pause();this.scene.launch('inventoryScene', {scene: 'battleScene', inventory: this.player.inventory});this.events.once('resume', (scene, item) => {this.useItem(item)})}),
		 new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('defense')}),
		 new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('queLocura')})];
		//this.keyboardInput.loadButtonArray(this.botones);

		this.botones[0].setAdjacents(null, this.botones[2], null, this.botones[1]);
		this.botones[1].setAdjacents(null, this.botones[3], this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, this.botones[3]);
		this.botones[3].setAdjacents(this.botones[1], null, this.botones[2], null);
		this.keyboardInput.setStartButton(this.botones[0]);
    
    this.emitter = EventDispatcher.getInstance();
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
		if (levelCompleted(this.enemies)){
			this.dialogBox.clearText();																	// Borrar texto previo							// Si Maria Pita ha empezado a atacar
			this.time.delayedCall(2000,()=>{this.scene.start('levelMenuScene', {level: this.level, inventory: this.player.inventory});});
		} 
		if (levelFailed(this.player)){
			this.dialogBox.clearText();																	// Borrar texto previo							// Si Maria Pita ha empezado a atacar
			this.time.delayedCall(2000,()=>{this.scene.start('GameOverScene', {level: this.level, inventoryBackup: this.inventoryBackup, inventory: this.player.inventory});});
		} 
	}

	// Metodo que efectua la accion del jugador cada turno
	PlayerTurn(action, item){
		this.DisableButtons();															// Desactiva los botones
		switch (action){									
			case 'attack' : 																	// Si selecciona atacar
				this.dialogBox.clearText();														// Borrar texto previo
				this.dialogBox.setTextToDisplay('Maria Pita ataca a enemigo');	
				this.emitter.once('finishTexting', () => {this.player.attack(this.enemies[0])});	
				break;			
			case 'defense': 														// Si selecciona defenderse
				this.dialogBox.clearText();														// Borrar texto previo
				this.dialogBox.setTextToDisplay('Maria Pita se defiende durante 3 turnos');	
				this.emitter.once('finishTexting', () => {this.player.defense()});
				break;
			case 'object' : 																	//Si selecciona un objeto
				this.dialogBox.clearText();														// Borrar texto previo
				if(item.type === 'WEAPON')													
					this.dialogBox.setTextToDisplay('Maria Pita ha cambiado de arma ha ' + item.name);
				else
					this.dialogBox.setTextToDisplay('Maria Pita ha usado ' + item.name); 
				this.emitter.once('finishTexting', () => {this.player.useItem(item)});
				break;
			case 'queLocura' : 																	// Si selecciona QueLocura
				this.dialogBox.clearText();														// Borrar texto previo
				this.dialogBox.setTextToDisplay('¡MARIA PITA DESATA TODO SU PODER!');
				this.emitter.once('finishTexting', () => {this.player.quelocura(this.enemies, 0)});
				break;
		}	
		this.emitter.once('finishTurn', () => {if (!levelCompleted(this.enemies) && !levelFailed(this.player)) this.EnemyTurn()}); // Evento para que el enemigo ataque	
										
	}

	// Metodo que efectua la accion de los enemigos cada turno
	EnemyTurn(index){
		if (!index) index = 0;
		// Si el enemigo sigue vivo hace su acción
		if (!levelFailed(this.enemies[index]) && !this.enemies[index].isStuned()) {
			this.dialogBox.clearText();// Borrar texto previo
			this.dialogBox.setTextToDisplay('Enemigo ataca a Maria Pita');	// Enviar el nuevo texto
			this.emitter.once('finishTexting', () => {						// Crea un evento para que el enemigo ataque
				
				// Guarda el daño hecho o el daño y un texto si se ha usado una habilidad
				let attack = this.enemies[index].attack(this.player);
				
				// Si el ataque no ha sido con habilidad pasar al siguiente turno
				if (typeof attack == 'number'){
					index++;
					if(index < this.enemies.length) {this.emitter.once('finishTurn', () => {this.EnemyTurn(index)});} 	//Se llama al ataque de los demas enemigos
					else this.emitter.once('finishTurn', () => {this.UpdatePlayerEffects();})							// Evento que actualiza los estados del jugador en el turno
				}
				
				// Si el ataque ha sido con habilidad dar feedback y pasar al siguiente turno
				else {
					this.dialogBox.clearText();
					this.dialogBox.setTextToDisplay('Enemigo ' + attack[1] + ' a Maria Pita');
					this.emitter.once('finishTexting', () => {
						index++;
						if(index < this.enemies.length) this.EnemyTurn(index); 	//Se llama al ataque de los demas enemigos
						else this.UpdatePlayerEffects();						// Evento que actualiza los estados del jugador en el turno
					});
				}});
		}
		// Si el enemigo no está vivo pasa al siguiente turno
		else {
			index++;
			if (index < this.enemies.length) this.EnemyTurn(index);
			else this.UpdatePlayerEffects();
		}
	}

	// Metodo que actualiza los efectos por turnos del jugador
	UpdatePlayerEffects(){
		// Si el jugador esta envenenado da feedback
		if (this.player.isBleeding()){
			this.dialogBox.clearText();
			this.dialogBox.setTextToDisplay('Maria Pita pierde vida por el veneno');
			this.emitter.once('finishTexting', () => {this.player.updateTurn();
				this.emitter.once('finishTurn', () => {this.UpdateEnemyEffects()})});
		}
		else {
			this.player.updateTurn();
			this.UpdateEnemyEffects();
		}
	}

	// Metodo que actualiza los efectos por turnos de los enemigos
	UpdateEnemyEffects(index){
		if (!index) index = 0;
		// Si el enemigo sigue vivo y esta sangrando da feedback
		if (!levelFailed(this.enemies[index]) && this.enemies[index].isBleeding()){
			this.dialogBox.clearText();
			this.dialogBox.setTextToDisplay('Enemigo pierde vida por el sangrado');
			this.emitter.once('finishTexting', () => {this.enemies[index].updateTurn();
				index++;
				// Si quedan enemigos se actualizan tambien
				if (index > this.enemies.length) this.emitter.once('finishTurn', () => {this.UpdateEnemyEffects(index)})
				// Si no quedan se pasa al siguiente turno
				else this.emitter.once('finishTurn', () => {this.EnableButtons();});});			// Evento que vuelve a crear los botones
		}
		else {
			this.enemies[index].updateTurn();
			index++;
			if (index < this.enemies.length) this.UpdateEnemyEffects(index);
			else this.EnableButtons();
		}
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
	//Usa el item si hay, si no, no hace nada
	useItem(item){
		if(item !== 'none')
			this.PlayerTurn('object', item);
	}
}
