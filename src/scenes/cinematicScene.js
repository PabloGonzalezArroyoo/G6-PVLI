import Phaser from '../lib/phaser.js';
import Button from '../input/button.js';
import KeyboardInput from '../input/keyboardInput.js';

/**
 * Escena de Cinemática.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
    constructor() {
        super({ key: 'cinematicScene' });
    }
    
	init(data){
        this.inventory = data.inventory;
        this.cinematicKey = data.key;
        this.cinematicKey += 'Cinematic';
	}

    preload(){

        // Vídeo
        this.load.video(this.cinematicKey, 'assets/scenes/cinematic/' + this.cinematicKey + '.mp4')

        // Botón
        this.load.spritesheet('skip', 'assets/scenes/cinematic/skipButton.png', {frameWidth: 37, frameHeight: 14});
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.keyboardInput = new KeyboardInput(this);

        //Reproducimos la cinemática
        this.cinematic = this.add.video(width / 2, height / 7 * 3, this.cinematicKey).setScale(0.6, 0.6);
        this.cinematic.on('complete', ()=>{this.goToNextScene();});
        this.cinematic.play();

        //Pintamos el botón de saltar cinemática
        this.skipButton = new Button(this, 514, 690,'skip', 0, 1, 2, this.keyboardInput, ()=>{this.goToNextScene();}).setScale(5, 5);
        this.keyboardInput.setStartButton(this.skipButton);
    }

    goToNextScene() {
        if (this.cinematicKey === 'endCinematic'){
            // Lanzar escena de créditos
            this.scene.start('CreditsScene', {inventory: this.inventory});
        }
        else this.scene.start('levelMenuScene', {inventory: this.inventory});
    }
}