import TurnEffectController from '../combat/turnEffectController.js'

//Demomento solo necesita su posicion y en animator, luego se puede añadir mas propiedades si son necesarias
export default class Character{
    constructor(x, y, animator, healthController, damage) {
        this.x = x;
        this.y = y;
        this.animator = animator;
        this.healthController = healthController;
        this.damage = damage;
        this.turnEffectController = new TurnEffectController(this);
    }

    // Devuelve la posición del personaje
    getPosition() { return {x: this.x, y: this.y}; }

    //getCurrentHealth() {return this._healthController.getCurrentHealth();}
    updateTurn(){
        this.turnEffectController.updateTurn();
    }

    getBleedDamage() { return this.turnEffectController.getBleedDamage(); }

    isBleeding(){ return this.turnEffectController.bleedTurns > 0; }
    isStuned(){ return this.turnEffectController.stunTurns > 0; }
}