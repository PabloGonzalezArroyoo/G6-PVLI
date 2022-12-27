import Phaser from '../lib/phaser.js';
import KeyboardInput from '../input/keyboardInput.js';
import Button from '../input/button.js';
import { Level } from '../levels/level.js';
import { listOfLevels } from '../data/listOfLevels.js';
import EventDispatcher from '../combat/eventDispatcher.js';

// Array con todos los niveles del juego
const levels = [new Level(listOfLevels[0]),
				new Level(listOfLevels[1]), // Nivel 1
				new Level(listOfLevels[2]),			// ... 2
				new Level(listOfLevels[3]),			// 3
				new Level(listOfLevels[4]),			// 4
				new Level(listOfLevels[5]),			// 5
				new Level(listOfLevels[6]),			// 6
				new Level(listOfLevels[7]),			// 7
				new Level(listOfLevels[8]),			// 8
				new Level(listOfLevels[9]),			// 9
				new Level(listOfLevels[10]),			// 10
				new Level(listOfLevels[11])];			// 11
				
				// Desbloquear el primer nivel
				levels[0].setUnlocked();
				
				// Especificar los niveles que se desbloquean tras completar cada nivel
				levels[0].setNextLevels([levels[1]]);
				levels[1].setNextLevels([levels[2]]);
				levels[2].setNextLevels([levels[3], levels[4]]);
				levels[3].setNextLevels(null);
				levels[4].setNextLevels([levels[5], levels[6], levels[7]]);
				levels[5].setNextLevels([null]);
				levels[6].setNextLevels([null]);
				levels[7].setNextLevels([levels[8], levels[9]]);
				levels[8].setNextLevels(null);
				levels[9].setNextLevels([levels[10], levels[11]]);
				levels[10].setNextLevels(null);
				levels[11].setNextLevels(null);

/**
 * Escena de Menú de Niveles.
 * @extends Phaser.Scene
 */
export default class LevelMenuScene extends Phaser.Scene {
	constructor() {
		super({key: 'levelMenuScene'});

		this.inventory;
		this.emitter = EventDispatcher.getInstance();
		window.addEventListener("beforeunload", event => {
			this.saveData();
		});
	}

	init(data) {
		if(typeof(data.level) === 'object') {
			data.level.setCompleted();
		}
		this.inventory = data.inventory;
		this.scene.wake('inventoryScene', {scene: 'levelMenuScene', inventory: this.inventory})
		this.scene.sleep('inventoryScene');
		for(var i=0;i<window.localStorage.length;i++)
		{
			if(window.localStorage.key(i).split("_")[0]==="level"){
				levels[window.localStorage.key(i).split("_")[1]].setCompleted();
			}
		}

	}

	preload() {
		// Fondo
		this.load.spritesheet('waves', 'assets/scenes/levelsMenu/waves_anim.png', { frameWidth: 1024, frameHeight: 768 });
		this.load.image('levelMap', 'assets/scenes/levelsMenu/emptyMap.png');
		
		// Imagen de botones
		this.load.spritesheet('level', 'assets/scenes/levelsMenu/levelsButtons.png', {frameWidth: 51, frameHeight: 51});
		this.load.spritesheet('inventory', 'assets/scenes/levelsMenu/inventoryButtons.png', {frameWidth: 30, frameHeight: 18});

		// Transición
		this.load.spritesheet('fadeOut', 'assets/scenes/transitions/fadeOutLevelsMenuTransition.png', {frameWidth: 1024, frameHeight: 768});

		// Música
		this.load.audio('Travelling to the End of the Sea', ['assets/scenes/levelsMenu/Travelling to the End of the Sea - Vivu.mp3']);
	}

