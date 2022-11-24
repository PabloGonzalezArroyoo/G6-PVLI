import EventDispatcher from '../combat/eventDispatcher.js';

export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        /* Animación */
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');

        this.barScaleX = 4;
        this.barScaleY = 4;
        this.colorBarScaleX = this.barScaleX * 9;
        this.colorBarScaleY = this.barScaleY;

        // Divisiones de la barra de vida
        this.healthDivider = this.colorBarScaleX / maxHP;
        
        // Offset para la barra de color
        this.offsetX = 0;

        // Añade barra de color escalada
        // TAM SPRITE * SCALE
        this.color = this.scene.add.image(x, y, 'lifeBarColors', 3).setScale(this.colorBarScaleX,this.colorBarScaleY);
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
            // MAXIMO
            if (this.currentHealth + value > this.maxHealth) value = this.maxHealth - this.currentHealth;
            // MINIMO
            else if (this.currentHealth + value < 0){
                this.color.destroy();
                value = -this.currentHealth;
            }
            this.currentHealth += value;

            /* Animación */
            var frameNumber = 3;
            switch (true) {
                // Colores
                case this.currentHealth <= 75 && this.currentHealth > 50: {
                    frameNumber = 2; break;
                } 
                case this.currentHealth <= 50 && this.currentHealth > 25: {
                    frameNumber = 1; break;
                }
                case this.currentHealth <= 25 && this.currentHealth > 0: {
                    frameNumber = 0; break;
                }
            }

            /* CALCULOS */
            // La posicion X para la barra de color debe ir acumulando esos pixeles/2 ya que se quita por ambos lados
            // Calcular los pixeles a quitar
            var pix =  this.colorBarScaleX * this.currentHealth/this.maxHealth;
            this.offsetX -= Math.round(pix / 2);
            //console.log(this.offsetX);
            const self = this;
            
            if (this.currentHealth > 0) {
                /* Animación de la barra de vida */
                this.scene.tweens.add({
                    targets: self.color,
                    scaleX: self.colorBarScaleX * (self.currentHealth/self.maxHealth),
                    x: self.x + self.offsetX,
                    ease: 'Linear',
                    duration: 2000,
                });
                //console.log(self.color.x);
            }
            
            // Añade el cuadro de la barra
            this.scene.add.image(this.x, this.y, 'lifeBar').setDisplaySize(this._barDisplaySizeX, this._barDisplaySizeY);
        }
        else {
            console.log("NO HA CAMBIADO LA VIDA")
        }
        this.scene.time.delayedCall(1000, () => {this.emitter.emit("finishTurn")});
    }

    getCurrentHealth(){ return this.currentHealth; }
    getMaxHealth(){ return this.maxHealth; }
}