// Importaciones
import Phaser from '../lib/phaser.js';
import { Button } from '../input/button.js';
import Inventory from '../inventory/inventory.js';
import EventDispatcher from '../combat/eventDispatcher.js';
import { KeyboardInput } from '../input/keyboardInput.js';

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
	init(data){
		this.previousSceneName = data.scene;
		this.inventory = data.inventory;
	}

	preload(){
		// Fondo
		this.load.image('inventoryBackground', 'assets/scenes/inventory/inventoryBackground.png');
		// Items
		this.load.image('puño', 'assets/scenes/inventory/weapons/puño.png');
		this.load.image('cimMad', 'assets/scenes/inventory/weapons/cimitarraMadera.png');
		this.load.image('cimAc', 'assets/scenes/inventory/weapons/cimitarraAcero.png');
		this.load.image('cimLoc', 'assets/scenes/inventory/weapons/cimitarraLoca.png');
		this.load.image('dagOx', 'assets/scenes/inventory/weapons/dagaOxidada.png');
		this.load.image('dagAf', 'assets/scenes/inventory/weapons/dagaAfilada.png');
		this.load.image('dagEx', 'assets/scenes/inventory/weapons/dagaExcéntrica.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.emitter = EventDispatcher.getInstance();

		// Constantes
		const width = this.scale.width;
		const height = this.scale.height;
		const self = this;
		
		// Pintamos el fondo
		let bg = this.add.image(0,0, 'inventoryBackground').setOrigin(0, 0).setDisplaySize(width, height);

		// SEPARACION ENTRE ARMAS Y COMIDA
		let armas = this.inventory.getWeapons();
		let comida = this.inventory.getHealths();

		this.keyboardInput = new KeyboardInput(this);

		// ARMA EQUIPADA
		new Button(this, 217, 325, this.inventory.getEquipedWeapon().imgID, 0, 0, 0, this.keyboardInput, function(){}).setScale(8, 8);

		let i = 0;
		// ARMAS
		Object.values(armas).forEach(val => {
			let itemID = val.weapon.imgID;

			if(val.owned){
				let x = i % 5 * 102 + width / 2 - 35;
				let y;
				switch (true) {
					case i >= 5 && i < 10: y = 1; break;
					case i >= 10: y = 2; break;
					default: y = 0; break;
				}
				y = y * 60 + 140;

				new Button(this, x , y, itemID, 0, 0, 0, this.keyboardInput, () => {this.escape(val.weapon)}, this.mostrarDescripcion).setScale(1.5,1.5);
				i++;
			}
		});

		i = 0;
		// COMIDA
		Object.values(comida).forEach(val => {
			let itemID = val.item.imgID;
			let itemQuantity = val.amount;
			
			if(itemQuantity > 0){
				let x = i * 165 + width / 2; let y = 475;
				new Button(this, x, y, itemID, 0, 0, 0, this.keyboardInput, () => {this.escape(val.item)}, this.mostrarDescripcion).setScale(3,3);
				if (itemQuantity > 1) this.add.text(x + 5, y + 5, itemQuantity, {}).setScale(3,3);
				i++;
			}
		});

		// TECLAS
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

		// Pintamos botón de salir
		var inventoryButton = new Button(this, width - 50, 46, 'inventory', 2, 0, 1, this.keyboardInput, () => {this.escape()}).setScale(3, 3);
		this.keyboardInput.setStartButton(inventoryButton);
		// Al pulsar la tecla T se sale de la escena de inventario
		this.input.keyboard.once('keydown-T', () => { this.escape(); });
	}

	// SALIDA DE LA ESCENA
	escape(item = "none") {
		this.scene.stop('inventoryScene'); 			// Para la escena de inventario
		this.scene.resume(this.previousSceneName, item); 	// Reanuda la escena anterior
	}

	update() {
	}

	mostrarDescripcion() {
		// ACCION PARA MOSTRAR LA DESCRIPCION DEL ITEM
		console.log("MOSTRAR DESCRIPCION");
	}
}
