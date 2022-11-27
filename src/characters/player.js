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

    getAttackWeapon() { return this.inventory.getEquipedWeapon().getAttack(); }

    attack(enemy){
        console.log("ATAQUE");
        // Animacion de ataque
        this.animator.playAttack();
        // Le baja vida al enemigo
        this.animator.once("animationcomplete-attack",
            () => {enemy.healthController.changeHealth(-this.getAttackWeapon())});
    }

    defense(){
        console.log("DEFENSA");
        this.turnEffectController.activateDefense(3);
        if(this._defenseBoost<4)this._defenseBoost++;
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
            console.log(item.getHealthValue())
            this.healthController.changeHealth(item.getHealthValue());
            this.inventory.substractHealth(item.imgID);
        }
        this.healthController.scene.time.delayedCall(1000,
            () => {this.healthController.emitter.emit("finishTurn")});
    }

    quelocura(enemies, index){
        console.log("QUELOCURA");
        this.inventory.equipedWeapon.queLocura(this, enemies, index);
        this.healthController.scene.time.delayedCall(1000, () => {this.healthController.emitter.emit("finishTurn")});
    }

    receiveAttack(damage){
        // guardar en esta variable el calculo del daño
        this.receivedDamage = damage;
        if(this.turnEffectController.defenseTurns > 0)//Si quedan turnos de defensa
        {
            this.receivedDamage-= this.receivedDamage*(0.15*this._defenseBoost); //Reduce el daño segun los turnos de defensa que se tengan
        }
        this.healthController.changeHealth(-this.receivedDamage);
        console.log(this.receivedDamage);
        return this.receivedDamage;
    }

    getRecievedDamage() { this.receivedDamage; }

    getDamage() {return this.inventory.getEquipedWeapon().getAttack();}
}