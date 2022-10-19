//import HealthController from "./healthController.js"

//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export default class Character{
    constructor(x, y, animator) {
        this.x = x;
        this.y = y;
        this.animator = animator;
        
        //this._healthController = new HealthController(health);
        //this._damage = damage;
    }

    //getCurrentHealth() {return this._healthController.getCurrentHealth();}
}