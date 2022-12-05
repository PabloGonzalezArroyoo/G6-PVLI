// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { KeyboardInput } from '../input/keyboardInput.js';
import {Button} from '../input/button.js';
import EventDispatcher from '../combat/eventDispatcher.js';


export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data){
        this.level = data.level;
        this.inventoryBackup = data.inventoryBackup;
        this.inventory = data.inventory;
    }

    preload(){

        // Transición
        this.load.spritesheet('fadeOut', 'assets/scenes/transitions/fadeOutBattleTransition.png', {frameWidth: 1024, frameHeight: 768});
        this.load.image('GameOver', 'assets/scenes/gameOver/GameOver.png');
        this.load.image('Maria_Dead', 'assets/scenes/gameOver/Maria_Muerta.png');
        this.load.image('emptyButton', 'assets/scenes/battle/layers/emptyButton.png');
    }

    create() {
        this.emitter = EventDispatcher.getInstance();

        // Letrero de GameOver
        this.add.image(575, 230, 'GameOver').setScale(5,5);

        // Imagen de maria pita muerta
        this.add.image(512, 425, 'Maria_Dead').setScale(7,7);

        // Transición y elección de nivel
        // FadeOut
        this.anims.create({
            key: 'fOut',
            frames: this.anims.generateFrameNumbers('fadeOut', {start: 0, end: 5}),
            frameRate: 17,
            repeat: 0
        });
        // Recoger el envento para cargar el siguiente nivel
        this.emitter.once('levelSelected', (levelData) => {
            this.add.sprite(1024, 768, 'fadeOut').setOrigin(1, 1).play('fOut');
            this.time.delayedCall(1000, () => {this.scene.start('battleScene', levelData)});
        });

        const width = this.scale.width;
        const height = this.scale.height;

        this.inventory.setInventory(this.inventoryBackup);                                                   // Devuelve los objetos perdidos durante el combate

        this.keyboardInput = new KeyboardInput(this);

        this.botones = [new Button(this, 375, 600, 'emptyButton', 0, 1, 2, this.keyboardInput, () => {this.scene.start('levelMenuScene', {inventory: this.inventory})}),
                    new Button(this, 675, 600, 'emptyButton', 0, 1, 2, this.keyboardInput, () => {this.level.loadLevel(this, this.inventory);})
                    ];

        this.buttonText1 = this.add.text(375, 597, 'Salir', {fontFamily: 'Silkscreen'}).setOrigin(0.5).setFontSize(20).setColor('black');
        this.buttonText2 = this.add.text(675, 597, 'Reintentar', {fontFamily: 'Silkscreen'}).setOrigin(0.5).setFontSize(20).setColor('black');

        this.keyboardInput.setStartButton(this.botones[0]);
    }

    update(t,dt) {
        super.update(t,dt);
        this.keyboardInput.processInput();
    }
}