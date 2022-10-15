/**
 * Escena de Batalla.
 * @extends Phaser.Scene
 */
export default class BattleScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'battleScene' });
	}

	/**
	 * Cargar nivel seleccionado
	*/
	init(){

	}

	/**
	 * Cargamos todos los assets que vamos a necesitar:
	 * 		- Fondo
	 * 		- Hud
	 * 		- Personajes
	 */
	preload(){

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintar el fondo
		// var back = this.add.image(0, 0, 'background').setOrigin(0, 0);

		// Pintar personajes
		// ...

		// Pintar HUD y hacer botones interactivos
		// ...
	}



	createButtonFromSprite(sprite, pointerdown, pointerup, pointerover, pointerout){
		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	pointerdown(); // Marcar botón
	    });

	    sprite.on('pointerup', pointer => {
			pointerup(); //Cambiamos a la escena de la cinemática
	    });

		sprite.on('pointerover', () => {
			pointerover(); // Destacar botón
	    });

	    sprite.on('pointerout', () => {
			pointerout(); // Desdestacar botón
	    });
	}

}
