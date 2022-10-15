/**
 * Escena de Inventario.
 * @extends Phaser.Scene
 */
export default class InventoryScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'inventoryScene' });
	}

	/**
	 * Asignar si es inventario principal o de batalla
	*/
	init(){

	}

	/**
	 * Cargamos todos los assets que vamos a necesitar:
	 * 		- Fondo inventario
	 * 		- Items
	 */
	preload(){
		
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		// var back = this.add.image(0, 0, /*'inventory'*/).setOrigin(0, 0);


		//Pintamos un botón de salir
		// var backButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'back')
		// sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    backButton.on('pointerdown', pointer => {
	    	// Marcar botón
	    });

	    backButton.on('pointerup', pointer => {
			this.scene.start('cinematicScene'); //Cambiamos a la escena de la cinemática
	    });

		backButton.on('pointerover', () => {
			// Destacar botón
	    });

	    backButton.on('pointerout', () => {
			// Desdestacar botón
	    });




	    // Pintar botónes correspondientes a los objetos del inventario y hacer sprites interactivos
		// ...

		// vv HACER ESTO PARA TODOS LOS BOTONES vv

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite
	    sprite.on('pointerdown', pointer => {
	    	// Marcar botón
	    });

	    sprite.on('pointerup', pointer => {
			// 
	    });

		sprite.on('pointerover', () => {
			// Destacar botón
	    });

	    sprite.on('pointerout', () => {
			// Desdestacar botón
	    });

	}
}
