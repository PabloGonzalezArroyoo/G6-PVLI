export default class TurnEffectController{
	constructor(character){
		this.character = character;
		this.bleedTurns = 0;
		this.bleedDamage = 0;
		this.stunTurns = 0;
		this.defenseTurns=0;
	}

	activateBleed(turns, damagePercentage){
		if (this.bleedTurns <= 0){
			this.bleedTurns = turns;
			this.bleedDamage = (this.character.healthController.getMaxHealth() / 100) * damagePercentage;			
		}
	}

	activateStun(turns){
		if (this.stunTurns <= 0){
			this.stunTurns = turns;	
		}
	}

	updateTurn(){
		if (this.bleedTurns > 0){
			this.bleedTurns--;
			this.character.healthController.changeHealth(-this.bleedDamage);
		}
		if (this.stunTurns > 0) this.stunTurns--;
		if(this.character._defenseTurns>0)this.character._defenseTurns--; //Reduce los turnos de defensa restantes
		else if(this.character._defenseTurns===0)this.character._defenseBoost=0;//Si no tiene turnos de defensa, su acumulable es 0
	}
}