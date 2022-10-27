// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Button } from '../button.js';
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
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos el fondo
		var back = this.add.image(0, 0, 'background').setOrigin(0, 0);

		// Pintamos el logo del juego
		var title = this.add.image(512, 100, 'title').setScale(0.25,0.25);

		// Botón "JUGAR"
		var self = this;
		var button = new Button(this, 514, 690,'play', 0, 1, 2, function(){self.scene.start('levelMenuScene', -1)}, function(){});
		button.setScale(5, 5);
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

		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('battleScene');
        });
	}
}
