import Character from './character.js'
import PlayerAnimator from './animations/playerAnimator.js';

export default class Player extends Character {
    constructor(scene, x, y) {
        super(x, y, new PlayerAnimator(scene, x, y))
        this._defense;
        this._defenseBoost;
    }

    attack(){
        console.log("HOLA");
        this.animator.playIdle();
    }

    
}