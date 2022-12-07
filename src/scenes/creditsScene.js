import Phaser from '../lib/phaser.js';
import DialogBox from '../animations/dialogBox.js';

/**
 * Escena de Crédtips.
 * @extends Phaser.Scene
 */
 export default class Credits extends Phaser.Scene {

    constructor() {
		super({ key: 'CreditsScene' });
        this.dialogBox;
        this.previousLetterTime = 0;
        this.creditsTween;
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
        
        this.creditsTween = this.tweens.add({
            targets: this.dialogBox,            
            y:  - height * 1.5,
            ease: 'Linear',
            duration: 30000
        });

        this.creditsTween.once('complete', () => { 
            this.dialogBox.x -= 200
            this.dialogBox.y = height / 2 - 50;
            
            this.dialogBox.clearText();
            this.dialogBox.setTextToDisplay('Basado en la historia y la estatua de María Pita en A Coruña\n♥ María Pita (1565-1643) ♥');});
    }

    update(t,dt) {
        super.update(t,dt);

        this.previousLetterTime += dt;
        if (this.dialogBox.isWritting && this.dialogBox.timePerLetter <= this.previousLetterTime){
			this.dialogBox.write();
			this.previousLetterTime = 0;
		}
    }
 }