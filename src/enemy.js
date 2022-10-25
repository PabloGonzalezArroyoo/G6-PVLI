import Character from './character.js'
import EnemyAnimator from './animations/enemyAnimator.js'
import HealthController from './healthController.js';

// Clase base Enemy
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export class Enemy extends Character {
    constructor(scene, x, y, animator, maxHealth, damage) {
        super(x, y, animator, new HealthController(scene, x, y - 150, maxHealth), damage);
    }
    attack(player){
        // Le baja vida al enemigo
        player.healthController.changeHealth(-this.damage);
        // Animacion de ataque
        //this.animator.playAttack();
    }
}

// Enemigo 1
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export class DrunkRuffian extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, new EnemyAnimator(scene, x, y, 'drunkRuffian'), 100, 15);
    }
    //ability1()
}

// Enemigo 2
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
 export class StinkyPirate extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, new EnemyAnimator(scene, x, y, 'stinkyPirate'), 150, 25);
    }
    //ability2()
}