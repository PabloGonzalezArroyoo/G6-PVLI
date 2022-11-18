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
        // Animacion de ataque
        this.animator.playAttack();
        // Le baja vida al enemigo
        this.animator.once("animationcomplete-attack",() => {enemy.healthController.changeHealth(-this.damage)});
        return this.getDamage();
    }

    defense(){
        console.log("DEFENSA");
        this.healthController.scene.time.delayedCall(1000, () => {this.healthController.emitter.emit("finishTurn")});
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
        this.healthController.scene.time.delayedCall(1000, () => {this.healthController.emitter.emit("finishTurn")});
    }

    quelocura(enemies, index){
        console.log("QUELOCURA");
        this.inventory.equippedWeapon.queLocura(this, enemies, index);
    }

    receiveAttack(damage){
        // guardar en esta variable el calculo del daño
        let receivedDamage = damage;
        this.healthController.changeHealth(-receivedDamage);
        return receivedDamage;
    }

    getDamage() {return this.damage;}
}