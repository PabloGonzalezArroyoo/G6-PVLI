// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Button } from '../button.js';

/**
 * Escena de Inventario.
 * @extends Phaser.Scene
 */
export default class InventoryScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'inventoryScene' });
	}

	/**
	 * Inicializa las variables
	 * - Asignar si es inventario principal o de batalla
	*/
	init(){

	}

	/**
	 * Cargamos todos los assets que vamos a necesitar:
	 * 		- Fondo inventario
	 * 		- Items
	 */
	preload(){
		
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		// var back = this.add.image(0, 0, /*'inventory'*/).setOrigin(0, 0);


		//Pintamos un botón de salir
		// var backButton = new Button(this, 0, 0, 'back', 0, 0, 0, function(){});


	    // Pintar botónes correspondientes a los objetos del inventario y hacer sprites interactivos
		// ...

		//Para seleccionar botones con teclas, creamos el objeto tecla
		//var keys = this.scene.input.keyboard.addKeys('LEFT, UP, RIGHT,DOWN,W,A,S,D');
		//var Esc = this.scene.input.keyboard.addKey('ESC,X');
		//var Enter = this.scene.input.keyboard.addKeys('ENTER,Z')

		//Ejemplo: Al pulsar la flecha izquierda
		//keys.LEFT.on('down', function () {/*Destaca el boton de la izquierda al actual y desdestaca el actual*/ });
		
		//Ejemplo: Al pulsar el enter
		//Enter.on('down', function () {/*Marca el botón*/ });
		//Enter.on('up', function () {
			 /*Se usa el objeto seleccionado*/
		//});
		//Esc.on('down', function () {
			//this.scene.start('optionsScene');//Se abre el menu de opciones
		//});

		const width = this.scale.width;
        const height = this.scale.height;

		this.add.text(width * 0.5, height * 0.5, 'Inventory Scene', {})
        .setOrigin(0.5);

		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('cinematicScene');
        });

	}

	update() {

	}
}
