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
		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'start')
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	// Marcar botón
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('cinematicScene'); //Cambiamos a la escena de la cinemática
	    });

		sprite.on('pointerover', () => {
			// Destacar botón
	    });

	    sprite.on('pointerout', () => {
			// Desdestacar botón
		});
		//Para seleccionar botones con teclas, creamos el objeto tecla
		var keys = this.scene.input.keyboard.addKeys('LEFT, UP, RIGHT,DOWN,W,A,S,D');
		var Esc = this.scene.input.keyboard.addKeys('ESC,X');
		var Enter = this.scene.input.keyboard.addKeys('ENTER,Z')
		//En este caso, cualquiera de los objetos destacaria el boton y el enter lanzaria la escena de cinematica
		keys.on('down', function () {/*Destaca el boton*/ });
		//Ejemplo: Al pulsar el enter
		Enter.on('down', function () {/*Marca el botón*/ });
		Enter.on('up', function () {
			this.scene.start('cinematicScene'); /*Se cambia a la escena de batalla*/
		});
		Esc.on('down', function () {
			this.scene.start('optionsScene');//Se abre el menu de opciones
		});

	}
}
