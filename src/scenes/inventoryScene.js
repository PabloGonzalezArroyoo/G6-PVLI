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
		this.buttons = [];
	}

	/**
	 * Inicializa las variables
	 * - Asignar si es inventario principal o de batalla
	*/
	init(data) {
		this.inventory = data.inventory;
		this.previousSceneName = data.scene;
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
		this.load.spritesheet('selected', 'assets/scenes/inventory/selectedItem.png', {frameWidth: 32, frameHeight: 32});

		// Recuadro de nombre de las armas
		this.load.image('info', 'assets/scenes/inventory/invInfo.png');

		// Recuadro y botón info de qué locuras
		this.load.spritesheet('infoButton', 'assets/scenes/inventory/infoButton.png', {frameWidth: 12, frameHeight: 12});
		this.load.spritesheet('closeButton', 'assets/scenes/inventory/closeButton.png', {frameWidth: 12, frameHeight: 12});
		this.load.image('leyenda', 'assets/scenes/inventory/infoBox.png');

		// Icónos de qué locura
		this.load.spritesheet('icons', 'assets/scenes/inventory/icons.png', {frameWidth: 16, frameHeight: 8});
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Loot inicial
		this.inventory.addHealth('bolla');

		// Guardar la escena de la que te han despertado y aplicar cambios del inventario
		this.events.on('wake', (scene, data) => {
			this.activateButtons();
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
		this.buttons.push(this.equipedWeaponButton = new Button(this, 217, 262, 'selected', 0, 1, 2, this.keyboardInput,
			() => {
				if (this.inventory.getEquipedWeapon().imgID !== 'puño' && this.inventory.getEquipedWeapon().imgID !== 'asta') { // OnClick
					this.selected(this.inventory.getWeapons()['puño'], "W");
					this.updateUIInfo(this.inventory.getWeapons()['puño'].weapon);
				}
			},
			() => {														// OnPointerOver
				this.showDescription(this.inventory.getEquipedWeapon());
				this.indicator.updateInd('inventory', 'inventory', {x: 280, y: 140}, this.inventory.getEquipedWeapon().name);
				this.updateUIInfo(this.inventory.getEquipedWeapon());
			},	
			() => {this.resetStatsBox(); this.dialogBox.clearText(); this.indicator.deactivateInd();} // OnPointerOut
		).setScale(8, 8));

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
				this.buttons.push(this.weaponButtons[val.i][val.j] = new Button(this, x , y, 'selected', 0, 1, 2, this.keyboardInput,
					() => {this.selected(val, "W")},							// OnClick
					() => {if (val.owned) {										// OnPointerOver
						this.showDescription(val.weapon);
						this.updateUIInfo(val.weapon);
						this.indicator.updateInd('inventory', 'inventory', {x: x, y: y}, val.weapon.name);
					}}, 
					() => {this.resetStatsBox(); this.dialogBox.clearText(); this.indicator.deactivateInd();} // OnPointerOut
				).setScale(1.5,1.5));
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
			this.buttons.push(this.foodButtons[val.i] = new Button(this, x, y, 'selected', 0, 1, 2, this.keyboardInput,
				() => {if (val.amount) this.selected(val.item, "H", val.i)},   				// OnClick
				() => {if (val.amount) { 													// OnPointerOver
					this.showDescription(val.item); 
					this.updateUIInfo(val);
					this.indicator.updateInd('inventory', 'inventory', {x: x, y: y}, val.item.name);
				}}, 
				() => {this.resetStatsBox(); this.dialogBox.clearText(); this.indicator.deactivateInd();} // OnPointerOut
			).setScale(3,3)); 
			this.foodTexts[val.i] = this.add.text(x + 5, y + 5, itemQuantity, {fontFamily: 'Silkscreen', fontSize: 40});
			if (!val.amount) this.foodTexts[val.i].setVisible(false);
			i++;
		});

		// Botón de salir
		this.inventoryButton = new Button(this, width - 56, 43, 'inventory', 2, 0, 1, this.keyboardInput, () => {
			this.escape(); 
			this.leyendBox.setVisible(false);}).setScale(3, 3);
		this.keyboardInput.setStartButton(this.equipedWeaponButton);
		
		// Al pulsar la tecla ESC se sale de la escena de inventario
		this.input.keyboard.on('keydown-ESC', () => { 
			/*COSITAS*/
			if (this.leyendBox.visible) { 
				this.deactivateInfo();
			}
			else if (this.previousSceneName !== 'titleScene') this.escape();
		});
		this.dialogBox = new DialogBox(this, 80, 620, 850).setColor('#65583c');

		// Texto de daño, defensa de armas e items de curación
		this.atcBox = this.add.text(110, 470, this.inventory.getEquipedWeapon().getAttack(), {fontFamily: 'Silkscreen', fontSize: 50, color: '#65583c'});
		this.defBox = this.add.text(270, 470, this.inventory.getEquipedWeapon().getDefense(), {fontFamily: 'Silkscreen', fontSize: 50, color: '#65583c'});
		this.healthBox = this.add.text(820, 320, "", {fontFamily: 'Silkscreen', fontSize: 30, color: '#248a00'});

		// Indicador para el nombre de las armas
		this.indicator = new Indicator(this, 0, 0, 'info');

		// Imagen de qué locura
		this.queLocuraBox = this.add.sprite(855, 56, 'icons').setScale(5, 5);
		this.queLocuraBox.setVisible(false);

		// Recuadro de leyenda
		this.leyendBox = this.add.image(0, 0, 'leyenda').setOrigin(0, 0);
		this.leyendBox.setVisible(false);
		

		// Botón info que locuras
		this.infoButton = new Button(this, width - 325, 57, 'infoButton', 0, 1, 2, this.keyboardInput,
			() => {
				if (this.leyendBox.visible) {
					this.deactivateInfo();
				}
				else {
					this.activateInfo();
				}
			}).setScale(4, 4);

		this.inicializeButtonConnections();
		this.deactiveButtons();
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
	updateUIInfo(item) {
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

			// Actualizar qué locura
			if (weapon.imgID === "cimMad" || weapon.imgID === "cimAc" || weapon.imgID === "cimLoc") this.queLocuraBox.setFrame(4);
			else if (weapon.imgID === "dagOx" || weapon.imgID === "dagAf" || weapon.imgID === "dagEx") this.queLocuraBox.setFrame(3);
			else if (weapon.imgID === "alMb" || weapon.imgID === "alVrd" || weapon.imgID === "alDem") this.queLocuraBox.setFrame(1);
			else if (weapon.imgID === "ropIng" || weapon.imgID === "ropCst" || weapon.imgID === "ropAl") this.queLocuraBox.setFrame(0);
			else if (weapon.imgID === "sacho" || weapon.imgID === "fouc" || weapon.imgID === "guad") this.queLocuraBox.setFrame(2);
			else if (weapon.imgID === "asta") this.queLocuraBox.setFrame(5);
			if (weapon.imgID !== "puño") this.queLocuraBox.setVisible(true);
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
		this.queLocuraBox.setVisible(false);
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
		this.inventoryButton.setAdjacents(null, this.weaponButtons[4][0], this.infoButton, null);
		this.infoButton.setAdjacents(null, this.weaponButtons[2][0], null, this.inventoryButton);
		// Armas
		this.equipedWeaponButton.setAdjacents(null, null, null, this.weaponButtons[0][0]);
		for (let i = 0; i < 3; i++) this.weaponButtons[0][i].setAdjacents(this.weaponButtons[0][i-1], this.weaponButtons[0][i+1], this.equipedWeaponButton, this.weaponButtons[1][i]);
		for (let i = 0; i < 3; i++)
			for (let j = 1; j < 4; j++)
				this.weaponButtons[j][i].setAdjacents(this.weaponButtons[j][i-1], this.weaponButtons[j][i+1], this.weaponButtons[j - 1][i], this.weaponButtons[j + 1][i]);
		for (let i = 0; i < 3; i++) this.weaponButtons[4][i].setAdjacents(this.weaponButtons[4][i-1], this.weaponButtons[4][i+1], this.weaponButtons[3][i], null);
		this.weaponButtons[4][0].setAdjacent(this.inventoryButton, 'up');
		for (let i = 0; i < 4; i++) this.weaponButtons[i][0].setAdjacent(this.infoButton, 'up');
		this.weaponButtons[4][0].setAdjacent(this.inventoryButton, 'right');
		for (let i = 0; i < 5; i++) this.weaponButtons[i][2].setAdjacent(this.foodButtons[Math.floor(i/2)], 'down');
		// Comida
		this.foodButtons[0].setAdjacents(this.weaponButtons[0][2], null, this.equipedWeaponButton, this.foodButtons[1]);
		this.foodButtons[1].setAdjacents(this.weaponButtons[2][2], null, this.foodButtons[0], this.foodButtons[2]);
		this.foodButtons[2].setAdjacents(this.weaponButtons[4][2], null, this.foodButtons[1], null);
	}

	lockButtons(){
		this.inventoryButton.visible = false;
		this.weaponButtons.forEach(array => {
			array.forEach(button => {
				button.visible = false;
			});
		});
		this.foodButtons.forEach(tal => {
			tal.visible = false;
		});
		this.equipedWeaponButton.visible = false;
	}

	unlockButtons(){
		this.inventoryButton.visible = true;
		this.weaponButtons.forEach(array => {
			array.forEach(button => {
				button.visible = true;
			});
		});
		this.foodButtons.forEach(tal => {
			tal.visible = true;
		});
		this.equipedWeaponButton.visible = true;
	}

	deactiveButtons(){
		for (var i = 0; i < this.buttons.length; i++) this.buttons[i].setVisible(false);
	}	

	activateButtons(){
		for (var i = 0; i < this.buttons.length; i++) this.buttons[i].setVisible(true);
	}

	deactivateInfo(){
		this.leyendBox.visible = false;
		this.infoButton.setTexture('infoButton');
		this.infoButton.x = this.scale.width - 325;
		this.infoButton.y = 57;
		this.infoButton.setAdjacents(null, this.weaponButtons[2][0], null, this.inventoryButton);
		this.unlockButtons();
	}

	activateInfo(){
		this.leyendBox.visible = true;
		this.infoButton.setTexture('closeButton');
		this.infoButton.x = this.scale.width - 90;
		this.infoButton.y = 120;
		this.infoButton.setAdjacents(null, null, null, null);
		this.lockButtons();
	}
}
