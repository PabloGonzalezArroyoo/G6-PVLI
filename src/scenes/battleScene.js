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
import Indicator from '../animations/indicator.js';
import { listOfItems, weaponsLevel1, weaponsLevel2, weaponsLevel3 } from '../data/listOfItems.js';

// Comprueba si han muerto todos los enemigos para marcar el nivel como completado
const levelCompleted = function (enemies) {
	let completado = true;
	let i = 0;
	while (i < enemies.length && completado){
		if (enemies[i].healthController.getCurrentHealth() > 0) completado = false;
		i++;
	}
	return completado;
}

// Comprueba si el jugador ha muerto
const levelFailed = function (player) {
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
		this.descriptionBox;
		this.actionBox;
		this.lootBox;
		this.indicator;
		this.previousLetterTime = 0;

		this.enemies = [];
		this.selectedEnemy= null;
    
    this.emitter = EventDispatcher.getInstance();
	}

	/**
	 * Inicializa variables
	 * - Cargar nivel seleccionado.
	 * @param {[Level, Inventory]} data los niveles a cargar
	*/
	init(data) {
		this.level = data.level;
		this.enemiesData = data.level.enemies;
		this.inventory = data.inventory;
		this.inventoryBackup = data.inventory.getInventory();
		this.level1prob = data.level.level1prob;
		this.level2prob = data.level.level2prob;
		this.level3prob = data.level.level3prob;
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
		this.load.spritesheet('player_defendBack', 'assets/characters/mariaPita/mariaPita_defendBack.png', {frameWidth: 50, frameHeight: 32});
		this.load.spritesheet('player_whatAmadness', 'assets/characters/mariaPita/mariaPita_whatAmadness.png', {frameWidth: 50, frameHeight: 32})

		// Enemy (Animaciones)
		this.load.spritesheet('drunkRuffian', 'assets/characters/enemies/drunkRuffian.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('stinkyPirate', 'assets/characters/enemies/stinkyPirate.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('scurviedSailor', 'assets/characters/enemies/scurviedSailor.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('experiencedBuccaneer', 'assets/characters/enemies/experiencedBuccaneer.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('alienatedCorsair', 'assets/characters/enemies/alienatedCorsair.png', {frameWidth: 32, frameHeight:32});
		this.load.spritesheet('ensignDrake', 'assets/characters/enemies/ensignDrake.png', {frameWidth: 32, frameHeight:32});
		
		// Descripcion
		this.load.image('description', 'assets/scenes/battle/dialogBox.png');
		
		// Acciones (botones)
		this.load.image('cuadroAcciones', 'assets/scenes/battle/actionsBox.png');
		this.load.spritesheet('botonAtaque', 'assets/scenes/battle/attackButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonDefensa', 'assets/scenes/battle/defenseButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonObjetos', 'assets/scenes/battle/objectsButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.spritesheet('botonQueLocura', 'assets/scenes/battle/queLocuraButton.png', {frameWidth: 241, frameHeight: 67});
		this.load.image('emptyButton', 'assets/scenes/battle/layers/emptyButton.png');
		
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

		// Cuadro de Loot
		this.load.image('lootBox', 'assets/scenes/battle/itemBox.png')
		
		// Items
		this.load.image('puño', 'assets/scenes/inventory/weapons/puño.png');
		this.load.image('cimMad', 'assets/scenes/inventory/weapons/cimitarraMadera.png');
		this.load.image('cimAc', 'assets/scenes/inventory/weapons/cimitarraAcero.png');
		this.load.image('cimLoc', 'assets/scenes/inventory/weapons/cimitarraLoca.png');
		this.load.image('dagOx', 'assets/scenes/inventory/weapons/dagaOxidada.png');
		this.load.image('dagAf', 'assets/scenes/inventory/weapons/dagaAfilada.png');
		this.load.image('dagEx', 'assets/scenes/inventory/weapons/dagaExcéntrica.png');
		//this.load.image('alMb', 'assets/scenes/inventory/weapons/.png');
		//this.load.image('alVrd', 'assets/scenes/inventory/weapons/.png');
		//this.load.image('alDem', 'assets/scenes/inventory/weapons/.png');
		this.load.image('ropIng', 'assets/scenes/inventory/weapons/roperaInglesa.png');
		this.load.image('ropCst', 'assets/scenes/inventory/weapons/roperaCastellana.png');
		this.load.image('ropAl', 'assets/scenes/inventory/weapons/roperaAlocada.png');
		this.load.image('sacho', 'assets/scenes/inventory/weapons/sacho.png');
		this.load.image('fouc', 'assets/scenes/inventory/weapons/fouciño.png');
		this.load.image('guad', 'assets/scenes/inventory/weapons/guadañaExtravagante.png');
		this.load.image('asta', 'assets/scenes/inventory/weapons/astaBandera.png');
		
		this.load.image('bolla', 'assets/scenes/inventory/objects/bollaDePan.png');
		this.load.image('caldo', 'assets/scenes/inventory/objects/caldoGallego.png');
		this.load.image('polbo', 'assets/scenes/inventory/objects/pulpoALaGallega.png');
    
		// Transición
		this.load.spritesheet('fadeIn', 'assets/scenes/transitions/fadeInBattleTransition.png', {frameWidth: 1024, frameHeight: 768});

		// Música -> CAMBIAR POR LA CORRECTA CUANDO LA HAYAMOS DECIDIDO
		this.load.audio('Time to Fight!', ['assets/scenes/battle/Time to Fight! - Xenoblade Chronicles DE.mp3']);
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Variables constantes y se destruyen los eventos anteriores
      this.emitter.destroy();
		  this.camera = this.cameras.main;

		// Musica
		const musicConfig = {
			mute: false,
			volume: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		}
		this.music = this.sound.add('Time to Fight!');
    	this.music.play(musicConfig);
		// Fondo
		this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		this.player = new Player(this, 250, 475, this.inventory);
    
		this.enemies = []; //ARREGLO RAPIDO: quitar cuando se implemente una funcion para cuando muere un enemigo
		this.enemiesData.forEach(enemy => this.enemies.push(listOfEnemies[enemy.id](this, enemy.x, enemy.y)));
		
		// Descripcion
		this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Cuadro de dialogo
		this.dialogBox = new DialogBox(this, 545, 565, 450); 

		// Acciones
		this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Loot
		const width = this.scale.width;
    	const height = this.scale.height;
		this.lootBox = this.add.image(width/2, height/2, 'lootBox').setScale(2,2).setVisible(false);

		// Indicadores de daño
		this.indicator = new Indicator(this, 300, 565,
			{dmgInd: 'dmgInd', healInd: 'healInd', defInd: 'defInd', wpInd: 'wpInd', psnInd: 'psnInd', bleedInd: 'bleedInd'});
			
		// Input
		this.keyboardInput = new KeyboardInput(this);

		// Botones de acción
		this.botones = 
			// Botón de ataque
			[new Button(this, 135, 617, 'botonAtaque', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('attack')}),
			// Botón de inventario
		 	new Button(this, 375, 617, 'botonObjetos', 0, 1, 2, this.keyboardInput, () => {
				this.music.setVolume(0.4);										// Bajar la música
				this.scene.sleep('battleScene');								// Parar la escena de batalla
				this.scene.wake('inventoryScene', 'battleScene');				// Reanudar la escena de inventario
				this.events.once('wake', (scene, item) => {this.music.setVolume(1); this.useItem(item)})	// Evento al volver de la escena de inventario
		 	}),
			// Botón de defensa
		 	new Button(this, 135, 697, 'botonDefensa', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('defense')}),
			// Botón qué locura
		 	new Button(this, 375, 697, 'botonQueLocura', 0, 1, 2, this.keyboardInput, () => {this.PlayerTurn('queLocura')})];

		// Inicializar conexiones entre botones y el botón seleccionado por defecto
		this.inicializeLevelButtonConnections();
		this.keyboardInput.setStartButton(this.botones[0]);
		
		// Botón de qué locura apagado
		this.emptyButton = this.add.image(254.5, 663.5, 'emptyButton').setOrigin(0,0);
		this.emptyButton.setCrop(0, 0, 0, 0);
    
		//Coloca los enemigos adyacentes
		for(let i=0;i<this.enemies.length;i++)
		{
			if(i!=0 && i!=this.enemies.length-1)this.enemies[i].setAdjacents(null,null,this.enemies[i-1],this.enemies[i+1]);
			else if(i==0)this.enemies[i].setAdjacents(null,null,this.enemies[this.enemies.length-1],this.enemies[i+1]);
			else if(i==this.enemies.length-1) this.enemies[i].setAdjacents(null,null,this.enemies[i-1],this.enemies[0]);
		}

    // Deshabilitar el botón de qué locura y resetear su contador
		this.DisableQueLocura();
		this.UpdateQueLocura(0);

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
	PlayerTurn(action, item) {
		this.DisableButtons();															// Desactiva los botones
		switch (action){									
			
      		case 'attack' : 															// Se selecciona atacar
				this.UpdateQueLocura(100)																
				this.dialogBox.clearText();												// Borrar texto previo
				if (this.enemies.length > 1) {											// Si hay más de un enemigo en escena
					this.dialogBox.setTextToDisplay('Selecciona a un enemigo');	
					//Se hace a todos los enemigos interactuables
					this.emitter.once('finishTexting', () => {this.enemies.forEach(Element => {
						Element.animator.setInteractive();
						this.keyboardInput.setStartButton(this.enemies[0]);	
					});});
					//Una vez se reciba confirmación del ataque y el enemigo seleccionado, se ataca.
					this.emitter.once('enemyselected',() => {
						this.DisableEnemy();
						this.dialogBox.clearText();														// Borrar texto previo
					  	this.dialogBox.setTextToDisplay('Maria Pita ataca al ' + this.selectedEnemy.getName() +
					 	  	' con ' + this.player.inventory.getEquipedWeapon().name);
						  	this.emitter.once('finishTexting', () => {
								this.player.attack(this.selectedEnemy);
              					this.indicator.updateInd("player", "damage", this.selectedEnemy.getPosition(), this.player.getDamage()); // Actualizar indicador
							});
						});	
				} else {																                // Si solo hay uno
					this.selectedEnemy = this.enemies[0];
					this.dialogBox.clearText();														// Borrar texto previo
					this.dialogBox.setTextToDisplay('Maria Pita ataca al ' + this.selectedEnemy.getName() +
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
				if (item.type === 'WEAPON') this.dialogBox.setTextToDisplay('Maria Pita ha cambiado de arma a ' + item.name);
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
				if (this.enemies.length > 1 && (this.player.inventory.getEquipedWeapon().imgID !== 'cimMad'||
						this.player.inventory.getEquipedWeapon().imgID !== 'CimAc'||this.player.inventory.getEquipedWeapon().imgID !== 'cimLoc')) {											// Si hay más de un enemigo en escena
					this.dialogBox.setTextToDisplay('Selecciona a un enemigo');	
					//Se hace a todos los enemigos interactuables
					this.emitter.once('finishTexting', () => {this.enemies.forEach(Element => {
						Element.animator.setInteractive();
						this.keyboardInput.setStartButton(this.enemies[0]);	
					});});
					//Una vez se reciba confirmación del ataque y el enemigo seleccionado, se ataca.
					this.emitter.once('enemyselected',() => {
						this.DisableEnemy();
						this.dialogBox.clearText();														// Borrar texto previo
						this.dialogBox.setTextToDisplay('¡MARIA PITA DESATA TODO SU PODER!');
						this.emitter.once('finishTexting', () => {
								this.player.quelocura(this.enemies, this.selectedEnemy);
							});
						});	
				} else {																                // Si solo hay uno
					this.dialogBox.clearText();														// Borrar texto previo
					this.dialogBox.setTextToDisplay('¡MARIA PITA DESATA TODO SU PODER!');
					this.emitter.once('finishTexting', () => {
						this.player.quelocura(this.enemies, this.enemies[0]);
					});
				}
				break;
		}	
		this.emitter.once('finishTurn', this.checkEnemies, this);
	}

	// Metodo que efectua la accion de los enemigos cada turno
	EnemyTurn(index) {
		if (!index) index = 0;
		// Si el enemigo sigue vivo hace su acción
		if (!levelFailed(this.enemies[index]) && !this.enemies[index].isStuned()) {
			this.dialogBox.clearText();                           // Borrar texto previo
			if (this.enemies.length <= 1) this.dialogBox.setTextToDisplay(this.enemies[index].getName() + ' ataca a Maria Pita'); // Enviar el nuevo texto
			else this.dialogBox.setTextToDisplay(this.enemies[index].getName() + ' (' +  index + ')' +' ataca a Maria Pita');	
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
					else if (index < this.enemies.length) {this.emitter.once('finishTurn', () => {this.EnemyTurn(index)});} 	//Se llama al ataque de los demas enemigos
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
							this.time.delayedCall(2000, () => {
								this.scene.start('GameOverScene', {level: this.level, inventoryBackup: this.inventoryBackup, inventory: this.player.inventory});});
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
	UpdatePlayerEffects() {
		// Si el jugador esta envenenado da feedback
		if (this.player.isBleeding()){
			this.dialogBox.clearText();
			this.dialogBox.setTextToDisplay('Maria Pita pierde vida por el veneno');
			this.emitter.once('finishTexting', () => {
				this.player.updateTurn();
				this.indicator.updateInd("player", "poison", this.player.getPosition(), this.player.getBleedDamage());
				if (levelFailed(this.player)) {
					this.dialogBox.clearText();																	// Borrar texto previo
					this.time.delayedCall(2000, () => {
						this.scene.start('GameOverScene', {level: this.level, inventoryBackup: this.inventoryBackup, inventory: this.player.inventory});});
				}
				else this.emitter.once('finishTurn', () => {this.UpdateEnemyEffects()})});
		}
		else {
			this.player.updateTurn();
			this.UpdateEnemyEffects();
		}
	}

	// Metodo que actualiza los efectos por turnos de los enemigos
	UpdateEnemyEffects(index) {
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
					this.dialogBox.clearText();						// Borrar texto previo
					this.EnableLoot(); 								// Loot
          			this.time.delayedCall(5000, () => {
						this.scene.start('levelMenuScene', {level: this.level, inventory: this.player.inventory});});
				}
				// Si quedan enemigos se actualizan tambien
				if (index > this.enemies.length) this.emitter.once('finishTurn', () => {this.UpdateEnemyEffects(index);})
				// Si no quedan se pasa al siguiente turno
				else this.emitter.once('finishTurn', () => {this.CheckFinalWeapon();});});
		}
		else {
			this.enemies[index].updateTurn();
			index++;
			if (index < this.enemies.length) this.UpdateEnemyEffects(index);
			else this.CheckFinalWeapon();
		}
	}

	// Desactiva y vuelve invisible los botones
	DisableButtons() {
		for(var i=0; i < this.botones.length; i++) {
			this.botones[i].disableInteractive();
			this.botones[i].visible = false;
		}
		this.emptyButton.visible = false;
	}

	// Activa y vuelve visible los botones
	EnableButtons() {
		for (var i=0; i < this.botones.length; i++) {
			if (i === 3 && this.currentQueLocura <= 100) {
				this.emptyButton.visible = true;
			} else {
				this.botones[i].setInteractive();
				this.botones[i].visible = true;
			}
		}
		if (this.player.inventory.getEquipedWeapon().imgID === 'puño') {
			this.botones[3].disableInteractive();
			this.botones[3].visible = false;
		}
		this.keyboardInput.setStartButton(this.botones[0]);
	}

	// Impide seleccionar que locura y pone el contador a cero
	DisableQueLocura(saveCounter = false) {
		this.botones[1].setAdjacents(null, null, this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, null);
		this.botones[3].disableInteractive();
		this.botones[3].visible = false;
		if (!saveCounter) this.currentQueLocura = 0;
		this.UpdateQueLocura(0);
	}

	// Activa que locura y hace posible seleccionarla
	EnableQueLocura() {
		this.botones[1].setAdjacents(null, this.botones[3], this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, this.botones[3]);
		this.botones[3].setInteractive();
	}

	// Aumenta el contador segun el parametro dado y actializa la imagen
	UpdateQueLocura(add) {
		if (this.player.inventory.getEquipedWeapon().imgID != 'puño'){
			this.currentQueLocura += add;
			if (this.currentQueLocura >= 100) {
				this.EnableQueLocura();
			} else {
				this.emptyButton.setCrop(0,0, (this.emptyButton.width / 100) * this.currentQueLocura, this.emptyButton.height);
			}
		}
	}

	// Usa el item si hay, si no, no hace nada
	useItem(item) {
		if (item !== 'none') {
			this.PlayerTurn('object', item);
			if (item.imgID === 'puño')
				this.DisableQueLocura(true);
		}
	}
	DisableEnemy()
	{
		this.enemies.forEach(Element => {
			Element.onPointerOut();
			Element.animator.disableInteractive();

		});
	}
  
	// Comprueba si hay enemigos que matar y pasa al siguiente turno o termina la partida si no quedan emeigos
	checkEnemies(){
		for (var i = 0; i < this.enemies.length; i++){
			if (this.enemies[i].healthController.getCurrentHealth() === 0){
				this.enemies[i].destroy(); 
				this.enemies.splice(i , 1);
			}
		}

		var self = this;
		if (this.enemies.length === 0){
			this.emitter.destroy();
			this.dialogBox.clearText();		// Borrar texto previo				
			this.EnableLoot();				    // Loot
			this.time.delayedCall(3000, () => {
				musicFadeOut();				      // Fadeout de la música
				this.camera.fadeOut(1000, 0, 0, 0); // fadeOut(time, R, G, B), 000 = Black
				this.camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
					this.music.stop();		    // Parar música
					this.scene.start('levelMenuScene', {level: this.level, inventory: this.player.inventory}); // Siguiente nivel
				})
			});
		}
		else {
			if (!levelFailed(this.player)) this.EnemyTurn(); // Evento para que el enemigo ataque	
		}

		// Fadeout de la música
		function musicFadeOut() {
			self.tweens.add({
				targets: self.music,
				volume: -1,
				ease: 'Linear',
				repeat: 0,
				duration: 2000,
			});
		}
	}
	
	// Gestión del loot que se le da al jugador al terminar un nivel
	EnableLoot(){
		this.DisableButtons();
		this.dialogBox.clearText();
		this.dialogBox.setVisible(false);
		this.lootBox.setVisible(true).setAlpha(0.85);

		// Looteo arma
		let randomWeapon = Math.floor(Math.random() * 5);
		let randomSet = Math.floor(Math.random() * 100);
		let weaponImgID; let weaponLoot = false; 

		switch (true){
			case randomSet <= this.level1prob: weaponImgID = weaponsLevel1[randomWeapon]; break;
			case randomSet <= this.level1prob + this.level2prob: weaponImgID = weaponsLevel2[randomWeapon]; break;
			default: weaponImgID = weaponsLevel3[randomWeapon]; break;
		}
		
		// Si no tiene el arma, se la añade al inventario
		if (!this.inventory.weapons[weaponImgID].owned) {
			this.inventory.addWeapon(weaponImgID);
			weaponLoot = true;
		}

		// Looteo comida
		let randomFood = Math.floor(Math.random() * 3);
		let randomQuantity = Math.floor(Math.random() * 3) + 3;
		let foodImgID = listOfItems.healths[randomFood].imgID;
		this.inventory.healths[foodImgID].amount += randomQuantity;

		// Looteo parte visual
		const width = this.scale.width;
		const height = this.scale.height;
		const itemQuantity = this.inventory.healths[foodImgID].amount;
		var text;
		// Si no me ha tocado arma
		if (!weaponLoot) {
			text = '¡Has conseguido ' + listOfItems.healths[randomFood].key + ' !';
			this.add.image(width/2,height/2, foodImgID).setScale(6,6);
		}
		// Si me ha tocado arma
		else {
			text = '¡Has conseguido ' + this.inventory.weapons[weaponImgID].weapon.name + ' y \n' + itemQuantity + ' de ' + listOfItems.healths[randomFood].key + ' !';
			this.add.image(width/3, height/2, weaponImgID).setScale(6,6);
			this.add.image(width/1.5, height/2, foodImgID).setScale(6,6);
			if (itemQuantity > 1) this.add.text(width/1.5 + 20, height/2 + 20, itemQuantity, {}).setScale(3,3);
		}
		
		// Mostrar por texto el loot obtenido
		let lootText = new DialogBox(this, 200, height/2 - 200, 750);
		lootText.setTextToDisplay(text);
		lootText.printText();
	}
	
	// Comprueba si el jugador está contra el jefe final y ejecuta la secuencia de María Pita obteniendo el asta de la bandera de Drake
	CheckFinalWeapon() {
		// Si no se tiene ya el asta
		if (this.player.inventory.getEquipedWeapon().imgID !== 'asta') {
			// Si está Drake en la batalla
			if (this.enemies[0].animator.spritesheet === 'ensignDrake') {
				// Si la vida de Drake es menos de la mitad
				if (this.enemies[0].healthController.getCurrentHealth() < this.enemies[0].healthController.getMaxHealth() / 2) {
					// Poner asta como el arma equipada
					this.player.inventory.setEquipedWeapon('asta');
					
					this.dialogBox.clearText();
					this.dialogBox.setTextToDisplay('Maria Pita ha ido a por Drake y ha robado su bandera.');
					this.emitter.once('finishTexting', () => { 
						this.enemies[0].stealFlag();

						// Menú de recibir loot con el arma final
						this.lootBox.setVisible(true).setAlpha(0.85);
						const width = this.scale.width;
						const height = this.scale.height;
						let lootText = new DialogBox(this, 200, height/2 - 200, 750);
						lootText.setTextToDisplay('Maria Pita ha conseguido un asta de bandera.');
						lootText.printText();
						var item = this.add.image(width/2,height/2, this.player.inventory.getEquipedWeapon().imgID).setScale(6,6);

						this.time.delayedCall(3000,()=>{
							this.lootBox.setVisible(false);
							lootText.setVisible(false);
							item.setVisible(false);

							// Texto diciendo que se ha encontrado el arma
							this.dialogBox.clearText();
							this.dialogBox.setTextToDisplay('Maria Pita se ha equipado el asta de la bandera.');	// Enviar el nuevo texto
							this.emitter.once('finishTexting', () => {
								this.EnableButtons();
							});
						});
					});
				}
				else this.EnableButtons();
			}
			else this.EnableButtons();
		}
		else this.EnableButtons();
	}

	// Inicializa a qué botón te lleva pulsar cada dirección desde otro botón
	inicializeLevelButtonConnections() {
		this.botones[0].setAdjacents(null, this.botones[2], null, this.botones[1]);
		this.botones[1].setAdjacents(null, this.botones[3], this.botones[0], null);
		this.botones[2].setAdjacents(this.botones[0], null, null, this.botones[3]);
		this.botones[3].setAdjacents(this.botones[1], null, this.botones[2], null);
	}
}