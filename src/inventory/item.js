export default class Item {
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, description){
		this.name = name;
		this.imgID = imgID;
		this.type = type;
		this.description = description;
	}

  	getName() { return this.name; }
  
	getDesc() { return this.description; }

	getImgID() { return this.imgID; }

	getType() { return this.type; }

	getValue() { return this.value; }
}

// Items de curación
export class HealthItem extends Item {
	constructor(itemData) {
		super(itemData.key, itemData.imgID, "HEALTH", itemData.desc);	
		this.healthValue = itemData.heal;
	}

	getHealthValue() { return this.healthValue; }
}

// Items de daño (armas)
export class WeaponItem extends Item {
	constructor(itemData) {
		super(itemData.key, itemData.imgID, "WEAPON", itemData.desc);
		this.attackValue = itemData.attack;
		this.defValue = itemData.defense;
		this.queLocura = itemData.queLocura;
	}

	getAttack() { return this.attackValue; }
	
	getDefense() { return this.defValue; }

	static areaAttack(percentage) {
		return function (player, enemies) {
			let dmg = player.getDamage();
			dmg /= enemies.length;
			dmg += dmg*percentage/100;
			enemies.forEach(enemy => {enemy.healthController.changeHealth(-dmg);});
			return dmg;		
		}
	}

	static bleeding(percentage) {
		return function(player, enemies, enemy){
			enemy.turnEffectController.activateBleed(percentage, 3);
       this.player.scene.time.delayedCall(1000, () => {this.player.healthController.emitter.emit("finishTurn")});
			return player.attack(enemy);
           
		}
	}

	static stun(maxTurns, percentages) {
		return function(player, enemies, enemy) {
			let activeTurns = 0;
			let active = true;
			while (activeTurns < maxTurns && active){
				active = Math.floor(Math.random() * 100) < percentages[activeTurns];
				if (active) activeTurns++;
			}
			console.log(activeTurns);
			enemy.turnEffectController.activateStun(activeTurns);
      this.player.scene.time.delayedCall(1000, () => {this.player.healthController.emitter.emit("finishTurn")});
			return player.attack(enemy);
            
		}
	}

	static multipleAttack(times) {
		return function(player, enemies, enemy) {
			let dmg = player.getDamage();
			dmg = dmg * 60 / 100;
			for (let i = 0; i < times; i++)
				enemy.healthController.changeHealth(-dmg);
			return dmg * times;
		}
	}

	static lifeAbsorption(percentage) {
		return function (player, enemies, enemy) {
			let dmg = player.attack(enemy);
			player.healthController.changeHealth(dmg*percentage/100);
		}
	}

}