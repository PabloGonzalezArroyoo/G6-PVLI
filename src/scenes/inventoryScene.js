// Importaciones
import Phaser from '../lib/phaser.js';
import { Button } from '../input/button.js';
import Inventory from '../inventory/inventory.js';
import EventDispatcher from '../combat/eventDispatcher.js';
import { KeyboardInput } from '../input/keyboardInput.js';
import DialogBox from '../animations/dialogBox.js';

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
		this.dialogBox;
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
		//this.load.image('alMb', 'assets/scenes/inventory/weapons/alabarda.png');
		//this.load.image('alVrd', 'assets/scenes/inventory/weapons/cimitarraMadera.png');
		//this.load.image('alDem', 'assets/scenes/inventory/weapons/cimitarraAcero.png');
		this.load.image('ropIng', 'assets/scenes/inventory/weapons/roperaInglesa.png');
		this.load.image('ropCst', 'assets/scenes/inventory/weapons/roperaCastellana.png');
		this.load.image('ropAl', 'assets/scenes/inventory/weapons/roperaAlocada.png');
		this.load.image('sacho', 'assets/scenes/inventory/weapons/sacho.png');
		this.load.image('fouc', 'assets/scenes/inventory/weapons/fouciño.png');
		this.load.image('guad', 'assets/scenes/inventory/weapons/guadañaExtravagante.png');
		this.load.image('bolla', 'assets/scenes/inventory/objects/bollaDePan.png');
		this.load.image('caldo', 'assets/scenes/inventory/objects/caldoGallego.png');
		//this.load.image('polbo', 'assets/scenes/inventory/objects/pulpoALaGallega.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.emitter = EventDispatcher.getInstance();


		this.inventory.addWeapon('fouc');


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
		this.equipedWeaponButton = new Button(this, 217, 325, this.inventory.getEquipedWeapon().imgID, 0, 0, 0, this.keyboardInput, function(){}).setScale(8, 8);
		//this.weaponButtons = Array.from(Array(3), () => new Array(5));
		//this.weaponButtons = new Array(3);
		this.weaponButtons = [];
		//this.weaponButtons.forEach(elem => {elem = [];});
		for (let i = 0; i < 5; i++) this.weaponButtons[i] = [];
		console.log(this.weaponButtons);
		let i = 0;
		// ARMAS
		Object.values(armas).forEach(val => {
			let itemID = val.weapon.imgID;

			if(val.owned && itemID != 'puño'){
				let x = val.i * 102 + width / 2 - 35;
				let y = val.j * 60 + 140;/*
				switch (true) {
					case i >= 5 && i < 10: y = 1; break;
					case i >= 10: y = 2; break;
					default: y = 0; break;
				}
				y = y * 60 + 140;*/
				console.log(val.i, val.j);
				this.weaponButtons[val.i][val.j] = new Button(this, x , y, itemID, 0, 0, 0, this.keyboardInput, () => {this.escape(val.weapon)}, ()=>{this.mostrarDescripcion(val.weapon);},/*()=>{this.dialogBox.clearText();console.log("hola");}*/).setScale(1.5,1.5);
				i++;
			}
		});

		i = 0;
		// COMIDA
		Object.values(comida).forEach(val => {
			let itemID = val.item.imgID;
			let itemQuantity = val.amount;
			
			if(itemQuantity){
				let x = val.i * 165 + width / 2; let y = 475;
				new Button(this, x, y, itemID, 0, 0, 0, this.keyboardInput, () => {this.escape(val.item)}, ()=>{this.mostrarDescripcion(val.item);},/*()=>{this.dialogBox.clearText();}*/).setScale(3,3);
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
		this.dialogBox= new DialogBox(this, 70, 620, 850);
	}

	// SALIDA DE LA ESCENA
	escape(item = "none") {
		this.scene.stop('inventoryScene'); 			// Para la escena de inventario
		this.scene.resume(this.previousSceneName, item); 	// Reanuda la escena anterior
	}

	update(t,dt) {
		//console.log(this.game.input.mousePointer.x+" "+this.game.input.mousePointer.y)

	}

	mostrarDescripcion(item) {
			this.dialogBox.clearText();
			this.dialogBox.setTextToDisplay(item.getDesc());
			this.dialogBox.printText();
			console.log(item.getDesc());
	}
}
