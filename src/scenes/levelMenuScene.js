// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Level } from '../level.js';
//import { Scene } from 'phaser';

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
	init(){

	}


	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * 		- Imagen del mapa
	 * 		- Botón de nivel seleccionar completado/sin completar
	 */
	preload(){
		// Fondo
		this.load.image('levelMap', 'assets/Escenas/escenaLevelMenu/mapa.png');
		
		// Imagen de botones
		this.load.spritesheet('level', 'assets/Escenas/escenaLevelMenu/nivel.png', {frameWidth: 51, frameHeight: 51});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintar el mapa de fondo
		var bg = this.add.image(0,0, 'levelMap').setOrigin(0, 0);
		
		// Array con todos los niveles del juego
		const levels = [new Level(this, 272, 527.5, 0, 1, 2, 1, [], []),	// Nivel 0
				new Level(this, 354, 455.5, 0, 0, 0, 0, [], []),			// Nivel 1
				new Level(this, 292, 363.5, 0, 0, 0, 0, [], []),			// ... 2
				new Level(this, 405, 363.5, 0, 0, 0, 0, [], []),			// 3
				new Level(this, 354, 271.5, 0, 0, 0, 0, [], []),			// 4
				new Level(this, 507, 302, 0, 0, 0, 0, [], []),				// 5
				new Level(this, 548, 394.5, 0, 0, 0, 0, [], []),			// 6
				new Level(this, 589, 486.5, 0, 0, 0, 0, [], []),			// 7
				new Level(this, 630, 353.5, 0, 0, 0, 0, [], []),			// 8
				new Level(this, 610, 240.5, 0, 0, 0, 0, [], []),			// 9
				new Level(this, 702, 261, 0, 0, 0, 0, [], []),				// 10
				new Level(this, 814, 261, 0, 0, 0, 0, [], [])];				// 11

		// Especificar los niveles que se desbloquean tras completarlo de cada nivel
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

		//Para seleccionar botones con teclas, creamos el objeto tecla
		//var keys = this.scene.input.keyboard.addKeys('LEFT, UP, RIGHT,DOWN,W,A,S,D');
		//var Esc = this.scene.input.keyboard.addKeys('ESC,X');
		//var Enter = this.scene.input.keyboard.addKeys('ENTER,Z')
		
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
}