import Phaser from '../lib/phaser.js';
import KeyboardInput from '../input/keyboardInput.js';
import Button from '../input/button.js';
import DialogBox from '../animations/dialogBox.js';
import EventDispatcher from '../combat/eventDispatcher.js';
import Indicator from '../animations/indicator.js';


/**
 * Escena de Inventario.
 * @extends Phaser.Scene
 */
export default class InventoryScene extends Phaser.Scene {
	constructor() {
		super({ key: 'inventoryScene' });
		this.dialogBox;
		this.previousSceneName;
		this.emitter = EventDispatcher.getInstance();
		this.handleLoot = false;
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

		// Recuadro de selección
		this.load.spritesheet('selected', 'assets/scenes/inventory/selectedItem.png', {frameWidth: 32, frameHeight:32});

		this.load.spritesheet('info', 'assets/scenes/inventory/invInfo.png', {frameWidth: 30, frameHeight: 8});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Loot inicial
		this.inventory.addHealth('bolla');
		
		// Guardar la escena de la que te han despertado y aplicar cambios del inventario
		this.events.on('wake', (scene, data) => {
			this.inventory = data.inventory;
			this.previousSceneName = data.scene;
			this.keyboardInput.changeButton(this.equipedWeaponButton);
			if (this.handleLoot) this.setImagesVisible();
			else this.handleLoot = true;
		});
		
		// Constantes
		const width = this.scale.width;
		const height = this.scale.height;
		
		// Pintamos el fondo
		this.add.image(0,0, 'inventoryBackground').setOrigin(0, 0).setDisplaySize(width, height);

		// SEPARACION ENTRE ARMAS Y COMIDA
		let armas = this.inventory.getWeapons();
		let comida = this.inventory.getHealths();

		// Input
		this.keyboardInput = new KeyboardInput(this);

		// ARMA EQUIPADA
		this.equiped = this.add.image(217, 262, this.inventory.getEquipedWeapon().imgID).setScale(8, 8);
		this.equipedWeaponButton = new Button(this, 217, 262, 'selected', 0, 1, 2, this.keyboardInput,
			() => {
				if (this.inventory.getEquipedWeapon().imgID !== 'puño' && this.inventory.getEquipedWeapon().imgID !== 'asta') { // OnClick
					this.selected(this.inventory.getWeapons()['puño'], "W");
					this.updateUITexts(this.inventory.getWeapons()['puño'].weapon);
				}
			},
			() => {														// OnPointerOver
				this.showDescription(this.inventory.getEquipedWeapon());
				this.indicator.updateInd('inventory', 'inventory', {x: 280, y: 140}, this.inventory.getEquipedWeapon().name);
			},	
			() => {this.resetStatsBox(); this.dialogBox.clearText(); this.indicator.deactivateInd();} // OnPointerOut
		).setScale(8, 8);

		this.weaponButtons = [];
		for (let i = 0; i < 5; i++) this.weaponButtons[i] = [];

		this.weaponsImages = []
		for (let i = 0; i < 5; i++) this.weaponsImages[i] = [];
		let i = 0;
		// ARMAS
		Object.values(armas).forEach(val => {
			let itemID = val.weapon.imgID;

			if(itemID != 'puño' && itemID != 'asta'){
				let x = val.i * 102 + width / 2 - 35;
				let y = val.j * 60 + 140;
				
				this.weaponsImages[val.i][val.j] = this.add.image(x, y, itemID).setScale(1.5,1.5);
				if (!val.owned) this.weaponsImages[val.i][val.j].setVisible(false);
				this.weaponButtons[val.i][val.j] = new Button(this, x , y, 'selected', 0, 1, 2, this.keyboardInput,
					() => {this.selected(val, "W")},							// OnClick
					() => {if (val.owned) {										// OnPointerOver
						this.showDescription(val.weapon);
						this.updateUITexts(val.weapon);
						this.indicator.updateInd('inventory', 'inventory', {x: x, y: y}, val.weapon.name);
					}}, 
					() => {this.resetStatsBox(); this.dialogBox.clearText(); this.indicator.deactivateInd();} // OnPointerOut
				).setScale(1.5,1.5);
				i++;
			}
		});

		this.foodButtons = [];
		this.foodImages = [];
		this.foodTexts = [];

		i = 0;
		// COMIDA
		Object.values(comida).forEach(val => {
			let itemID = val.item.imgID;
			let itemQuantity = val.amount;
			
			let x = val.i * 165 + width / 2; let y = 475;
			this.foodImages[val.i] = this.add.image(x, y, itemID).setScale(3, 3);
			if (!val.amount) this.foodImages[val.i].setVisible(false);
			this.foodButtons[val.i] = new Button(this, x, y, 'selected', 0, 1, 2, this.keyboardInput,
				() => {if (val.amount) this.selected(val.item, "H", val.i)},   				// OnClick
				() => {if (val.amount) { 													// OnPointerOver
					this.showDescription(val.item); 
					this.updateUITexts(val);
					this.indicator.updateInd('inventory', 'inventory', {x: x, y: y}, val.item.name);
				}}, 
				() => {this.resetStatsBox(); this.dialogBox.clearText(); this.indicator.deactivateInd();} // OnPointerOut
			).setScale(3,3); 
			this.foodTexts[val.i] = this.add.text(x + 5, y + 5, itemQuantity, {fontFamily: 'Silkscreen', fontSize: 40});
			if (!val.amount) this.foodTexts[val.i].setVisible(false);
			i++;
		});

		// Pintamos botón de salir
		this.inventoryButton = new Button(this, width - 56, 43, 'inventory', 2, 0, 1, this.keyboardInput, () => {this.escape()}).setScale(3, 3);
		this.keyboardInput.setStartButton(this.equipedWeaponButton);
		this.inicializeButtonConnections()
		
		// Al pulsar la tecla ESC se sale de la escena de inventario
		this.input.keyboard.once('keydown-ESC', () => { this.escape(); });
		this.dialogBox = new DialogBox(this, 80, 620, 850).setColor('#65583c');

		// Texto de daño, defensa de armas e items de curación
		this.atcBox = this.add.text(110, 470, this.inventory.getEquipedWeapon().getAttack(), {fontFamily: 'Silkscreen', fontSize: 50, color: '#65583c'});
		this.defBox = this.add.text(270, 470, this.inventory.getEquipedWeapon().getDefense(), {fontFamily: 'Silkscreen', fontSize: 50, color: '#65583c'});
		this.healthBox = this.add.text(820, 320, "", {fontFamily: 'Silkscreen', fontSize: 30, color: '#248a00'});

		// Indicador para el nombre de las armas
		this.indicator = new Indicator(this, 0, 0, 'info');
	}

