import Character from './character.js'
import EnemyAnimator from './animations/enemyAnimator.js'

// Clase base Enemy
export class Enemy extends Character {
    constructor(x,y,animator) {
        super(x,y,animator);
    }
}

// Enemigo 1
export class Enemy1 extends Enemy {
    constructor(scene,x,y) {
        super(x,y,new EnemyAnimator(scene,x,y));
    }
    //ability1()
}

// Enemigo 2
 export class Enemy2 extends Enemy {
    constructor(scene,x,y) {
        super(x,y,animator);
    }
    //ability2()
}