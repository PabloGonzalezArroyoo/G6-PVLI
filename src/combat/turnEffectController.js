// Esta clase se encarga de controlar los efectos de estado que sufran los personajes 
// como el sangrado o la defensa
export default class TurnEffectController{
	constructor(character){
		this.character = character;
		this.bleedTurns = 0;
		this.bleedDamage = 0;
		this.stunTurns = 0;
		this.defenseTurns = 0;
	}
	// Activa el sangrado para el personaje, en el que durante, los turnos dados, resta el porcentaje de vida dado
	activateBleed(turns, damagePercentage){
		if (this.bleedTurns <= 0){
			this.bleedTurns = turns;
			this.bleedDamage = (this.character.healthController.getMaxHealth() / 100) * damagePercentage;			
		}
	}
	// Impide que el personaje ataque durante los turnos dados
	activateStun(turns){
		if (this.stunTurns <= 0){
			this.stunTurns = turns;	
		}
	}
	// Define los turnos que dura la defensa
	activateDefense(turns){
			this.defenseTurns = turns;
	}
	// Actualiza los turnos restantes de cada efecto de estado al pasar el turno actual
	updateTurn(){
		if (this.bleedTurns > 0){
			this.bleedTurns--; // Resta un turno de sangrado
			this.character.healthController.changeHealth(-this.bleedDamage); //Aplica el daño de sangrado
		}
		if (this.stunTurns > 0) this.stunTurns--; // Resta el turno de aturdimiento
		if (this.defenseTurns > 0) this.defenseTurns--; // Reduce los turnos de defensa restantes
		else this.character._defenseBoost = 0; // Si no tiene turnos de defensa, su acumulable es 0
	}
	// Devuelve el daño de sangrado
	getBleedDamage() { return this.bleedDamage; }
}