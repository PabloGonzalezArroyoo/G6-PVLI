import Entity from "./entity";
import HealthController from "./healthController.js"

export class Character extends Entity {
    constructor(name, position, scale, rotation, color, imgId, health, damage) {
        super(name, position, scale, rotation, color, imgId);
        this._healthController = new HealthController(health);
        this._damage = damage;
    }

    getCurrentHealth() {return this._healthController.getCurrentHealth();}
}