// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import Inventory from '../inventory.js';
import { Level } from '../level.js';
import { DrunkRuffian, StinkyPirate, ScurviedSailor, ExperiencedBuccaneer, AlienatedCosair, EnsignDrake } from '../enemy.js'
import { keyboard } from '../keyboardInput.js';
import { Button } from '../button.js';
import Player from '../player.js';
import {listOfItems} from '../listOfItems.js';

// Array con todos los niveles del juego
const levels = [new Level(null, 272, 527.5, 1, [new DrunkRuffian(null, 720, 200)], [], function(){}), // Nivel 0
				new Level(null, 354, 455.5, 0, [new DrunkRuffian(null, 680, 200), new DrunkRuffian(null, 780, 250)], [], function(){}), // Nivel 1
				new Level(null, 292, 363.5, 0, [], [], function(){}),			// ... 2
				new Level(null, 405, 363.5, 0, [], [], function(){}),			// 3
				new Level(null, 354, 271.5, 0, [], [], function(){}),			// 4
				new Level(null, 507, 302, 0, [], [], function(){}),				// 5
				new Level(null, 548, 394.5, 0, [], [], function(){}),			// 6
				new Level(null, 589, 486.5, 0, [], [], function(){}),			// 7
				new Level(null, 630, 353.5, 0, [], [], function(){}),			// 8
				new Level(null, 610, 240.5, 0, [], [], function(){}),			// 9
				new Level(null, 702, 261, 0, [], [], function(){}),				// 10
				new Level(null, 814, 261, 0, [], [], function(){})];			// 11

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

		// Botón de inventario
		var inventoryButton = new Button(this, 46, 730, 'inventory', 0, 2, 1, function(){self.scene.pause('levelMenuScene');self.scene.launch('inventoryScene', 'levelMenuScene')}, function(){}).setScale(3, 3);

		// Teclado
		this._keyboard = new keyboard(this);

		// Para seleccionar botones con teclas, creamos el objeto tecla y un int al que se apunta actualmente
    	let i = 0;
		var buttons = [];
		levels.forEach(level => {
			level.setScene(this, self.inventory, function(){self._keyboard.setBeingUsed(i)});
			buttons[i] = level.button;
      		i++;
		});
		this._keyboard.loadButtonArray(buttons);
		
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
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);
	}

	update() {
		this._keyboard.processInput();  
	}
}