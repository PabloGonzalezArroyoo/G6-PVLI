import Character from './character.js'
import PlayerAnimator from '../animations/playerAnimator.js';
import HealthController from './healthController.js';
import Inventory from '../inventory/inventory.js';

export default class Player extends Character {
    constructor(scene, x, y, inventory) {
        super(x, y, new PlayerAnimator(scene, x, y), new HealthController(scene, x, y - 150, 100));
        this.inventory = inventory;
        this._defenseBoost=0;
        this.receivedDamage;
        //this.inventory.addItem(listOfItems[6]);
        //this.inventory.addItem(listOfItems[1]);         //Estas lineas es solo para comprobar
    }

    getDamage() { return this.inventory.getEquipedWeapon().getAttack(); }

    attack(enemy){
        // Animacion de ataque
        this.animator.playAttack();
        // Le baja vida al enemigo
        this.animator.once("animationcomplete-attack",
            () => {enemy.healthController.changeHealth(-this.getDamage())});
    }

    defense(){
        this.turnEffectController.activateDefense(3);
        if (this._defenseBoost < 4) this._defenseBoost++;
        this.animator.playDefense();
        this.animator.once("animationcomplete-defense",()=>{
                this.healthController.scene.time.delayedCall(1000, () => {
                    this.healthController.emitter.emit("finishTurn")
                })
            });
    }

    useItem(item){
        //Cambia de arma equipada si el item es un arma
        if(item.type === 'WEAPON')
            this.inventory.setEquipedWeapon(item.imgID);
        //Se cura si el item es un objeto de curacion
        else if(item.type === 'HEALTH'){
            this.healthController.changeHealth(item.getHealthValue());
            this.inventory.substractHealth(item.imgID);
        }
        this.healthController.scene.time.delayedCall(1000,
            () => {this.healthController.emitter.emit("finishTurn")});
    }

    quelocura(enemies, enemy){
        this.inventory.equipedWeapon.queLocura(this, enemies, enemy);
        this.healthController.scene.time.delayedCall(1000, () => {this.healthController.emitter.emit("finishTurn")});
    }

    receiveAttack(damage){
        // guardar en esta variable el calculo del daño
        this.receivedDamage = damage;
        this.receivedDamage-=this.receivedDamage*(this.inventory.equipedWeapon.defValue/100);
        if(this.turnEffectController.defenseTurns > 0) { //Si quedan turnos de defensa
             this.receivedDamage -= this.receivedDamage * (0.15 * this._defenseBoost);  //Reduce el daño segun los turnos de defensa que se tengan
        }
        this.healthController.changeHealth(-this.receivedDamage);
        return this.receivedDamage;
    }

    getRecievedDamage() { this.receivedDamage; }

}