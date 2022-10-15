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
    }/**
     * Cargamos todos los assets que vamos a necesitar:
     *      - Vídeo de cinemática
     *      - Botón de saltar cinemática
     */
    preload(){
        // Vídeo

        // Botón
        this.load.image('skip', 'assets/GUI/skip.png');
    }

    /**
    * Creación de los elementos de la escena
    */
    create() {
        //Reproducimos la cinemática
        

        //Pintamos el botón de saltar cinemática
        var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'skip')
        sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


        // Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Skip"
        sprite.on('pointerdown', pointer => {
            // Marcar botón
        });

        sprite.on('pointerup', pointer => {
            this.scene.start('levelMenuScene'); //Cambiamos a la escena de la cinemática
        });

        sprite.on('pointerover', () => {
            // Destacar botón
        });

        sprite.on('pointerout', () => {
            // Desdestacar botón
        });

    }
}