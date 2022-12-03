// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data){
        this.level = data.level;
        this.inventoryBackup = data.inventoryBackup;
        this.inventory = data.inventory;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width * 0.5, height * 0.5, 'Game Over', {})
        .setOrigin(0.5);

        this.inventory.setInventory(this.inventoryBackup);                                                   // Devuelve los objetos perdidos durante el combate

        //Sustituir los dos siguientes inputs por botones
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('levelMenuScene', {inventory: this.inventory});                             // Esta funcion sirve para volver a la pantalla de titulo
        });
        this.input.keyboard.once('keydown-R', () => {
            console.log(this.inventory);
            this.level.loadLevel(this, this.inventory);                                 // Esta funcion sirve para reintentar el nivel
        });
    }
}