export class HealthController {
    constructor(maxHP) {
        this._maxHealth = maxHP;
        this._currentHealth;
    }

    changeHealth(value) {
        this._currentHealth = value;
    }
}