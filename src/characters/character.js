import TurnEffectController from '../combat/turnEffectController.js'

// Esta clase es la base de todos los personajes del juego
// Setea los valores de ataque y posicion de los personajes y su controlador de vida y turnos
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

    // Devuelve el daño hecho por el sangrado
    getBleedDamage() { return this.turnEffectController.getBleedDamage(); }

    // Devuelve si el personaje está sangrando
    isBleeding(){ return this.turnEffectController.bleedTurns > 0; }

    // Devuelve si el personaje está paralizado
    isStuned(){ return this.turnEffectController.stunTurns > 0; }
}