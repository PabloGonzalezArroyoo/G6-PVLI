export class HealthController {
    constructor(maxHP) {
        this._maxHealth = maxHP;
        this._currentHealth = maxHP;
    }

    changeHealth(value) {
        this._currentHealth += value;
        if (this._currentHealth > this._maxHealth) this._currentHealth = this._maxHealth;
        else if (this._currentHealth < 0) this._currentHealth = 0; 
    }

    getCurrentHealth(){return this._currentHealth; }
}