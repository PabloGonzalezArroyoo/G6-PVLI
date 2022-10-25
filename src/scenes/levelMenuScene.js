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
		this. levels = [new Level(this, 272, 527.5, 'level', 0, 1, 2, 1, 0, 0),		// Nivel 0
				new Level(this, 354, 455.5, 'level',  0, 0, 0, 0, 0, 0),			// Nivel 1
				new Level(this, 292, 363.5, 'level',  0, 0, 0, 0, 0, 0),			// ... 2
				new Level(this, 405, 363.5, 'level',  0, 0, 0, 0, 0, 0),			// 3
				new Level(this, 354, 271.5, 'level',  0, 0, 0, 0, 0, 0),			// 4
				new Level(this, 507, 302, 'level',  0, 0, 0, 0, 0, 0),				// 5
				new Level(this, 548, 394.5, 'level',  0, 0, 0, 0, 0, 0),			// 6
				new Level(this, 589, 486.5, 'level',  0, 0, 0, 0, 0, 0),			// 7
				new Level(this, 630, 353.5, 'level', 0, 0, 0, 0, 0, 0),				// 8
				new Level(this, 610, 240.5, 'level', 0, 0, 0, 0, 0, 0),				// 9
				new Level(this, 702, 261, 'level', 0, 0, 0, 0, 0, 0),				// 10
				new Level(this, 814, 261, 'level',  0, 0, 0, 0, 0, 0)];				// 11

		// Especificar los niveles que se desbloquean tras completarlo de cada nivel
		this.levels[0].setNextLevels([this.levels[1]]);
		this.levels[1].setNextLevels([this.levels[2], this.levels[3]]);
		this.levels[2].setNextLevels(null);
		this.levels[3].setNextLevels([this.levels[4], this.levels[5], this.levels[6]]);
		this.levels[4].setNextLevels(null);
		this.levels[5].setNextLevels(null);
		this.levels[6].setNextLevels([this.levels[7], this.levels[8]]);
		this.levels[7].setNextLevels(null);
		this.levels[8].setNextLevels([this.levels[9], this.levels[10]]);
		this.levels[9].setNextLevels(null);
		this.levels[10].setNextLevels([this.levels[11]]);
		this.levels[11].setNextLevels(null);

		//Para seleccionar botones con teclas, creamos el objeto tecla y un int al que se apunta actualmente
		this.beingUsed=0;
	    this.inputTeclas=false;
	    this.flechas = this.input.keyboard.addKeys('left, right, enter');

		
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
		if(Phaser.Input.Keyboard.JustDown(this.flechas.left)&& this.beingUsed-1>=0)
		{
			this.inputTeclas=true;
			this.levels[this.beingUsed].onPointerOut();
			this.beingUsed-=1;
			this.levels[this.beingUsed].onOver();
			console.log('funciona izquierda');
		}
		
		else if(Phaser.Input.Keyboard.JustDown(this.flechas.right)&&this.beingUsed+1<this.levels.length)
		{
			this.inputTeclas=true;
			this.levels[this.beingUsed].onPointerOut();
			this.beingUsed+=1;
			this.levels[this.beingUsed].onOver();
			console.log('funciona derecha');
		}
		else if(this.flechas.enter.isDown)
		{
			this.levels[this.beingUsed].onReleaseClick();
			console.log('Funciona enter');
		}
		//Cuando se mueva el raton, todo lo hecho por teclas se deshace (no funciona)
		/*if(inputTeclas===true && (game.input.mousePointer.x!=lastMousePositionX||game.input.mousePointer.y!=lastMousePositionY))
		{
			inputTeclas=false;
			for(var i=0;i<4;i++)
			{
				botones[i].OnPointerOut();
			}
		}*/
		console.log(this.beingUsed);
	}
}