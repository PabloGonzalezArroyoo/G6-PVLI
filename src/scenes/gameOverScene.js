// Importaciones
// Importación de Librería Phaser
import Phaser from '../lib/phaser.js';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width * 0.5, height * 0.5, 'Game Over', {})
        .setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('titleScene');
        });
    }
}