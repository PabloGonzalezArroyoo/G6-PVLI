import Character from '/character.js'
// importar inventory

export class player extends Character {
    constructor(name, position, scale, rotation, color, imgId, health, damage) {
        super('Maria Pita', position, scale, rotation, color, imgId, health, damage);
        this._defense;
        this._defenseBoost;
    }
}