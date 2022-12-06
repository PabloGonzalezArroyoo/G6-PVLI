// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
import { KeyboardInput } from '../input/keyboardInput.js';
import {Button} from '../input/button.js';
import EventDispatcher from '../combat/eventDispatcher.js';


export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });

        this.emitter = EventDispatcher.getInstance();
    }

    init(data){
        this.level = data.level;
        this.inventoryBackup = data.inventoryBackup;
        this.inventory = data.inventory;
    }

    preload(){

        // Transición
        this.load.spritesheet('fadeOut', 'assets/scenes/transitions/fadeOutBattleTransition.png', {frameWidth: 1024, frameHeight: 768});
        // Imagenes de fondo
        this.load.image('GameOver', 'assets/scenes/gameOver/GameOver.png');
        this.load.image('Maria_Dead', 'assets/scenes/gameOver/Maria_Muerta.png');

        // Sprites de botones
        this.load.spritesheet('retryButton', 'assets/scenes/gameOver/retryButton.png',{frameWidth: 235, frameHeight: 62});
        this.load.spritesheet('exitButton', 'assets/scenes/gameOver/exitButton.png',{frameWidth: 235, frameHeight: 62});
    }

    create() {
        // Se destruyen los eventos anteriores
        this.emitter.destroy();

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

        // Recoger el evento para cargar el siguiente nivel
        this.emitter.once('levelSelected', (levelData) => {
            this.add.sprite(1024, 768, 'fadeOut').setOrigin(1, 1).play('fOut');
            this.time.delayedCall(1000, () => {this.scene.start('battleScene', levelData)});
        });

        const width = this.scale.width;
        const height = this.scale.height;

        this.inventory.setInventory(this.inventoryBackup);                                                   // Devuelve los objetos perdidos durante el combate

        this.keyboardInput = new KeyboardInput(this);

        this.botones = [new Button(this, 375, 600, 'exitButton', 0, 1, 2, this.keyboardInput, () => {this.scene.start('levelMenuScene', {inventory: this.inventory})}),
                    new Button(this, 675, 600, 'retryButton', 0, 1, 2, this.keyboardInput, () => {this.level.loadLevel(this.inventory);})
                    ];

        this.keyboardInput.setStartButton(this.botones[0]);

        this.botones[0].setAdjacents(null, null, null, this.botones[1]);
        this.botones[1].setAdjacents(null, null, this.botones[0], null);
    }

    update(t,dt) {
        super.update(t,dt);
        this.keyboardInput.processInput();
    }
}