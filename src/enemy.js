import Character from '/character.js'

// Clase base Enemy
export class Enemy extends Character {
    constructor(name, position, scale, rotation, color, imgId, health, damage) {
        super(name, position, scale, rotation, color, imgId, health, damage);
    }
}

// Enemigo 1
export class enemy1 extends Enemy {
    constructor(name, position, scale, rotation, color, imgId, health, damage) {
        super(name, position, scale, rotation, color, imgId, health, damage);
    }
    //ability1()
}

// Enemigo 2
export class enemy2 extends Enemy {
    constructor(name, position, scale, rotation, color, imgId, health, damage) {
        super(name, position, scale, rotation, color, imgId, health, damage);
    }
    //ability2()
}