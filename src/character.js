//import HealthController from "./healthController.js"

export class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, objName) {
        super(scene, x, y, objName);
        
        this.scene.add.existing(this);
        //this._healthController = new HealthController(health);
        //this._damage = damage;
    }

    //getCurrentHealth() {return this._healthController.getCurrentHealth();}
}