export default class TurnEffectController{
	constructor(character){
		this.character = character;
		this.bleedTurns = 0;
		this.bleedDamage = 0;
		this.stunTurns = 0;
		this.defenseTurns=0;
		this.isDefending=false;
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
	activateDefense(turns){
			this.defenseTurns=turns;
			this.isDefending=true;
	}

	updateTurn(){
		if (this.bleedTurns > 0){
			this.bleedTurns--;
			this.character.healthController.changeHealth(-this.bleedDamage);
		}
		if (this.stunTurns > 0) this.stunTurns--;
		if(this.defenseTurns>0)this.defenseTurns--; //Reduce los turnos de defensa restantes
		if(this.defenseTurns<=0)this.isDefending=false;
		 if(!this.isDefending)this.character._defenseBoost=0;//Si no tiene turnos de defensa, su acumulable es 0
		console.log(this.defenseTurns+" "+this.character._defenseBoost);
	}
}