import Character from './character.js'
import PlayerAnimator from './animations/playerAnimator.js';
import HealthController from './healthController.js';
import Inventory from './inventory.js';

export default class Player extends Character {
    constructor(scene, x, y, inventory) {
        super(x, y, new PlayerAnimator(scene, x, y), new HealthController(scene, x, y - 150, 100));
        this.inventory = inventory;
        this._defense;
        this._defenseBoost;
        //this.inventory.addItem(listOfItems[6]);
        //this.inventory.addItem(listOfItems[1]);         //Estas lineas es solo para comprobar

    }

    attack(enemy){
        console.log("ATAQUE");
        // Animacion de ataque
        this.animator.playAttack();
        // Le baja vida al enemigo
        this.animator.once("animationcomplete-attack",
            () => {enemy.healthController.changeHealth(-this.inventory.getEquipedWeapon().getAttack())});
        console.log(-this.inventory.getEquipedWeapon().getAttack());
    }

    defense(){
        console.log("DEFENSA");
        console.log(this.inventory.getEquipedWeapon().getDefense());
        this.healthController.scene.time.delayedCall(1000,
            () => {this.healthController.emitter.emit("finishTurn")});
    }

    useItem(item){
        //Cambia de arma equipada si el item es un arma
        if(item.type === 'WEAPON')
            this.inventory.setEquipedWeapon(item);
        //Se cura si el item es un objeto de curacion
        else if(item.type === 'HEALTH'){
            console.log(item.getValue())
            this.healthController.changeHealth(item.getValue());
            this.inventory.subtractItem(item);
        }
        this.healthController.scene.time.delayedCall(1000,
            () => {this.healthController.emitter.emit("finishTurn")});
    }

    quelocura(enemy){
        console.log("QUELOCURA");
        this.attack(enemy);
    }

    receiveAttack(damage){
        // guardar en esta variable el calculo del daño
        let receivedDamage = damage;
        this.healthController.changeHealth(-receivedDamage);
        return receivedDamage;
    }
}