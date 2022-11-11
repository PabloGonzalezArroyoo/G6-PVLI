// Importaciones
import Phaser from '../lib/phaser.js';
import { Button } from '../button.js';
import Inventory from '../inventory.js';

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
		
		this.inventory = new Inventory();
	}

	/**
	 * Inicializa las variables
	 * - Asignar si es inventario principal o de batalla
	*/
	init(previousSceneName){
		this.previousSceneName = previousSceneName;
	}

	preload(){
		// Fondo
		this.load.image('inventoryBackground', 'assets/scenes/inventory/inventoryBackground.png');
		// Items
		this.load.image('cimitarraMadera', 'assets/scenes/inventory/weapons/cimitarraMadera.png');
		this.load.image('cimitarraAcero', 'assets/scenes/inventory/weapons/cimitarraAcero.png');
		this.load.image('cimitarraLoca', 'assets/scenes/inventory/weapons/cimitarraLoca.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Constantes
		const width = this.scale.width;
		const height = this.scale.height;
		const self = this;
		
		// Pintamos el fondo
		let bg = this.add.image(0,0, 'inventoryBackground').setOrigin(0, 0).setDisplaySize(width, height);

	    // Pintar botones correspondientes a los objetos del inventario y hacer sprites interactivos
		// ESTO ES UNA PRUEBA DE AÑADO DE OBJETOS EN EL INVENTARIO PARA QUE SE VEAN
		// ARMAS
		this.inventory.addItem(1);
		this.inventory.addItem(2);
		this.inventory.addItem(3);
		// OBJETOS
		this.inventory.addItem(4);
		this.inventory.addItem(5);
		this.inventory.addItem(6);
		this.inventory.addItem(7);
		this.inventory.addItem(8);
		this.inventory.addItem(9);
		this.inventory.addItem(10);
		this.inventory.addItem(11);
		// COMIDA
		this.inventory.addItem(12);
		this.inventory.addItem(13);
		this.inventory.addItem(14);
		this.inventory.addItem(15);

		// SEPARACION ENTRE ARMAS/OBJETOS Y COMIDA
		let inventoryItems = this.inventory.getItems();
		let armasYobjetos = [];
		let comida = [];
		for (let i = 0; i < inventoryItems.length; i++) {
			if (inventoryItems[i].getType() === 'Arma' || inventoryItems[i].getType() === 'Objeto') {
				armasYobjetos.push(inventoryItems[i]);
			}
			else if (inventoryItems[i].getType() === 'Comida') {
				comida.push(inventoryItems[i]);
			}
		}

		// ARMAS Y OBJETOS
		for (let i = 0; i < armasYobjetos.length; i++) {
			let itemID = armasYobjetos[i].imgID;
			let x = i % 5;
			let y;
			switch (true) {
				case i >= 5 && i < 10: y = 1; break;
				case i >= 10: y = 2; break;
				default: y = 0; break;
			}
			this.add.image(x * 105 + width / 2 - 45, y * 60 + 140, itemID);
		}

		// COMIDA
		for (let i = 0; i < comida.length; i++) {
			let itemID = comida[i].imgID;
			this.add.image(i * 165 + width / 2, 475, itemID).setScale(3,3);
		}

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

		// SALIDA DE LA ESCENA
		function escape() {
			self.scene.stop('inventoryScene'); 			// Para la escena de inventario
			self.scene.resume(self.previousSceneName); 	// Reanuda la escena anterior
		}

		// Pintamos botón de salir
		var inventoryButton = new Button(this, width - 50, 46, 'inventory', 2, 0, 1, escape, function(){});
		inventoryButton.setScale(3, 3);

		// Al pulsar la tecla T se sale de la escena de inventario
		this.input.keyboard.once('keydown-T', () => { escape(); });
	}

	update() {
	}
}