	create() {
		// Variables constantes y se destruyen los eventos anteriores
		const self = this;
		const camera = this.cameras.main;
		this.emitter.destroy();

		// Musica
		const musicConfig = {
			mute: false,
			volume: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		}
		var music = this.sound.add('Travelling to the End of the Sea');
    	music.play(musicConfig);

		// Fade In
		camera.fadeIn(1000, 0, 0, 0);

		// Fondo
		this.anims.create({
			key: 'waves',
			frames: this.anims.generateFrameNumbers('waves', {start: 0, end: 9}),
			frameRate: 12,
			repeat: -1
		});
		this.add.sprite(1024, 768).setOrigin(1,1).play('waves');
		this.add.image(0,0, 'levelMap').setOrigin(0, 0);

		// Input de teclado
		this.keyboardInput = new KeyboardInput(this);

		// Botón de inventario
		this.inventoryButton = new Button(this, 46, 730, 'inventory', 0, 1, 2, this.keyboardInput, () =>{
			music.setVolume(0.4);
			this.scene.sleep('levelMenuScene');							// Parar la escena de menú
			this.scene.wake('inventoryScene', {scene: 'levelMenuScene', inventory: this.inventory}); // Reanudar la escena de inventario
			this.events.on('wake', (scene) => {music.setVolume(1)});	// Evento al volver de la escena de inventario
		}).setScale(3, 3);

		// Para seleccionar botones con teclas, creamos el objeto tecla y un int al que se apunta actualmente
    	let i = 0;
		this.levelButtons = [];
		levels.forEach(level => {
			this.levelButtons[i] = new Button(this, level.x, level.y, level.spriteSheet, level.defaultFrame, level.frameOnOver, level.frameOnDown, this.keyboardInput,
				() => {level.loadLevel(this.inventory)});
      		i++;
		});

		// Inicializar conexiones entre botones y el botón seleccionado por defecto
		this.inicializeLevelButtonConnections();
		this.keyboardInput.setStartButton(this.levelButtons[0]);

		// FadeOut
		this.anims.create({
			key: 'fOut',
			frames: this.anims.generateFrameNumbers('fadeOut', {start: 0, end: 5}),
			frameRate: 17,
			repeat: 0
		});

		// Recoger el envento para cargar el siguiente nivel
		this.emitter.once('levelSelected', (levelData) => {
			musicFadeOut();														// FadeOut de la música
			this.add.sprite(1024, 768, 'fadeOut').setOrigin(1, 1).play('fOut'); // Animación de fadeout
			this.time.delayedCall(1000, () => {									// Esperar un segundo
				music.stop(); 													// Parar música
				this.scene.start('battleScene', levelData);						// Cargar el nivel
			});
            this.emitter.destroy();												// Destruir evento
		});

		// Fadeout de la música
		function musicFadeOut() {
			self.tweens.add({
				targets: music,
				volume: -1,
				ease: 'Linear',
				duration: 2000,
			});
		}
	}

	// Inicializa a qué botón te lleva pulsar cada dirección desde otro botón
	inicializeLevelButtonConnections() {
		this.inventoryButton.setAdjacents(this.levelButtons[11], null, null, this.levelButtons[11]);
		this.levelButtons[0].setAdjacents(null, null, this.levelButtons[1], null);
		this.levelButtons[1].setAdjacents(null, this.levelButtons[2], this.levelButtons[2], this.levelButtons[0]);
		this.levelButtons[2].setAdjacents(this.levelButtons[3], this.levelButtons[4], this.levelButtons[4], this.levelButtons[1]);
		this.levelButtons[3].setAdjacents(null, this.levelButtons[2], null, null);
		this.levelButtons[4].setAdjacents(this.levelButtons[6], this.levelButtons[5], this.levelButtons[7], this.levelButtons[2]);
		this.levelButtons[5].setAdjacents(this.levelButtons[4], null, this.levelButtons[4], null);
		this.levelButtons[6].setAdjacents(null, this.levelButtons[4], null, this.levelButtons[4] );
		this.levelButtons[7].setAdjacents(this.levelButtons[8], this.levelButtons[9], this.levelButtons[9], this.levelButtons[4]);
		this.levelButtons[8].setAdjacents(null, this.levelButtons[7], null, this.levelButtons[7]);
		this.levelButtons[9].setAdjacents(this.levelButtons[7], this.levelButtons[11], this.levelButtons[10], this.levelButtons[7]);
		this.levelButtons[10].setAdjacents(null, this.levelButtons[9], null, this.levelButtons[9]);
		this.levelButtons[11].setAdjacents(this.levelButtons[9], this.inventoryButton, null, this.levelButtons[9]);
	}
	saveData()
	{
		for(var i = 0;i<levels.length;i++)
		{
			if(levels[i].getState()=== 2) window.localStorage.setItem("level_"+i,1);
		}
		for (var prop in this.inventory.weapons) {
			if (Object.prototype.hasOwnProperty.call(this.inventory.weapons, prop)) {
				if(this.inventory.weapons[prop].owned){
					window.localStorage.setItem("weapon_"+prop,1);
				} 
			}
		}
		for (var prop in this.inventory.healths) {
			console.log(this.inventory.healths[prop].amount);
			if (Object.prototype.hasOwnProperty.call(this.inventory.healths, prop)) {
				window.localStorage.setItem("item_"+prop,this.inventory.healths[prop].amount);
			}
		}
	}

}