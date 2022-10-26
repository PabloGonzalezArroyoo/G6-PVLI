// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { Button } from '../button.js';

/**
 * Escena de Cinemática.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
    /**
     * Escena principal.
     * @extends Phaser.Scene
     */
    constructor() {
        super({ key: 'cinematicScene' });
    }
    
    /**
	 * Inicializa las variables
	*/
	init(){

	}
    
    /**
     * Cargamos todos los assets que vamos a necesitar:
     *      - Vídeo de cinemática
     *      - Botón de saltar cinemática
     */
    preload(){
        // Vídeo

        // Botón
        //this.load.image('skip', 'assets/GUI/skip.png');
    }

    /**
    * Creación de los elementos de la escena
    */
    create() {
        //Reproducimos la cinemática
        
        //var self = this;
        //Pintamos el botón de saltar cinemática
        //var sprite = new Button(this, this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'skip', 0, 0, 0, function(){self.scene.start('levelMenuScene')});

        const width = this.scale.width;
        const height = this.scale.height;

		this.add.text(width * 0.5, height * 0.5, 'Cinematic Scene', {})
        .setOrigin(0.5);

		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameOverScene');
        });

    }

    update() {

	}
}