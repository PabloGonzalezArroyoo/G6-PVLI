import Phaser from '../lib/phaser.js';
import DialogBox from '../animations/dialogBox.js';
import EventDispatcher from '../combat/eventDispatcher.js';

/**
 * Escena de Crédtips.
 * @extends Phaser.Scene
 */
 export default class Credits extends Phaser.Scene {

    constructor() {
		super({ key: 'CreditsScene' });
        this.dialogBox;
        this.previousLetterTime = 0;
        this.creditsText;
        this.creditsMusic;
        this.fadeOutTime = 5000;
        this.emitter = EventDispatcher.getInstance();
	}

    preload() {
        this.load.audio('Credits', ['assets/scenes/credits/A New Dawn for Inglazona - Vivu.mp3']);
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.background = this.add.rectangle(0, 0, width, height, 0x000000).setScale(5,5);
        this.dialogBox = new DialogBox(this, width/2-200, height, 850).setColor('#FFFFFF').setAlign('center'); // Blanco
       
        this.dialogBox.clearText();
        this.dialogBox.setTextToDisplay(
            'Creado por Pantheon Studios\n\n' + 
            'Integrantes\n' +
            'Miguel Curros García\n' + 
            'Pablo González Arroyo\n' +
            'Pedro Sánchez Vela\n'+ 
            'Rafael Vilches Hernández\n' +
            'Yi Wang Qiu\n' +
            '\nProgramador jefe\n' + 
            'Miguel Curros García\n' +
            '\nOrganizador jefe\n' + 
            'Pablo González Arroyo\n' +
            '\nDiseñador principal\n' + 
            'Pedro Sánchez Vela\n' +
            '\nAsegurador de calidad\n' + 
            'Rafael Vilches Hernández\n' +
            '\nDiseñadora jefe\n' + 
            'Yi Wang Qiu\n' +
            '\nCompositor musical\n' + 
            'Javier Tirado Ríos (Vivu)\n'
            );
        
        this.creditsText = this.tweens.add({
            targets: this.dialogBox,            
            y:  - height * 1.75,
            ease: 'Linear',
            duration: 30000
        });

        this.creditsMusic = this.sound.add('Credits');
        this.creditsMusic.play();

        const self = this;
        this.creditsText.once('complete', () => { 
            this.dialogBox.x -= 200
            this.dialogBox.y = height / 2 - 50;
            
            this.dialogBox.clearText();
            this.dialogBox.setTextToDisplay('Basado en la historia y la estatua de María Pita en A Coruña\n♥ María Pita (1565-1643) ♥');

            this.emitter.once('finishTexting', ()=>{
                var creditsMusicTween = this.tweens.add({
                    targets: this.creditsMusic,
                    ease: 'Linear', 
                    volume: 0,
                    duration: this.fadeOutTime
                });
                this.tweens.add({
                    targets: this.dialogBox,
                    ease: 'Linear', 
                    alpha: 0,
                    duration: this.fadeOutTime
                });
                creditsMusicTween.once('complete', ()=> {
                    this.creditsMusic.stop();
                    //this.dialogBox.clearText();
                    //this.dialogBox.setAlpha(1);
                    //this.dialogBox.setTextToDisplay('¡Muchas gracias por jugar a nuestro juego!');
                });
            });
        });
    }

    update(t,dt) {
        super.update(t,dt);

        this.previousLetterTime += dt;
        if (this.dialogBox.isWritting && 40 <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}
    }
 }