import Character from './character.js'
import EnemyAnimator from './animations/enemyAnimator.js'
import HealthController from './healthController.js';

// Clase base Enemy
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export class Enemy extends Character {
    constructor(scene, x, y, spritesheet, maxHealth, damage) {
        if (scene !== null) super(x, y, new EnemyAnimator(scene, x, y, spritesheet), new HealthController(scene, x, y - 150, maxHealth), damage);
        else super(x, y, null, null, damage)
    }
    // método para añadir una escena si no tenía
    setScene(scene, maxHealth, spritesheet){
        this.healthController = new HealthController(scene, this.x, this.y - 150, maxHealth);
        this.animator = new EnemyAnimator(scene, this.x, this.y, spritesheet);
    }
    attack(player){
        // Le baja vida al enemigo
        player.healthController.changeHealth(-this.damage);
        // Animacion de ataque
        //this.animator.playAttack();
    }
    getAnimator(){return this.animator;}
}

// Enemigo 1
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export class DrunkRuffian extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'drunkRuffian', 100, 15);
    }
    setScene(scene){
        super.setScene(scene, 100, 'drunkRuffian');
    }
    //ability1()
}

// Enemigo 2
//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
 export class StinkyPirate extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'stinkyPirate', 150, 25);
    }
    setScene(scene){
        super.setScene(scene, 150, 'stinkyPirate');
    }
    //ability2()
}