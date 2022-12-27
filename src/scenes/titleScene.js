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
	}

	init(data) {
		if (data.inventory) this.inventory = data.inventory;
	}

	preload() {
		// Imagen fondo y logo
		this.load.image('title','assets/scenes/title/MariaPitasRevenge.png');
		this.load.spritesheet('titleAnim','assets/scenes/title/TittleAnim.png',{frameWidth:1024, frameHeight: 768});

		// Imagen de botones
		this.load.spritesheet('play', 'assets/scenes/title/playButton.png', {frameWidth: 37, frameHeight: 14});
		this.load.spritesheet('inventory', 'assets/scenes/levelsMenu/inventoryButtons.png', {frameWidth: 30, frameHeight: 18});

		// Música
		this.load.audio('Pirates of the Atlantic', ['assets/scenes/title/Pirates of the Atlantic - Vivu.mp3']);
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
		var button = new Button(this, 514, 690,'play', 0, 1, 2, this.keyboardInput, jumpToLevelMenuScene).setScale(5, 5);
		this.keyboardInput.setStartButton(button);

		// Inventario del jugador
		if (!this.inventory){
			this.inventory = new Inventory();
			for(var i=0;i<window.localStorage.length;i++)
			{
				if(window.localStorage.key(i).split("_")[0]==="weapon"){
					this.inventory.addWeapon(window.localStorage.key(i).split("_")[1]);
				}
				/*else if(window.localStorage.key(i).split("_")[0]==="item"){
					console.log(this.inventory.healths[window.localStorage.key(i).split("_")[1]].amount);
					this.inventory.healths[window.localStorage.key(i).split("_")[1]].amount=
					window.localStorage.getItem('item_'+window.localStorage.key(i).split("_")[1]);
				}*/
			}
		} 

		// Gestiona el fadeOut y el inicio de la escena de niveles y la escena de inventario en paralelo
		function jumpToLevelMenuScene() {
			// Fade Out
			button.setVisible(false);
			musicFadeOut();
			camera.fadeOut(1000, 0, 0, 0); // fadeOut(time, R, G, B), 000 = Black
			camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
				music.stop();
				self.scene.start('cinematicScene', {inventory: self.inventory, key: 'start'});
			})
			self.scene.launch('inventoryScene', {scene: 'levelMenuScene', inventory: self.inventory});
			self.scene.sleep('inventoryScene');
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
}
