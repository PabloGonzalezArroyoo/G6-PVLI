export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        /* Animación */
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');

        // Escala inicial del cuadro de la barra
        // **Cambiar este valor para aumentar/disminuir la escala de la barra de vida
        this._scaleBarX = this._scaleBarY = 5;
        // Escala inicial de la barra de color
        this._scaleColorBarX = this._scaleBarX * 9;
        this._scaleColorBarY = this._scaleBarY;

        // Divisiones de la barra de vida
        this._healthDivider = maxHP / this._scaleColorBarX;

        // Offset para la barra de color
        this._offsetX = 0;

        // Añade barra de color escalada
        this.color = this.scene.add.image(x + this._offsetX, y, 'lifeBarColors', 3).setScale(this._scaleColorBarX, this._scaleColorBarY);
        // Añade cuadro de la barra
        this.scene.add.existing(this).setScale(this._scaleBarX, this._scaleBarY);

        /* Lógica */
        this._maxHealth = maxHP;
        this._currentHealth = maxHP;
    }
    
    changeHealth(value) {

        if (value != 0) {
            /* Lógica */
            this._currentHealth += value;
            // MAXIMO
            if (this._currentHealth > this._maxHealth) this._currentHealth = this._maxHealth; 
            // MINIMO
            else if (this._currentHealth <= 0) {
                this.color.destroy();
                this._currentHealth = 0;
            }

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

            // Calcula la nueva posición X de la barra de color
            this._offsetX += value / this._scaleColorBarX;
            // Calcula la nueva escala de la barra de color
            this._scaleColorBarX += value / this._healthDivider;
            
            // Añade la barra de color
            this.color = this.scene.add.image(this.x + this._offsetX, this.y, 'lifeBarColors', frameNumber).setScale(this._scaleColorBarX, this._scaleColorBarY);
            // Añade el cuadro de la barra
            this.scene.add.image(this.x, this.y, 'lifeBar').setScale(this._scaleBarX, this._scaleBarY);
        }
        else {
            console.log("NO HA CAMBIADO LA VIDA")
        }
    }

    getCurrentHealth(){ return this._currentHealth; }
}