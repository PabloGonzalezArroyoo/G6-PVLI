// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';

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

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintar el mapa de fondo
		// var back = this.add.image(0, 0, /*'map'*/).setOrigin(0, 0);

		// Pintar botónes correspondientes a los niveles desbloqueados y hacer sprites interactivos
		// ...

		// vv HACER ESTO PARA TODOS LOS BOTONES vv
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
		

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite
	    //sprite.on('pointerdown', pointer => {
	    	// Marcar botón
	    //});

	    //sprite.on('pointerup', pointer => {
	    	// ajustar para asignar el nivel cargado
			//this.scene.start('battleScene'); //Cambiamos a la escena de combate correspondiente al nivel seleccionado
	    //});

		//sprite.on('pointerover', () => {
			// Destacar botón
	    //});

	    //sprite.on('pointerout', () => {
			// Desdestacar botón
	    //});

		const width = this.scale.width
        const height = this.scale.height

		this.add.text(width * 0.5, height * 0.5, 'Level Menu Scene', {})
        .setOrigin(0.5)

		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('battleScene')
        })
	}
}
