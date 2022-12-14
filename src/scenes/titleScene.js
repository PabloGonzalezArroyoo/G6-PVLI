import Phaser from '../lib/phaser.js';
import Button from '../input/button.js';
import KeyboardInput from '../input/keyboardInput.js';
import Inventory from '../inventory/inventory.js';

/**
 * Escena de Pantalla de Título.
 * @extends Phaser.Scene
 */
export default class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'titleScene' });
		this.buttons = [];
	}

	init(data) {
		if (data.inventory){
			this.inventory = data.inventory;
			this.oldInventory = true;
		}
	}

	preload() {
		// Imagen fondo y logo
		this.load.image('title','assets/scenes/title/MariaPitasRevenge.png');
		this.load.spritesheet('titleAnim','assets/scenes/title/TittleAnim.png',{frameWidth:1024, frameHeight: 768});

		// Imagen de botones
		//this.load.spritesheet('play', 'assets/scenes/title/playButton.png', {frameWidth: 37, frameHeight: 14});
		this.load.spritesheet('newGame', 'assets/scenes/title/newGameButton.png', {frameWidth: 108, frameHeight: 14});
		this.load.spritesheet('continueGame', 'assets/scenes/title/continueGameButton.png', {frameWidth: 108, frameHeight: 14});
		this.load.spritesheet('inventory', 'assets/scenes/levelsMenu/inventoryButtons.png', {frameWidth: 30, frameHeight: 18});

		// Música
		this.load.audio('Pirates of the Atlantic', ['assets/scenes/title/Pirates of the Atlantic - Vivu.mp3']);

		// Efectos de sonido
		this.load.audio('select', ['assets/scenes/select.mp3']);
	}

	create() {
		// Variables constantes
		const self = this;
		const camera = this.cameras.main;
		
		// Musica
		const musicConfig = {
			mute: false,
			volume: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		}
		var music = this.sound.add('Pirates of the Atlantic');
    	music.play(musicConfig);

		// Fondo 
		this.anims.create({
			key: 'titleAnim',
			frames: this.anims.generateFrameNumbers('titleAnim', {start: 0, end: 6}),
			frameRate: 6,
			repeat: -1
		})
		this.add.sprite(0, 0).setOrigin(0, 0).play('titleAnim');

		// Logo del juego
		this.add.image(512, 100, 'title').setScale(0.25,0.25);

		// Input de teclado
		this.keyboardInput = new KeyboardInput(this);

		// Botón "JUGAR" 
		this.buttons.push(new Button(this, this.scale.width/2, this.scale.height - 150,'newGame', 0, 1, 2, this.keyboardInput, () => {
			this.buttons.forEach(button => {button.visible = false;});
			newGame();
		}).setScale(5, 5));
		this.keyboardInput.setStartButton(this.buttons[0]);

		if (window.localStorage.length > 0) {
			this.buttons.push(new Button(this, this.scale.width/2, this.scale.height - 70,'continueGame', 0, 1, 2, this.keyboardInput,() => {
				this.buttons.forEach(button => {button.visible = false;});
				jumpToLevelMenuScene();
			}).setScale(5, 5));
			this.inicializeTitleButtonConnections();
		}

		// Inventario del jugador
		if (!this.inventory) {
			this.inventory = new Inventory();
			for (var i = 0; i < window.localStorage.length; i++) {
				//Carga el arma equipada
				if (window.localStorage.key(i).split("_")[0] === "equipped") {
					if (window.localStorage.key(i).split("_")[1] === "asta") this.inventory.setEquipedWeapon("puño");
					else this.inventory.setEquipedWeapon(window.localStorage.key(i).split("_")[1]);
				}

				//Si tenias el arma antes, cargala
				if (window.localStorage.key(i).split("_")[0] === "weapon") {
					if (window.localStorage.key(i).split("_")[1] === "asta") window.localStorage.removeItem(window.localStorage.key(i));
					else this.inventory.addWeapon(window.localStorage.key(i).split("_")[1]);
				}

				//Carga la cantidad de items que tenias
				else if (window.localStorage.key(i).split("_")[0] === "item") {	
					//Como la bolla empieza con 1, si lo recargas, tienes que restar ese item	
					if (window.localStorage.key(i).split("_")[1] === "bolla") {
						this.inventory.addHealth(window.localStorage.key(i).split("_")[1],
							parseInt(window.localStorage.getItem('item_' + window.localStorage.key(i).split("_")[1])) - 1);
					}
					else this.inventory.addHealth(window.localStorage.key(i).split("_")[1],
						parseInt(window.localStorage.getItem('item_' + window.localStorage.key(i).split("_")[1])));
				}
			}
		} 
		
		// Gestiona el fadeOut y el inicio de la escena de niveles y la escena de inventario en paralelo
		function jumpToLevelMenuScene(state = 'continue') {
			for (var i = 0; i < self.buttons.length; i++) self.buttons[i].setVisible(false);
			// Fade Out 
			musicFadeOut();
			camera.fadeOut(1000, 0, 0, 0); // fadeOut(time, R, G, B), 000 = Black
			camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
				music.stop();
				if (state === 'addCinematic') jumpToCinematicScene(state);
				else self.scene.start('levelMenuScene', {inventory: self.inventory});
			})
			if (!self.oldInventory){
				self.scene.launch('inventoryScene', {scene: 'titleScene', inventory: self.inventory});
				self.scene.sleep('inventoryScene');
			}
		}

		function jumpToCinematicScene() {
			self.scene.start('cinematicScene', {inventory: self.inventory, key: 'start'});
		}

		function newGame() {
			window.localStorage.clear();
			self.inventory = new Inventory();
			jumpToLevelMenuScene('addCinematic');
		}

		// Fadeout de la música
		function musicFadeOut() {
			self.tweens.add({
				targets: music,
				volume: -1,
				ease: 'Linear',
				duration: 2000,
			});
		}
	}

	inicializeTitleButtonConnections() {
		this.buttons[0].setAdjacents(null, this.buttons[1], null, null);
		this.buttons[1].setAdjacents(this.buttons[0], null, null, null);
	}
}
