import Character from './character.js'
import PlayerAnimator from './animations/playerAnimator.js';
import HealthController from './healthController.js';

export default class Player extends Character {
    constructor(scene, x, y, damage) {
        super(x, y, new PlayerAnimator(scene, x, y), new HealthController(scene, x, y - 150, 100), damage);
        this._defense;
        this._defenseBoost;
    }

    attack(enemy){
        console.log("ATAQUE");
        // Le baja vida al enemigo
        enemy.healthController.changeHealth(-this.damage);
        // Animacion de ataque
        this.animator.playAttack();
    }

    defense(){
        console.log("DEFENSA");
    }

    objects(){
        console.log("OBJECTS");
    }

    quelocura(){
        console.log("QUELOCURA");
    }
}