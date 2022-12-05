// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';
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
    }

    create() {
        this.emitter = EventDispatcher.getInstance();

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

        this.add.text(width * 0.5, height * 0.5, 'Game Over', {})
        .setOrigin(0.5);

        this.inventory.setInventory(this.inventoryBackup);                                                   // Devuelve los objetos perdidos durante el combate

        //Sustituir los dos siguientes inputs por botones
        this.input.keyboard.once('keydown-SPACE', () => {
            this.emitter.destroy();
            this.scene.start('levelMenuScene', {inventory: this.inventory});                             // Esta funcion sirve para volver a la pantalla de titulo
        });
        this.input.keyboard.once('keydown-R', () => {
            this.level.loadLevel(this.inventory);                                 // Esta funcion sirve para reintentar el nivel
            this.emitter.destroy();
        });
    }

    reloadLevel(){
    }
}