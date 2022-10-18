// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js'

/**
 * Escena de Opciones.
 * @extends Phaser.Scene
 */
export default class OptionsScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'optionsScene' });
	}

	/**
	 * Inicializa las variables
	 */
	init() {

	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		
	}

	/**
	 * Creación de los elementos de la escena
	 * Cargar los datos de las opciones actuales 
	*/
	create() {
		//Pintamos un fondo
		//...

		//Pintar en función a las opciones actuales y hacerlas interactuables
		//...
		const width = this.scale.width
        const height = this.scale.height

		this.add.text(width * 0.5, height * 0.5, 'Options Scene', {})
        .setOrigin(0.5)

		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('inventoryScene')
        })
	}
	

	update() {

	}
}
