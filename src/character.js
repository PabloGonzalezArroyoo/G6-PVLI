import Entity from "./entity";
import healthController from "./healthController.js"

export class Character extends Entity {
    constructor(name, position, scale, rotation, color, imgId, health, damage) {
        super(name, position, scale, rotation, color, imgId)
        this._maxHP = health;
        this._damage = damage;
        this._healthController = healthController;
    }
}