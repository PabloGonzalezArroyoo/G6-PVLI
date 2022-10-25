export default class HealthController extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, maxHP) {
        // Sprite en la UI
        super(scene, x, y, 'lifeBar');
        this.color = this.scene.add.image(x + 10, y, 'lifeBarColors', 3).setScale(40, 5);
        this.scene.add.existing(this).setScale(5, 5);
        // Vida
        this._maxHealth = maxHP;
        this._currentHealth = maxHP;
    }
    
    changeHealth(value) {

        this._currentHealth += value;
        
        // MAXIMO
        if (this._currentHealth > this._maxHealth) this._currentHealth = this._maxHealth; 
        // MINIMO
        else if (this._currentHealth <= 0) {
            this.color.destroy();
            this._currentHealth = 0;
        }
        // Ajustar sprite de barra de vida
        else {
            var cambio = false; var offsetX = 0; var frameNumber = 3; var scaleNumber = 40;
            switch (true) {
                case this._currentHealth <= 75 && this._currentHealth > 50: {
                    cambio = true; frameNumber = 2; scaleNumber = 30; break;
                } 
                case this._currentHealth <= 50 && this._currentHealth > 25: {
                    cambio = true; offsetX = 25; frameNumber = 1; scaleNumber = 20; break;
                }
                case this._currentHealth <= 25 && this._currentHealth > 0: {
                    cambio = true; offsetX = 45; frameNumber = 0; scaleNumber = 10; break;
                }
            }
        
            if (cambio) {
                this.color.destroy();
                this.color = this.scene.add.image(this.x - offsetX, this.y, 'lifeBarColors', frameNumber).setScale(scaleNumber, 5);
                this.scene.add.image(this.x, this.y, 'lifeBar').setScale(5, 5);
                cambio = false;
            }
        }
    }

    getCurrentHealth(){ return this._currentHealth; }
}