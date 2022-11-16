import Character from './character.js'
import PlayerAnimator from './animations/playerAnimator.js';
import HealthController from './healthController.js';
import Inventory from './inventory.js';
import {listOfItems} from './listOfItems.js';

export default class Player extends Character {
    constructor(scene, x, y, damage) {
        super(x, y, new PlayerAnimator(scene, x, y), new HealthController(scene, x, y - 150, 100), damage);
        this.inventory = new Inventory(listOfItems[0],   // Quitar array para el juego final y dejar el constructor por defecto
            [listOfItems[1],
            listOfItems[2],
            listOfItems[5],
            listOfItems[6],
            listOfItems[6],
            listOfItems[6],
            listOfItems[6]]
            );
        this._defense;
        this._defenseBoost;

        /*// Pintar botones correspondientes a los objetos del inventario y hacer sprites interactivos
        // ESTO ES UNA PRUEBA PARA MOSTRAR LOS OBJETOS EN PANTALLA
        this.inventory.addItem(1);
        this.inventory.addItem(1);
        this.inventory.addItem(2);
        this.inventory.addItem(5);
        this.inventory.addItem(6);
        this.inventory.addItem(6);
        this.inventory.addItem(6);
        this.inventory.addItem(6);*/
    }

    attack(enemy){
        console.log("ATAQUE");
        // Animacion de ataque
        this.animator.playAttack();
        // Le baja vida al enemigo
        this.animator.once("animationcomplete-attack",() => {enemy.healthController.changeHealth(-this.damage)});
    }

    defense(){
        console.log("DEFENSA");
        this.healthController.scene.time.delayedCall(1000, () => {this.healthController.emitter.emit("finishTurn")});
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
        this.healthController.scene.time.delayedCall(1000, () => {this.healthController.emitter.emit("finishTurn")});
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