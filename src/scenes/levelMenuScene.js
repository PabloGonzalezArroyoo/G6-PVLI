/**
 * Escena de Menú de Niveles.
 * @extends Phaser.Scene
 */
export default class LevelMenuScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'levelMenuScene' });
	}

	/**
	 * Actualizar niveles desbloqueados
	*/
	init(){

	}


	/**
	 * Cargamos todos los assets que vamos a necesitar
	 * 		- Imagen del mapa
	 * 		- Botón de nivel seleccionar completado/sin completar
	 */
	preload(){

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintar el mapa de fondo
		// var back = this.add.image(0, 0, /*'map'*/).setOrigin(0, 0);

		// Pintar botónes correspondientes a los niveles desbloqueados y hacer sprites interactivos
		// ...

		// vv HACER ESTO PARA TODOS LOS BOTONES vv

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite
	    sprite.on('pointerdown', pointer => {
	    	// Marcar botón
	    });

	    sprite.on('pointerup', pointer => {
	    	// ajustar para asignar el nivel cargado
			this.scene.start('battleScene'); //Cambiamos a la escena de combate correspondiente al nivel seleccionado
	    });

		sprite.on('pointerover', () => {
			// Destacar botón
	    });

	    sprite.on('pointerout', () => {
			// Desdestacar botón
	    });

	}
}
