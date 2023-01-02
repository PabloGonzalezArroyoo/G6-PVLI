import EventDispatcher from '../combat/eventDispatcher.js';

// Esta clase controla la vida y la animacion de las barras de vida de todos los personajes en pantalla
export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        /* Animación */
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');
        
        this.colorBarDuration = 500;
        this.barScaleX = this.barScaleY = 4; // Cambiar este valor para cambiar el tamaño de la barra de vida
        this.colorBarScaleX = this.barScaleX * 36;
        this.colorBarScaleY = this.barScaleX * 5;

        // Añade barra de color escalada
        this.color = 0x00FF00;
        this.colorBar = this.scene.add.rectangle(x - this.colorBarScaleX/2, y - this.colorBarScaleY/2 , this.colorBarScaleX, this.colorBarScaleY, this.color).setOrigin(0,0);
        this.colorBarTween;
        // Añade cuadro de la barra
        this.scene.add.existing(this).setScale(this.barScaleX,this.barScaleY);

        /* Lógica */
        this.maxHealth = maxHP;
        this.currentHealth = maxHP;
        this.emitter = EventDispatcher.getInstance();

        this.healthText = this.scene.add.text(x - this.colorBar.width / 2 + 1, y - this.colorBar.height / 2, maxHP, 
            {fontFamily: 'Silkscreen', color: '#000000'}).setOrigin(0,0);
    }

    changeHealth(value, finish = true) {

        if (value != 0) {
            // Comprueba que la vida no suba del maximo y no baje del minimo
            if (this.currentHealth + value > this.maxHealth) value = this.maxHealth - this.currentHealth; // MAXIMO
            else if (this.currentHealth + value < 0) { value = -this.currentHealth; } // MINIMO

            this.currentHealth += value;

            // Cambia el color de la barra segun la vida restante
            switch (true) {
                // Colores
                case this.currentHealth > 0.75 * this.maxHealth: {
                    this.color = 0x00FF00; break; // Verde
                }
                case this.currentHealth <= 0.75 * this.maxHealth && this.currentHealth > 0.50 * this.maxHealth: {
                    this.color = 0xffff00; break; // Amarillo
                } 
                case this.currentHealth <= 0.50 * this.maxHealth && this.currentHealth > 0.25 * this.maxHealth: {
                    this.color = 0xff8000; break; // Naranja
                }
                case this.currentHealth <= 0.25 * this.maxHealth && this.currentHealth > 0: {
                    this.color = 0xff0000; break; // Rojo
                }
            }
            
            if (this.currentHealth >= 0) {
                /* Animación de la barra de vida */
                this.colorBarTween = this.scene.tweens.add({
                    targets: this.colorBar,
                    width: this.colorBarScaleX * (this.currentHealth/this.maxHealth),
                    fillColor: this.color,
                    ease: 'Linear',
                    duration: this.colorBarDuration,
                });
            }

            this.healthText.setText(Math.round(this.currentHealth));
        }
    
        if (finish) {
            this.colorBarTween.once('complete', () => {this.scene.time.delayedCall(500, () => {this.emitter.emit("finishTurn")})});
        }
    }
    // Devuelve la vida actual
    getCurrentHealth() { return this.currentHealth; }
     
    // Devuelve la vida maxima
    getMaxHealth() { return this.maxHealth; }

    // Devuelve la posición de la barra de vida
    getPosition() { return {x: this.x, y: this.y}; }
}