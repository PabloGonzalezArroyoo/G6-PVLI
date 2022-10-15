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

	}
}
