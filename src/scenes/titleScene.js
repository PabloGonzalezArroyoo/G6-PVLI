// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Button } from '../button.js';

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
		//this.load.spritesheet("nombre_spritesheet", "direccion_spritesheet",{ frameWidth: x, frameHeight: y }); Carga la SpriteSheet
		this.load.image('start', 'assets/GUI/start.png');
		//this.load.image('castle', 'assets/castle.gif');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		//var back = this.add.image(0, 0, 'castle').setOrigin(0, 0);

		//Pintamos un botón de Empezar
		//var button = new Button(this,'start',0,0,0,200,300,this.scene.start('cinematicScene'));
		//Para seleccionar botones con teclas, creamos el objeto tecla
		
		//var keys = this.scene.input.keyboard.addKeys('LEFT, UP, RIGHT,DOWN,W,A,S,D');
		//var Esc = this.scene.input.keyboard.addKeys('ESC,X');
		//var Enter = this.scene.input.keyboard.addKeys('ENTER,Z');
		//En este caso, cualquiera de los objetos destacaria el boton y el enter lanzaria la escena de cinematica
		//keys.on('down', function () {/*Destaca el boton*/ });
		//Ejemplo: Al pulsar el enter
		//Enter.on('down', function () {/*Marca el botón*/ });
		//Enter.on('up', function () {
			//this.scene.start('cinematicScene'); /*Se cambia a la escena de batalla*/
		//});
		//Esc.on('down', function () {
			//this.scene.start('optionsScene');//Se abre el menu de opciones
		//});
		const width = this.scale.width;
        const height = this.scale.height;

		this.add.text(width * 0.5, height * 0.2, 'Title Scene', {})
        .setOrigin(0.5);

		/*this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('levelMenuScene');
        });*/
		var self = this;
		var boton = new Button(this, width/2, height/2, 'start', 0, 0, 0, function(){self.scene.start('levelMenuScene')});
	}
}
