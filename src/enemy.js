import Character from './character.js'
import EnemyAnimator from './animations/enemyAnimator.js'
import HealthController from './healthController.js';

// Clase base Enemy
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export class Enemy extends Character {
    constructor(scene, x, y, animator) {
        super(x, y, animator, new HealthController(scene, x, y - 150, 100));
    }
}

// Enemigo 1
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export class Enemy1 extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, new EnemyAnimator(scene, x, y));
    }
    //ability1()
}

// Enemigo 2
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
 export class Enemy2 extends Enemy {
    constructor(scene, x, y) {
        super(x, y, animator);
    }
    //ability2()
}