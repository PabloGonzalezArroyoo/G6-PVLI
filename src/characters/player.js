import Character from './character.js'
import PlayerAnimator from '../animations/playerAnimator.js';
import HealthController from './healthController.js';
import Inventory from '../inventory/inventory.js';

// Esta clase es la que contiene todos los metodos y variables exclusivas del jugador como la defensa
export default class Player extends Character {
    constructor(scene, x, y, inventory) {
        super(x, y, new PlayerAnimator(scene, x, y), new HealthController(scene, x, y - 200, 100));
        this.inventory = inventory;
        this._defenseBoost = 0;
        this.receivedDamage;
    }

    // Devuelve el daño del arma equipada
    getDamage() { return this.inventory.getEquipedWeapon().getAttack(); }

    // Ataque al enemigo
    attack(enemy, dmg = this.getDamage()){
        // Animacion de ataque
        this.animator.playAttack();
        // Le baja vida al enemigo
        this.animator.once("animationcomplete-attack",
            () => {enemy.receiveAttack(-dmg);});
    }

    // Animación, activación y cálculo de turnos de la defensa
    defense(){
        this.turnEffectController.activateDefense(5);
        if (this._defenseBoost < 3) this._defenseBoost++;
        this.animator.playDefense();
        this.animator.once("animationcomplete-defense",()=>{
                this.healthController.scene.time.delayedCall(800, () => {
                    this.healthController.emitter.emit("finishTurn")
                })
            });
    }

    // Usa el item según el tipo
    useItem(item){
        //Cambia de arma equipada si el item es un arma
        if(item.type === 'WEAPON')
            this.inventory.setEquipedWeapon(item.imgID);
        //Se cura si el item es un objeto de curacion
        else if(item.type === 'HEALTH'){
            this.healthController.changeHealth(item.getHealthValue());
            this.inventory.substractHealth(item.imgID);
        }
        this.healthController.scene.time.delayedCall(800,
            () => {this.healthController.emitter.emit("finishTurn")});
    }

    // Animación y ejecución del qué locura
    quelocura(enemies, index, sound){
        this.animator.playWhatAMadness();
        this.animator.once("animationcomplete-whatAmadness",()=>{
            this.inventory.equipedWeapon.queLocura(this, enemies, index);
        });
        this.animator.once("animationcomplete-attack", () => {sound.play()});
    }

    // Calcula el ataque recibido según el arma equipada y los efectos secundarios
    receiveAttack(damage){
        // guardar en esta variable el calculo del daño
        this.receivedDamage = damage;
        this.receivedDamage-=this.receivedDamage*(this.inventory.equipedWeapon.defValue/100);
        if(this.turnEffectController.defenseTurns > 0) { //Si quedan turnos de defensa
             this.receivedDamage -= this.receivedDamage * (0.20 * this._defenseBoost);  //Reduce el daño segun los turnos de defensa que se tengan
        }
        this.receivedDamage = Math.round(this.receivedDamage);
        this.healthController.changeHealth(-this.receivedDamage);
        return this.receivedDamage;
    }

    // Devuelve el daño calculado por el método anterior
    getRecievedDamage() { this.receivedDamage; }

    getFlag() { 
        this.animator.flag = true;
        this.animator.playIdleBack();
    }
}