	// SALIDA DE LA ESCENA
	escape(item = "none") {
		this.scene.sleep('inventoryScene'); 						// Para la escena de inventario
		this.scene.wake(this.previousSceneName, item); 				// Reanuda la escena anterior
	}
  
	// Muestra la descripción de los objetos borrando el texto anterior y añadiendo el nuevo
	showDescription(item) {
		this.dialogBox.clearText();
		this.dialogBox.setTextToDisplay(item.getDesc());
		this.dialogBox.printText();
	}

	// Gestiona si, al elegirse un arma o un objeto curativo, debe volver a la escena anterior haciendo el cambio en esa escena (battleScene)
	// o si debe mantenerse en la escena de inventario haciendo el cambio aquí (levelMenuScene)
	selected(val, type, index = 0) {
		 // ARMA
		if (type === "W") {
			if (val.owned && this.inventory.getEquipedWeapon().imgID !== val.weapon.imgID && this.inventory.getEquipedWeapon().imgID !== 'asta') {
				// Cambiar imagen al haber elegido un arma	
				this.equiped.setTexture(val.weapon.imgID);
				
				// Salir en battleScene o mantenerse en el resto y aplicar cambios
				if (this.previousSceneName === 'battleScene') this.escape(val.weapon);
				else this.inventory.setEquipedWeapon(val.weapon.imgID);
			}
		}

		// CURACIÓN
		else {
			// Usar el objeto curativo
			if (this.previousSceneName === 'battleScene') {
				// Comprobar si hay en el inventario
				if (this.inventory.healths[val.imgID].amount > 0) {	
					// Eliminar del inventario
					this.inventory.substractHealth(val.imgID);
					
					// Si el valor al reducir el tamaño es 0, borrar imagen y texto
					if (this.inventory.healths[val.imgID].amount < 1) {
						this.foodImages[index].setVisible(false);
						this.foodTexts[index].setText("");
					}
					// Si no, solo cambiamos el texto a la nueva cantidad
					else this.foodTexts[index].setText(this.inventory.healths[val.imgID].amount);
					
					this.inventory.addHealth(val.imgID);

					this.escape(val);
				}
			}
			else {
				// Evitar que el jugador use el obejto fuera de la escena de batalla
				this.dialogBox.setTextToDisplay("Mejor no comas ahora, te será más útil en batalla");
				this.dialogBox.printText();
			};
		}
	}

	// Actualiza el texto de ataque y defensa del arma equipada para mostar la diferencia, o añade el texto de un item curativo
	updateUITexts(item) {
		// ARMA
		if (item.type === "WEAPON") {
			var actual = this.inventory.getEquipedWeapon();
			var weapon = item;

			// Ataque
			if (weapon.getAttack() > actual.getAttack()) this.atcBox.setColor('#248a00');
			else if (weapon.getAttack() < actual.getAttack()) this.atcBox.setColor('#e63d00');

			// Defensa
			if (weapon.getDefense() > actual.getDefense()) this.defBox.setColor('#248a00');
			else if (weapon.getDefense() < actual.getDefense()) this.defBox.setColor('#e63d00');

			// Actualizar texto con el nuevo arma
			this.atcBox.setText(weapon.getAttack());
			this.defBox.setText(weapon.getDefense());
		}

		// CURACIÓN
		else this.healthBox.setText("+" + item.item.getHealthValue());
	}

	// Devuelve el texto de ataque, defensa y curación a su estado inicial
	resetStatsBox() {
		this.atcBox.setText(this.inventory.getEquipedWeapon().getAttack());
		this.atcBox.setColor('#65583c');
		this.defBox.setText(this.inventory.getEquipedWeapon().getDefense());
		this.defBox.setColor('#65583c');
		this.healthBox.setText("");
	}

	// Recorre los arrays de las imágenes de armas y comida para, tras leer el estado del inventario recibido al despertar la escena
	// (si el jugador tiene un arma [owned] o si tiene comida [amount > 0]), poner las imágenes y el texto correctamente
	setImagesVisible() {
		for (let i = 0; i < 3; i++) {
			// Armas
			for (let j = 0; j < 5; j++) {
				var armas = this.inventory.getWeapons();
				if (armas[this.weaponsImages[j][i].texture.key].owned) {
					this.weaponsImages[j][i].setVisible(true);
				}
			}

			// Comida
			let comida = this.inventory.getHealths();
			if (comida[this.foodImages[i].texture.key].amount > 0) {
				this.foodImages[i].setVisible(true);
				this.foodTexts[i].setText(comida[this.foodImages[i].texture.key].amount);
				this.foodTexts[i].setVisible(true);
			}
		}

		// Arma equipada
		if (armas['asta'].owned) {
			this.equiped.destroy();
			this.equiped = this.add.sprite(217, 262, 'asta').setScale(8, 8);
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
