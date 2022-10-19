//import HealthController from "./healthController.js"

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