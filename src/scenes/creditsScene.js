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
        this.playerSprite;
        this.fadeOutTime = 5000;
        this.emitter = EventDispatcher.getInstance();
	}

    preload() {
        this.load.audio('Credits', ['assets/scenes/credits/A New Dawn for Inglazona - Vivu.mp3']);
        this.load.spritesheet('player_salute', 'assets/characters/mariaPita/mariaPita_salute.png', {frameWidth: 50, frameHeight: 32});
    }

    create() {
        
        const width = this.scale.width;
        const height = this.scale.height;

        this.background = this.add.rectangle(0, 0, width, height, 0x000000).setScale(5,5);
        this.dialogBox = new DialogBox(this, width/2-200, height, 850).setColor('#FFFFFF').setAlign('center');
       
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
        '\nEncargada de arte\n' + 
        'Yi Wang Qiu\n' +
        '\nCompositor musical\n' + 
        'Javier Tirado Ríos (Vivu)\n'
        );
        
        this.creditsMusic = this.sound.add('Credits');
        this.creditsMusic.play();

        this.creditsText = this.dialogBoxScrollUp();

        this.creditsText.once('complete', () => { 
            
            this.dialogBox.x -= 200;
            this.dialogBox.y = height / 2 - 50;
            this.dialogBox.clearText();
            this.dialogBox.setTextToDisplay('Basado en la historia y la estatua de María Pita en A Coruña\n♥ María Pita (1565-1643) ♥');

            this.emitter.once('finishTexting', ()=>{
                let creditsTextTween = this.dialogBoxFadeOut();
                creditsTextTween.once('complete', ()=> {
                    this.dialogBox.clearText();
                    this.dialogBox.setAlpha(1);
                    this.dialogBox.setTextToDisplay('¡Muchas gracias por jugar a nuestro juego!');
                });

                this.emitter.once('finishTexting', ()=>{
                    this.anims.create({
                        key: 'salute',
                        frames: this.anims.generateFrameNumbers('player_salute',{start:0, end:11}),
                        frameRate: 12,
                        repeat: 0 
                    });

                    this.playerSprite = this.add.sprite(width / 2 + 250, height / 2 - 25).setScale(6,6).setAlpha(0).play('salute');;
                    this.playerSpriteFadeIn();
                    this.playerSprite.once('animationcomplete', ()=>{
                        this.playerSpriteFadeOut();
                        this.dialogBoxFadeOut();
                        let creditsMusicTween = this.musicFadeOut();
                        creditsMusicTween.once('complete', ()=> {
                            this.creditsMusic.stop();
                        });
                    });
                 });
            });
        });
    }

    dialogBoxScrollUp() {
        return this.tweens.add({
            targets: this.dialogBox,            
            y:  - this.scale.height * 1.75,
            ease: 'Linear',
            duration: 30000
        });
    }

    dialogBoxFadeOut() {
        return this.tweens.add({
            targets: this.dialogBox,
            ease: 'Linear', 
            alpha: 0,
            duration: this.fadeOutTime
        });
    }

    playerSpriteFadeIn() {
        return this.tweens.add({
            targets: this.playerSprite,
            ease: 'Linear', 
            alpha: 1,
            duration: this.fadeOutTime/4 
        });
    }

    playerSpriteFadeOut() {
        return this.tweens.add({
            targets: this.playerSprite,
            ease: 'Linear', 
            alpha: 0,
            duration: this.fadeOutTime
        });
    }

    musicFadeOut() {
        return this.tweens.add({
            targets: this.creditsMusic,
            ease: 'Linear', 
            volume: 0,
            duration: this.fadeOutTime
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