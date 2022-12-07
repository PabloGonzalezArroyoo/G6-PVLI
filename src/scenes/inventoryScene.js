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
		this.previousSceneName;
	}

	/**
	 * Inicializa las variables
	 * - Asignar si es inventario principal o de batalla
	*/
	init(data) {
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
		this.load.image('alMb', 'assets/scenes/inventory/weapons/alabardaDeMentira.png');
		this.load.image('alVrd', 'assets/scenes/inventory/weapons/alabardaDeVerdad.png');
		this.load.image('alDem', 'assets/scenes/inventory/weapons/alabardaDemencial.png');
		this.load.image('ropIng', 'assets/scenes/inventory/weapons/roperaInglesa.png');
		this.load.image('ropCst', 'assets/scenes/inventory/weapons/roperaCastellana.png');
		this.load.image('ropAl', 'assets/scenes/inventory/weapons/roperaAlocada.png');
		this.load.image('sacho', 'assets/scenes/inventory/weapons/sacho.png');
		this.load.image('fouc', 'assets/scenes/inventory/weapons/fouciño.png');
		this.load.image('guad', 'assets/scenes/inventory/weapons/guadañaExtravagante.png');
		this.load.image('bolla', 'assets/scenes/inventory/objects/bollaDePan.png');
		this.load.image('caldo', 'assets/scenes/inventory/objects/caldoGallego.png');
		this.load.image('polbo', 'assets/scenes/inventory/objects/pulpoALaGallega.png');
		this.load.image('asta', 'assets/scenes/inventory/weapons/astaBandera.png');
		this.load.spritesheet('selected', 'assets/scenes/inventory/selectedItem.png', {frameWidth: 32, frameHeight:32});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		this.emitter = EventDispatcher.getInstance();

		// BORRAR ESTAS LÍNEAS PARA EL JUEGO FINAL
		this.inventory.addWeapon('fouc');
		this.inventory.addWeapon('dagEx');
		this.inventory.addHealth('polbo');

		// Guardar la escena de la que te han despertado
		this.events.on('wake', (scene, prev) => {this.previousSceneName = prev});
		
		// Constantes
		const width = this.scale.width;
		const height = this.scale.height;
		
		// Pintamos el fondo
		this.add.image(0,0, 'inventoryBackground').setOrigin(0, 0).setDisplaySize(width, height);

		// SEPARACION ENTRE ARMAS Y COMIDA
		let armas = this.inventory.getWeapons();
		let comida = this.inventory.getHealths();

		this.keyboardInput = new KeyboardInput(this);

		// ARMA EQUIPADA
		this.equiped = this.add.image(217, 325, this.inventory.getEquipedWeapon().imgID).setScale(8, 8);
		this.equipedWeaponButton = new Button(this, 217, 325, 'selected', 0, 1, 2, 
			this.keyboardInput, () => {
				if (this.inventory.getEquipedWeapon().imgID !== 'puño' && this.inventory.getEquipedWeapon().imgID !== 'asta')
				this.selected(this.inventory.getWeapons()['puño'], "W")},
			() => {this.mostrarDescripcion(this.inventory.getEquipedWeapon())}
		).setScale(8, 8);

		this.weaponButtons = [];
		for (let i = 0; i < 5; i++) this.weaponButtons[i] = [];

		let i = 0;
		// ARMAS
		Object.values(armas).forEach(val => {
			let itemID = val.weapon.imgID;

			if(itemID != 'puño' && itemID != 'asta'){
				let x = val.i * 102 + width / 2 - 35;
				let y = val.j * 60 + 140;/*
				switch (true) {
					case i >= 5 && i < 10: y = 1; break;
					case i >= 10: y = 2; break;
					default: y = 0; break;
				}
				y = y * 60 + 140;*/
				if (val.owned) this.add.image(x, y, itemID).setScale(1.5,1.5);
				this.weaponButtons[val.i][val.j] = new Button(this, x , y, 'selected', 0, 1, 2, this.keyboardInput,
					() => {this.selected(val, "W")},
					()=>{if (val.owned) this.mostrarDescripcion(val.weapon);}).setScale(1.5,1.5);
				i++;
			}
		});

		this.foodButtons = [];

		i = 0;
		// COMIDA
		Object.values(comida).forEach(val => {
			let itemID = val.item.imgID;
			let itemQuantity = val.amount;
			
			let x = val.i * 165 + width / 2; let y = 475;
			if (val.amount) this.add.image(x, y, itemID).setScale(3, 3);
			this.foodButtons[val.i] = new Button(this, x, y, 'selected', 0, 1, 2, this.keyboardInput,
				() => {if (val.amount) this.selected(val.item, "H")},
				() => {if (val.amount) this.mostrarDescripcion(val.item);}).setScale(3,3);
			if (itemQuantity > 1) this.add.text(x + 5, y + 5, itemQuantity, {}).setScale(3,3);
			i++;
		});

		// Pintamos botón de salir
		this.inventoryButton = new Button(this, width - 50, 46, 'inventory', 2, 0, 1, this.keyboardInput, () => {this.escape()}).setScale(3, 3);
		this.keyboardInput.setStartButton(this.equipedWeaponButton);
		this.inicializeButtonConnections()
		
		// Al pulsar la tecla ESC se sale de la escena de inventario
		this.input.keyboard.once('keydown-ESC', () => { this.escape(); });
		this.dialogBox = new DialogBox(this, 70, 620, 850).setColor('99582A');
	}

	// SALIDA DE LA ESCENA
	escape(item = "none") {
		this.scene.sleep('inventoryScene'); 						// Para la escena de inventario
		this.scene.wake(this.previousSceneName, item); 				// Reanuda la escena anterior
	}

	update(t,dt) {
		this.keyboardInput.processInput();
	}

	// Muestra la descripción de los objetos borrando el texto anterior y añadiendo el nuevo
	mostrarDescripcion(item) {
			this.dialogBox.clearText();
			this.dialogBox.setTextToDisplay(item.getDesc());
			this.dialogBox.printText();
	}

	// Gestiona si, al elegirse un arma, debe volver a la escena anterior haciendo el cambio en esa escena (battleScene) o si debe mantenerse 
	// en la escena de inventario haciendo el cambio aquí (levelMenuScene)
	selected(val, type) {
		if (type === "W") {
			if (val.owned && this.inventory.getEquipedWeapon().imgID !== val.weapon.imgID && this.inventory.getEquipedWeapon().imgID !== 'asta') {
				// Cambiar imagen al haber elegido un arma	
				this.equiped.setTexture(val.weapon.imgID);
				
				// Salir en battleScene o mantenerse en el resto y aplicar cambios
				if (this.previousSceneName === 'battleScene') this.escape(val.weapon);
				else this.inventory.setEquipedWeapon(val.weapon.imgID);
			}
		}
		else {
			// Usar el objeto curativo
			if (this.previousSceneName === 'battleScene') this.escape(val);
			else {
				// Evitar que el jugador use el obejto fuera de la escena de batalla
				this.dialogBox.setTextToDisplay("Mejor no uses el/la " + val.name + " ahora, te será más útil en batalla");
				this.dialogBox.printText();
			};
		}
		
	}

	// Inicializar conexiones de los botones para el input por teclado
	inicializeButtonConnections(){
		// Salir
		this.inventoryButton.setAdjacents(null, this.weaponButtons[4][0], this.weaponButtons[4][0], null);
		// Armas
		this.equipedWeaponButton.setAdjacents(null, null, null, this.weaponButtons[0][0]);
		for (let i = 0; i < 3; i++) this.weaponButtons[0][i].setAdjacents(this.weaponButtons[0][i-1], this.weaponButtons[0][i+1], this.equipedWeaponButton, this.weaponButtons[1][i]);
		for (let i = 0; i < 3; i++)
			for (let j = 1; j < 4; j++)
				this.weaponButtons[j][i].setAdjacents(this.weaponButtons[j][i-1], this.weaponButtons[j][i+1], this.weaponButtons[j - 1][i], this.weaponButtons[j + 1][i]);
		for (let i = 0; i < 3; i++) this.weaponButtons[4][i].setAdjacents(this.weaponButtons[4][i-1], this.weaponButtons[4][i+1], this.weaponButtons[3][i], null);
		this.weaponButtons[4][0].setAdjacent(this.inventoryButton, 'up');
		this.weaponButtons[4][0].setAdjacent(this.inventoryButton, 'right');
		for (let i = 0; i < 5; i++) this.weaponButtons[i][2].setAdjacent(this.foodButtons[Math.floor(i/2)], 'down');
		// Comida
		this.foodButtons[0].setAdjacents(this.weaponButtons[0][2], null, this.equipedWeaponButton, this.foodButtons[1]);
		this.foodButtons[1].setAdjacents(this.weaponButtons[2][2], null, this.foodButtons[0], this.foodButtons[2]);
		this.foodButtons[2].setAdjacents(this.weaponButtons[4][2], null, this.foodButtons[1], null);
	}
}
