// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Level } from '../level.js';
import { DrunkRuffian, StinkyPirate, ScurviedSailor, ExperiencedBuccaneer, AlienatedCosair, EnsignDrake } from '../enemy.js'
import { keyboard } from '../keyboardInput.js';
import { Button } from '../button.js';

// Array con todos los niveles del juego
const levels = [new Level(null, 272, 527.5, 1, [new DrunkRuffian(null, 720, 200)], [], function(){}), // Nivel 0
				new Level(null, 354, 455.5, 0, [new DrunkRuffian(null, 700, 200), new DrunkRuffian(null, 750, 250)], [], function(){}), // Nivel 1
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
	init(level) {
		if(typeof(level) === 'object') {
			level.setCompleted();
		}
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * 		- Imagen del mapa
	 * 		- Botón de nivel seleccionar completado/sin completar
	 */
	preload(){
		// Fondo
		this.load.image('levelMap', 'assets/scenes/levelsMenu/emptyMap.png');
		
		// Imagen de botones
		this.load.spritesheet('level', 'assets/scenes/levelsMenu/levelsButtons.png', {frameWidth: 51, frameHeight: 51});
		this.load.spritesheet('inventory', 'assets/scenes/levelsMenu/inventoryButtons.png', {frameWidth: 30, frameHeight: 18});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintar el mapa de fondo
		var bg = this.add.image(0,0, 'levelMap').setOrigin(0, 0);

		// Botón de inventario
		var self = this;
		var inventoryButton = new Button(this, 46, 730, 'inventory', 0, 1, 2, function(){self.scene.start('inventoryScene', -1)}, function(){});
		inventoryButton.setScale(3, 3);

		this._keyboard = new keyboard(this);

		// Para seleccionar botones con teclas, creamos el objeto tecla y un int al que se apunta actualmente
		var self=this;
    	let i = 0;
		var buttons = [];
		levels.forEach(level => {
			level.setScene(this, function(){self._keyboard.setBeingUsed(i)});
			buttons[i] = level.button;
      		i++;
		});
		//console.log(this.buttons);
		
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

		const width = this.scale.width;
        const height = this.scale.height;
		 
		// this.add.text(width * 0.5, height * 0.5, 'Level Menu Scene', {})
        // .setOrigin(0.5);
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('battleScene');
        });
	}
	update() {
		this._keyboard.processInput();  
	}
}