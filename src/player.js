import Character from './character.js'
import PlayerAnimator from './animations/playerAnimator.js';
import HealthController from './healthController.js';
import Inventory from './inventory.js';

export default class Player extends Character {
    constructor(scene, x, y, damage) {
        super(x, y, new PlayerAnimator(scene, x, y), new HealthController(scene, x, y - 150, 100), damage);
        this.inventory = new Inventory();
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

    useItem(item){
        //Cambia de arma equipada si el item es un arma
        if(item.getType()==='arma')
            this.inventory.setEquipedWeapon(item);
        //Se cura si el item es un objeto de curacion
        else if(item.getType()==='curacion'){
            this.healthController.changeHealth(item.getValue());
            this.inventory.subtractItem(item);
        }
    }

    quelocura(){
        console.log("QUELOCURA");
    }
}