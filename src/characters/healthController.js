import EventDispatcher from '../combat/eventDispatcher.js';

export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        /* Animación */
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');

        this.barScaleX = this.barScaleY = 4; // Cambiar este valor para cambiar el tamaño de la barra de vida
        this.colorBarScaleX = this.barScaleX * 36;
        this.colorBarScaleY = this.barScaleX * 5;

        // Añade barra de color escalada
        this.color = 0x00FF00;
        this.colorBar = this.scene.add.rectangle(x - this.colorBarScaleX/2, y - this.colorBarScaleY/2 , this.colorBarScaleX, this.colorBarScaleY, this.color).setOrigin(0,0);
        // Añade cuadro de la barra
        this.scene.add.existing(this).setScale(this.barScaleX,this.barScaleY);

        /* Lógica */
        this.maxHealth = maxHP;
        this.currentHealth = maxHP;
        this.emitter = EventDispatcher.getInstance();        
    }

    changeHealth(value) {

        if (value != 0) {
            /* Lógica */
            if (this.currentHealth + value > this.maxHealth) value = this.maxHealth - this.currentHealth; // MAXIMO
            else if (this.currentHealth + value < 0) { value = -this.currentHealth; } // MINIMO

            this.currentHealth += value;

            /* Animación */
            switch (true) {
                // Colores
                case this.currentHealth <= 0.75 * this.maxHealth && this.currentHealth > 0.50 * this.maxHealth: {
                    this.color = 0xff8000; break; // Naranja
                } 
                case this.currentHealth <= 0.50 * this.maxHealth && this.currentHealth > 0.25 * this.maxHealth: {
                    this.color = 0xffff00; break; // Amarillo
                }
                case this.currentHealth <= 0.25 * this.maxHealth && this.currentHealth > 0: {
                    this.color = 0xff0000; break; // Rojo
                }
            }
            
            if (this.currentHealth > 0) {
                /* Animación de la barra de vida */
                this.scene.tweens.add({
                    targets: this.colorBar,
                    width: this.colorBarScaleX * (this.currentHealth/this.maxHealth),
                    fillColor: this.color,
                    ease: 'Linear',
                    duration: 2000,
                });
            }
        }
        else {
            console.log("NO HA CAMBIADO LA VIDA")
        }
        this.scene.time.delayedCall(1000, () => {this.emitter.emit("finishTurn")});
    }

    getCurrentHealth(){ return this.currentHealth; }
    getMaxHealth(){ return this.maxHealth; }
}