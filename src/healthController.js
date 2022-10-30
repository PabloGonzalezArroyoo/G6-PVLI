export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        /* Animación */
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');
        // Escala inicial de la barra de color
        this._scaleBar = 45;
        // Divisiones de la barra de vida
        this._healthDivider = maxHP / this._scaleBar;
        // Añade barra de color escalada
        this.color = this.scene.add.image(x, y, 'lifeBarColors', 3).setScale(this._scaleBar, 5);
        // Añade cuadro de la barra
        this.scene.add.existing(this).setScale(5, 5);

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
            // Calcula la nueva escala de la barra de color
            this._scaleBar += value / this._healthDivider;
            // Añade la barra de color
            this.color = this.scene.add.image(this.x, this.y, 'lifeBarColors', frameNumber).setScale(this._scaleBar, 5);
            // Añade el cuadro de la barra
            this.scene.add.image(this.x, this.y, 'lifeBar').setScale(5, 5);
        }
        else {
            console.log("NO HA CAMBIADO LA VIDA")
        }
    }

    getCurrentHealth(){ return this._currentHealth; }
}