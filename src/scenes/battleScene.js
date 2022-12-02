// Importaciones
//import { Character } from '../character.js';
import {Button} from '../input/button.js';
import Phaser from '../lib/phaser.js';
import Player from '../characters/player.js';
import DialogBox from '../animations/dialogBox.js';
import Inventory from '../inventory/inventory.js';
import { KeyboardInput } from '../input/keyboardInput.js';
import EventDispatcher from '../combat/eventDispatcher.js';
import {listOfEnemies} from '../data/listOfEnemies.js';
import DamageInd from '../animations/indicator.js';
import Indicator from '../animations/indicator.js';

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
		this.indicator;
		this.previousLetterTime = 0;

		this.level;
		this.enemies = [];
		this.loot = [];
	}

	/**
	 * Inicializa variables
	 * - Cargar nivel seleccionado.
	 * @param {[Level, Inventory]} data los niveles a cargar
	*/
	init(data) {
		this.level = data.level;
		this.enemiesData = data.level.enemies;
		this.loot = data.level.loot;
		this.inventory = data.inventory;
		this.inventoryBackup = data.inventory.getInventory();
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
		this.load.spritesheet('alienatedCorsair', 'assets/characters/enemies/alienatedCorsair.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('ensignDrake', 'assets/characters/enemies/ensignDrake.png', {frameWidth: 32, frameHeight:32});
		// Descripcion
		this.load.image('description', 'assets/scenes/battle/dialogBox.png');
		// Acciones
		this.load.image('cuadroAcciones', 'assets/scenes/battle/actionsBox.png');
		this.load.spritesheet('botonAtaque', 'assets/scenes/battle/attackButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonDefensa', 'assets/scenes/battle/defenseButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonObjetos', 'assets/scenes/battle/objectsButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonQueLocura', 'assets/scenes/battle/queLocuraButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('emptyButton', 'assets/scenes/battle/layers/emptyButton.png', {frameWidth: 241, frameHeight: 67});
		
		// Barra de vida
		this.load.image('lifeBar', 'assets/ui/lifeBar38x8sinCorazon.png');
		this.load.spritesheet('lifeBarColors', 'assets/ui/lifeBarColors16x4.png', {frameWidth: 4, frameHeight: 4});

		// Indicador
		this.load.spritesheet('dmgInd', 'assets/scenes/battle/indicator/dmgInd.png', { frameWidth: 37, frameHeight: 28});
		this.load.spritesheet('healInd', 'assets/scenes/battle/indicator/healInd.png', {frameWidth: 37, frameHeight: 29});
		this.load.spritesheet('defInd', 'assets/scenes/battle/indicator/defInd.png', {frameWidth: 37, frameHeight: 28});
		this.load.spritesheet('wpInd', 'assets/scenes/battle/indicator/wpInd.png', {frameWidth: 37, frameHeight: 28});
		this.load.spritesheet('psnInd', 'assets/scenes/battle/indicator/psnInd.png', {frameWidth: 37, frameHeight: 28});
		this.load.spritesheet('bleedInd', 'assets/scenes/battle/indicator/bleedInd.png', {frameWidth: 37, frameHeight: 28});

		// Transición
		this.load.spritesheet('fadeIn', 'assets/scenes/transitions/fadeInBattleTransition.png', {frameWidth: 1024, frameHeight: 768});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Fondo
		this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		this.player = new Player(this, 250, 475, this.inventory);
    
		// Enemigo seleccionado
		this.selectedEnemy= null;
		this.enemies = []; //ARREGLO RAPIDO: quitar cuando se implemente una funcion para cuando muere un enemigo
		this.enemiesData.forEach(enemy => this.enemies.push(listOfEnemies[enemy.id](this, enemy.x, enemy.y)));
		// Descripcion
		this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Cuadro de dialogo
		this.dialogBox = new DialogBox(this, 545, 565, 450); 
		//this.dialogBox.setTextToDisplay('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,');

		// Acciones
		this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Indicadores de daño
		this.indicator = new Indicator(this, 300, 565,
			{dmgInd: 'dmgInd', healInd: 'healInd', defInd: 'defInd', wpInd: 'wpInd', psnInd: 'psnInd', bleedInd: 'bleedInd'});
    
		this.keyboardInput = new KeyboardInput(this);
		this.botones = [new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('attack')}),
		 new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, this.keyboardInput, () => {this.scene.pause();this.scene.launch('inventoryScene', {scene: 'battleScene', inventory: this.player.inventory});this.events.once('resume', (scene, item) => {this.useItem(item)})}),
		 new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('defense')}),
		 new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('queLocura')})];

		this.botones[0].setAdjacents(null, this.botones[2], null, this.botones[1]);
		this.botones[1].setAdjacents(null, this.botones[3], this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, this.botones[3]);
		this.botones[3].setAdjacents(this.botones[1], null, this.botones[2], null);
		this.keyboardInput.setStartButton(this.botones[0]);

		this.emptyButton = this.add.image(254.5, 663.5, 'emptyButton').setOrigin(0,0);
		this.emptyButton.setCrop(0, 0, 0, 0);

		this.DisableQueLocura();
		this.UpdateQueLocura(0);
    
    	this.emitter = EventDispatcher.getInstance();

		// Transición
		// FadeIn
		this.anims.create({
			key: 'transition',
			frames: this.anims.generateFrameNumbers('fadeIn', {start: 0, end: 15}),
			frameRate: 18,
			repeat: 0
		});
		this.add.sprite(1024, 768, 'fadeIn').setOrigin(1, 1).play('transition');
	}

	update(t,dt) {
		super.update(t,dt);
		this.previousLetterTime += dt; // Contador del tiempo transcurrido desde la ultima letra
		this.keyboardInput.processInput();

		// Si ha pasado el tiempo necesario y no ha terminado de escribir escribe la siguiente letra
		if(this.dialogBox.isWritting && this.dialogBox.timePerLetter <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}
	}

	// Metodo que efectua la accion del jugador cada turno
	PlayerTurn(action, item){
		this.DisableButtons();															// Desactiva los botones
		switch (action){									
			
      		case 'attack' : 															// Se selecciona atacar
				this.UpdateQueLocura(35)																
				this.dialogBox.clearText();												// Borrar texto previo
				if (this.enemies.length > 1) {											// Si hay más de un enemigo en escena
					this.dialogBox.setTextToDisplay('Selecciona a un enemigo');	
					//Se hace a todos los enemigos interactuables
					this.emitter.once('finishTexting', () => {this.enemies.forEach(Element => {Element.animator.setInteractive();	
					});});
					//Una vez se reciba confirmación del ataque y el enemigo seleccionado, se ataca.
					this.emitter.once('enemyselected',() => {
						this.dialogBox.clearText();														// Borrar texto previo
					  	this.dialogBox.setTextToDisplay('Maria Pita ataca al ' + this.selectedEnemy.getName() +
					 	  	' con ' + this.player.inventory.getEquipedWeapon().name +
					  		' y le baja ' + this.player.getDamage() + ' puntos de vida');
						  	this.emitter.once('finishTexting', () => {
								this.player.attack(this.selectedEnemy);
              					this.indicator.updateInd("player", "damage", this.selectedEnemy.getPosition(), this.player.getDamage()); // Actualizar indicador
								this.enemies.forEach(Element => {Element.animator.disableInteractive();});
							});
						})	
				} else {																                // Si solo hay uno
					this.dialogBox.clearText();														// Borrar texto previo
					this.dialogBox.setTextToDisplay('Maria Pita ataca al ' + this.enemies[0].getName() +
					' con ' + this.player.inventory.getEquipedWeapon().name);
					this.emitter.once('finishTexting', () => {
						this.player.attack(this.enemies[0]);
            			this.indicator.updateInd("player", "damage", this.enemies[0].getPosition(), this.player.getDamage()); // Actualizar indicador
					});
				}
				break;			
			
      		case 'defense': 																	// Si selecciona defenderse
				this.dialogBox.clearText();														// Borrar texto previo
				this.dialogBox.setTextToDisplay('Maria Pita aumenta su defensa durante 3 turnos');
				this.emitter.once('finishTexting', () => {
					this.player.defense()
					this.indicator.updateInd("player", "def", this.player.getPosition(), ""); 	// Actualizar indicador
				});
				break;
			
      		case 'object' : 																	// Si selecciona un objeto
				this.dialogBox.clearText();														// Borrar texto previo
				if(item.type === 'WEAPON') this.dialogBox.setTextToDisplay('Maria Pita ha cambiado de arma a ' + item.name);
				else this.dialogBox.setTextToDisplay('Maria Pita ha usado ' + item.name + ' y se curó ' + item.getHealthValue() + ' de vida');
				this.emitter.once('finishTexting', () => {
					this.player.useItem(item);

					// Actualizar indicador
					if (item.type === "HEALTH") this.indicator.updateInd("player", "health" , this.player.getPosition(), item.getHealthValue());
					else this.indicator.updateInd("player", "weapon", this.player.getPosition(), item.getAttack());
					});
				break;
			
      		case 'queLocura' : 																	// Si selecciona QueLocura
				this.DisableQueLocura(); 																	
				this.dialogBox.clearText();														// Borrar texto previo
				this.dialogBox.setTextToDisplay('¡MARIA PITA DESATA TODO SU PODER!');
				this.emitter.once('finishTexting', () => {this.player.quelocura(this.enemies, 0)});
				break;
		}	
		this.emitter.once('finishTurn', () => {				// Evento para que el enemigo ataque	
			if (levelCompleted(this.enemies)){
				this.dialogBox.clearText();																	// Borrar texto previo							// Si Maria Pita ha empezado a atacar
				this.time.delayedCall(2000,()=>{this.scene.start('levelMenuScene', {level: this.level, inventory: this.player.inventory});});
			}
			else this.EnemyTurn()}); 			
	}

	// Metodo que efectua la accion de los enemigos cada turno
	EnemyTurn(index){
		if (!index) index = 0;
		// Si el enemigo sigue vivo hace su acción
		if (!levelFailed(this.enemies[index]) && !this.enemies[index].isStuned()) {
			this.dialogBox.clearText();                           // Borrar texto previo
			this.dialogBox.setTextToDisplay(this.enemies[index].getName() + ' (' +  index + ')' +' ataca a Maria Pita');	// Enviar el nuevo texto
			this.emitter.once('finishTexting', () => {						// Crea un evento para que el enemigo ataque
				
				// Guarda el daño hecho o el daño y un texto si se ha usado una habilidad
				let attack = this.enemies[index].attack(this.player);
				this.indicator.updateInd("enemy", "damage", this.player.getPosition(), this.player.receivedDamage); // Actualizar indicador
				
				// Si el ataque no ha sido con habilidad pasar al siguiente turno
				if (typeof attack == 'number'){
					index++;
					
					if (levelFailed(this.player)) {
						this.dialogBox.clearText();																	// Borrar texto previo
						this.time.delayedCall(2000,()=>{this.scene.start('GameOverScene', {level: this.level, inventoryBackup: this.inventoryBackup, inventory: this.player.inventory});});
					}
					else if(index < this.enemies.length) {this.emitter.once('finishTurn', () => {this.EnemyTurn(index)});} 	//Se llama al ataque de los demas enemigos
					else this.emitter.once('finishTurn', () => {this.UpdatePlayerEffects();})							// Evento que actualiza los estados del jugador en el turno
				}
				
				// Si el ataque ha sido con habilidad dar feedback y pasar al siguiente turno
				else {
					this.dialogBox.clearText();
					this.dialogBox.setTextToDisplay('Enemigo ' + attack[1] + ' a Maria Pita');
					this.emitter.once('finishTexting', () => {
						index++;
						if (levelFailed(this.player)) {
							this.dialogBox.clearText();																	// Borrar texto previo
							this.time.delayedCall(2000,()=>{this.scene.start('GameOverScene', {level: this.level, inventoryBackup: this.inventoryBackup, inventory: this.player.inventory});});
						}
						else if (index < this.enemies.length) this.EnemyTurn(index); 	//Se llama al ataque de los demas enemigos
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
			this.emitter.once('finishTexting', () => {
				this.player.updateTurn();
				this.indicator.updateInd("player", "poison", this.player.getPosition(), this.player.getBleedDamage());
				if (levelFailed(this.player)) {
					this.dialogBox.clearText();																	// Borrar texto previo
					this.time.delayedCall(2000,()=>{this.scene.start('GameOverScene', {level: this.level, inventoryBackup: this.inventoryBackup, inventory: this.player.inventory});});
				}
				else this.emitter.once('finishTurn', () => {this.UpdateEnemyEffects()})});
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
			this.emitter.once('finishTexting', () => {
				this.enemies[index].updateTurn();
				this.indicator.updateInd("player", "bleed", this.enemies[index].getPosition(), this.enemies[index].getBleedDamage()); // Actualizar indicador
				index++;
				if (levelCompleted(this.enemies)){
					this.dialogBox.clearText();																	// Borrar texto previo							// Si Maria Pita ha empezado a atacar
					this.time.delayedCall(2000,()=>{this.scene.start('levelMenuScene', {level: this.level, inventory: this.player.inventory});});
				}
				// Si quedan enemigos se actualizan tambien
				if (index > this.enemies.length) this.emitter.once('finishTurn', () => {this.UpdateEnemyEffects(index);})
				// Si no quedan se pasa al siguiente turno
				else this.emitter.once('finishTurn', () => {this.CheckFinalWeapon();});});			// Evento que vuelve a crear los botones
		}
		else {
			this.enemies[index].updateTurn();
			index++;
			if (index < this.enemies.length) this.UpdateEnemyEffects(index);
			else this.CheckFinalWeapon();
		}
	}

	// Desactiva y vuelve invisible los botones
	DisableButtons(){
		for(var i=0; i < this.botones.length; i++) {
			this.botones[i].disableInteractive();
			this.botones[i].visible = false;
		}
		this.emptyButton.visible = false;
	}

	// Activa y vuelve visible los botones
	EnableButtons(){
		for(var i=0; i < this.botones.length; i++) {
			if(i === 3 && this.currentQueLocura <= 100){
				this.emptyButton.visible = true;
			}else{
				this.botones[i].setInteractive();
				this.botones[i].visible = true;
			}
		}
		if(this.player.inventory.getEquipedWeapon().imgID === 'puño'){
			this.botones[3].disableInteractive();
			this.botones[3].visible = false;
		}
	}

	// Impide seleccionar que locura y pone el contador a cero
	DisableQueLocura(saveCounter = false){
		this.botones[1].setAdjacents(null, null, this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, null);
		this.botones[3].disableInteractive();
		this.botones[3].visible = false;
		if(!saveCounter){
			this.currentQueLocura = 0;
		}
		this.UpdateQueLocura(0);
	}

	// Activa que locura y hace posible seleccionarla
	EnableQueLocura(){
		this.botones[1].setAdjacents(null, this.botones[3], this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, this.botones[3]);
		this.botones[3].setInteractive();
	}

	// Aumenta el contador segun el parametro dado y actializa la imagen
	UpdateQueLocura(add){
		if(this.player.inventory.getEquipedWeapon().imgID != 'puño'){
			this.currentQueLocura += add;
			if(this.currentQueLocura >= 100){
				this.EnableQueLocura();
			}else{
				this.emptyButton.setCrop(0,0, (this.emptyButton.width/100)*this.currentQueLocura, this.emptyButton.height);
			}
		}
	}

	// Usa el item si hay, si no, no hace nada
	useItem(item){
		if(item !== 'none'){
			this.PlayerTurn('object', item);
			if(item.imgID === 'puño')
				this.DisableQueLocura(true);
		}
	}

	CheckFinalWeapon() {
		// Si está Drake en la batalla
		if (this.player.inventory.getEquipedWeapon().imgID !== 'asta') {
			if (this.enemies[0].animator.spritesheet === 'ensignDrake') {
				// Si la vida de Drake es menos de la mitad
				if (this.enemies[0].healthController.getCurrentHealth() < this.enemies[0].healthController.getMaxHealth() / 2) {
					//-- Menú de recibir loot con el arma final
					//-- Ponerla como el arma equipada
					this.player.inventory.setEquipedWeapon('asta');
					//-- Texto diciendo que se ha encontrado el arma
					this.dialogBox.clearText();
					this.dialogBox.setTextToDisplay('Maria Pita ha encontrado un asta de bandera y se la ha equipado.');	// Enviar el nuevo texto
					this.emitter.once('finishTexting', () => {
						this.EnableButtons();
					});
				}
				else this.EnableButtons();
			}
			else this.EnableButtons();
		}
		else this.EnableButtons();
	}
}
