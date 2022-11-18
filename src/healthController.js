import EventDispatcher from './eventDispatcher.js';

export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        /* Animación */
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');

        // Escala inicial del cuadro de la barra
        // **Cambiar este valor para aumentar/disminuir la escala de la barra de vida
        this._barDisplaySizeX = 120;
        this._barDisplaySizeY = 25;
        // Escala inicial de la barra de color
        this._colorBarDisplaySizeX = this._barDisplaySizeX - 6;
        this._colorBarDisplaySizeY = this._barDisplaySizeY - 12;

        // Divisiones de la barra de vida
        this._healthDivider = maxHP / this._colorBarDisplaySizeX;

        // Offset para la barra de color
        this._offsetX = 0;

        // Añade barra de color escalada
        this.color = this.scene.add.image(x + this._offsetX, y, 'lifeBarColors', 3).setDisplaySize(this._colorBarDisplaySizeX, this._colorBarDisplaySizeY);
        // Añade cuadro de la barra
        this.scene.add.existing(this).setDisplaySize(this._barDisplaySizeX, this._barDisplaySizeY);

        /* Lógica */
        this._maxHealth = maxHP;
        this._currentHealth = maxHP;
        this.emitter = EventDispatcher.getInstance();
    }
    
    changeHealth(value) {

        if (value != 0) {
            /* Lógica */
            // MAXIMO
            if (this._currentHealth + value > this._maxHealth) value = this._maxHealth - this._currentHealth;
            // MINIMO
            else if (this._currentHealth - value < 0){
                this.color.destroy();
                value = -this._currentHealth;
            }
            this._currentHealth += value;

            /* Animación */
            var frameNumber = 3;
            switch (true) {
                // Colores
                case this._currentHealth <= 75 && this._currentHealth > 50: {
                    frameNumber = 2; break;
                } 
                case this._currentHealth <= 50 && this._currentHealth > 25: {
                    frameNumber = 1; break;
                }
                case this._currentHealth <= 25 && this._currentHealth > 0: {
                    frameNumber = 0; break;
                }
            }
            // Destruye la barra de color anterior
            this.color.destroy();

            /* CALCULOS */
            // Calcula cuantos pixeles se deben quitar/poner
            var pix = value / this._healthDivider;
            // La posicion X para la barra de color debe ir acumulando esos pixeles/2 ya que se quita por ambos lados
            this._offsetX += pix / 2;
            // El tamaño X para la barra de color debe ir acumulando esos pixeles
            this._colorBarDisplaySizeX += pix;
            
            // Añade la barra de color
            if (this._currentHealth > 0) this.color = this.scene.add.image(this.x + this._offsetX, this.y, 'lifeBarColors', frameNumber).setDisplaySize(this._colorBarDisplaySizeX, this._colorBarDisplaySizeY);
            // Añade el cuadro de la barra
            this.scene.add.image(this.x, this.y, 'lifeBar').setDisplaySize(this._barDisplaySizeX, this._barDisplaySizeY);
        }
        else {
            console.log("NO HA CAMBIADO LA VIDA")
        }
        this.scene.time.delayedCall(1000, () => {this.emitter.emit("finishTurn")});
    }

    getCurrentHealth(){ return this._currentHealth; }
    getMaxHealth(){ return this._maxHealth; }
}