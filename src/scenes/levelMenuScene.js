// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import Inventory from '../inventory/inventory.js';
import { Level } from '../levels/level.js';
import { DrunkRuffian, StinkyPirate, ScurviedSailor, ExperiencedBuccaneer, AlienatedCosair, EnsignDrake } from '../characters/enemy.js'
import { KeyboardInput } from '../input/keyboardInput.js';
import { Button } from '../input/button.js';
import {listOfItems} from '../data/listOfItemsANTIGUO.js';

// Array con todos los niveles del juego

const levels = [new Level(272, 527.5, [new DrunkRuffian(null, 720, 200)], []), // Nivel 0
				new Level(354, 455.5, [new DrunkRuffian(null, 700, 200), new DrunkRuffian(null, 750, 250)], []), // Nivel 1
				new Level(292, 363.5, [], []),			// ... 2
				new Level(405, 363.5, [], []),			// 3
				new Level(354, 271.5, [], []),			// 4
				new Level(507, 302, [], []),			// 5
				new Level(548, 394.5, [], []),			// 6
				new Level(589, 486.5, [], []),			// 7
				new Level(630, 353.5, [], []),			// 8
				new Level(610, 240.5, [], []),			// 9
				new Level(702, 261, [], []),			// 10
				new Level(814, 261, [], [])];			// 11

				levels[0].setUnlocked();
				
				// Especificar los niveles que se desbloquean tras completar cada nivel
				levels[0].setNextLevels([levels[1]]);
				levels[1].setNextLevels([levels[2], levels[3]]);
				levels[2].setNextLevels(null);
				levels[3].setNextLevels([levels[4], levels[5], levels[6]]);
				levels[4].setNextLevels(null);
				levels[5].setNextLevels(null);
				levels[6].setNextLevels([levels[7], levels[8]]);
				levels[7].setNextLevels(null);
				levels[8].setNextLevels([levels[9], levels[10]]);
				levels[9].setNextLevels(null);
				levels[10].setNextLevels([levels[11]]);
				levels[11].setNextLevels(null);

/**
 * Escena de Menú de Niveles.
 * @extends Phaser.Scene
 */
export default class LevelMenuScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor() {
		super({ key: 'levelMenuScene' });
	}

	/**
	 * Actualizar niveles desbloqueados
	*/
	init(data) {
		if(typeof(data.level) === 'object') {
			data.level.setCompleted();
		}
		if(data.inventory === undefined)
			this.inventory = new Inventory(listOfItems[0],   // Quitar array para el juego final y dejar el constructor por defecto
            [listOfItems[1],
            listOfItems[2],
            listOfItems[5],
            listOfItems[6],
            listOfItems[7],
            listOfItems[8],
            listOfItems[9]]
            );
		else
			this.inventory = data.inventory;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * 		- Imagen del mapa
	 * 		- Botón de nivel seleccionar completado/sin completar
	 */
	preload(){
		// Fondo
		this.load.spritesheet('levelMap', 'assets/scenes/levelsMenu/wavesMap_anim.png', { frameWidth: 1024, frameHeight: 768 });
		
		// Imagen de botones
		this.load.spritesheet('level', 'assets/scenes/levelsMenu/levelsButtons.png', {frameWidth: 51, frameHeight: 51});
		this.load.spritesheet('inventory', 'assets/scenes/levelsMenu/inventoryButtons.png', {frameWidth: 30, frameHeight: 18});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		const self = this;
		const camera = this.cameras.main;

		// Fade In
		camera.fadeIn(1000, 0, 0, 0);

		// Fondo
		this.anims.create({
			key: 'levelMap',
			frames: this.anims.generateFrameNumbers('levelMap', {start: 0, end: 9}),
			frameRate: 10,
			repeat: -1
		});
		this.add.sprite(1024, 768).setOrigin(1,1).play('levelMap');

		this.keyboardInput = new KeyboardInput(this);
		// Botón de inventario
		this.inventoryButton = new Button(this, 46, 730, 'inventory', 0, 1, 2, this.keyboardInput, () =>{
			this.scene.pause('levelMenuScene');
			this.scene.launch('inventoryScene', {scene: 'levelMenuScene', inventory: this.inventory});
		});
		this.inventoryButton.setScale(3, 3);

		// Para seleccionar botones con teclas, creamos el objeto tecla y un int al que se apunta actualmente
    	let i = 0;
		this.levelButtons = [];
		levels.forEach(level => {
			this.levelButtons[i] = new Button(this, level.x, level.y, level.spriteSheet, level.defaultFrame, level.frameOnOver, level.frameOnDown, this.keyboardInput, () => {
				level.loadLevel(this, this.inventory);
			});
      		i++;
		});
		this.inicializeLevelButtonConnections();

		this.keyboardInput.setStartButton(this.levelButtons[0]);
		
		//Ejemplo: Al pulsar la flecha izquierda
		//keys.LEFT.on('down', function () {/*Destaca el boton de la izquierda al actual y desdestaca el actual*/ });
		
		//Ejemplo: Al pulsar el enter
		//Enter.on('down', function () {/*Marca el botón*/ });
		//Enter.on('up', function () {
			//this.scene.start('battleScene'); //Cambiamos a la escena de combate correspondiente al nivel seleccionado
		//});
		//Esc.on('down', function () {
			//this.scene.start('optionsScene');//Se abre el menu de opciones
		//});
    
		const width = this.scale.width;
    	const height = this.scale.height;
	}
	update() {
		this.keyboardInput.processInput();  
	}

	// Inicializa a qué botón te lleva pulsar cada dirección desde otro botón
	inicializeLevelButtonConnections() {
		this.inventoryButton.setAdjacents(this.levelButtons[0], null, null, this.levelButtons[0])
		this.levelButtons[0].setAdjacents(this.levelButtons[1], this.inventoryButton, this.inventoryButton, this.levelButtons[1]);
		this.levelButtons[1].setAdjacents(this.levelButtons[3], this.levelButtons[0], this.levelButtons[2], this.levelButtons[3]);
		this.levelButtons[2].setAdjacents(null, this.levelButtons[1], null, this.levelButtons[1]);
		this.levelButtons[3].setAdjacents(this.levelButtons[5], this.levelButtons[1], this.levelButtons[4], this.levelButtons[6]);
		this.levelButtons[4].setAdjacents(null, this.levelButtons[3], null, this.levelButtons[3]);
		this.levelButtons[5].setAdjacents(null, this.levelButtons[3], this.levelButtons[3], null);
		this.levelButtons[6].setAdjacents(this.levelButtons[8], this.levelButtons[7], this.levelButtons[3], this.levelButtons[8]);
		this.levelButtons[7].setAdjacents(this.levelButtons[6], null, this.levelButtons[6], null);
		this.levelButtons[8].setAdjacents(this.levelButtons[9], this.levelButtons[6], this.levelButtons[6],this.levelButtons[10]);
		this.levelButtons[9].setAdjacents(null, this.levelButtons[8], null, null);
		this.levelButtons[10].setAdjacents(null, this.levelButtons[8], this.levelButtons[8], this.levelButtons[11]);
		this.levelButtons[11].setAdjacents(null, null, this.levelButtons[10], null);
	}
}