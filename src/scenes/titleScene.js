// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Button } from '../input/button.js';
import { KeyboardInput } from '../input/keyboardInput.js';
import PlayerAnimator from '../animations/playerAnimator.js';

/**
 * Escena de Pantalla de Título.
 * @extends Phaser.Scene
 */
export default class TitleScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'titleScene' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		// Imagen fondo y logo
		this.load.image('background', 'assets/scenes/title/titleBackground.png');
		this.load.image('title','assets/MariaPitasRevenge.png');

		// Imagen de botones
		this.load.spritesheet('play', 'assets/scenes/title/playButton.png', {frameWidth: 37, frameHeight: 14});

		// Musica
		this.load.audio('Pirates of the Atlantic', ['assets/scenes/title/Pirates of the Atlantic - Vivu.mp3']);
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

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
		var back = this.add.image(0, 0, 'background').setOrigin(0, 0);

		// Logo del juego
		var title = this.add.image(512, 100, 'title').setScale(0.25,0.25);

		this.keyboardInput = new KeyboardInput(this);
		// Botón "JUGAR"
		//var self = this;
		var button = new Button(this, 514, 690,'play', 0, 1, 2, this.keyboardInput, jumpToLevelMenuScene);
		button.setScale(5, 5);

		this.keyboardInput.setStartButton(button);

		function jumpToLevelMenuScene() {
			// Fade Out
			musicFadeOut();
			camera.fadeOut(1000, 0, 0, 0); // fadeOut(time, R, G, B), 000 = Black
			camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
				music.stop();
				self.scene.start('levelMenuScene', -1);
			})
		}

		function musicFadeOut() {
			self.tweens.add({
				targets: music,
				volume: -1,
				ease: 'Linear',
				duration: 2000,
			});
		}

		// Teclado
		//Para seleccionar botones con teclas, creamos el objeto tecla
		//var Enter = this.scene.input.keyboard.addKeys('ENTER,Z');
		//En este caso, cualquiera de los objetos destacaria el boton y el enter lanzaria la escena de cinematica
		//keys.on('down', function () {/*Destaca el boton*/ });
		//Ejemplo: Al pulsar el enter
		//Enter.on('down', function () {self.scene.start('levelMenuScene')});
		//Enter.on('up', function () {
			//this.scene.start('cinematicScene'); /*Se cambia a la escena de batalla*/
		//});
		//Esc.on('down', function () {
			//this.scene.start('optionsScene');//Se abre el menu de opciones
		//});
	}
	update(){
		this.keyboardInput.processInput();
	}
}
