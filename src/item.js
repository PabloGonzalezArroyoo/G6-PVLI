export default class Item {
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, value, description){
		this.name = name;
		this.imgID = imgID;
		this.type = type;
		this.value = value;
		this.description = description;
		this.quantity = 0;
	}

  	getName() { return this.name; }
  
	getDesc() { return this.description; }

	getImgID() { return this.imgID; }

	getType() { return this.type; }

	getValue() { return this.value; }

	addQuantity(number) { this.quantity += number; }
  
  	setQuantity(quantity) { this.quantity=quantity; }
  
	getQuantity() { return this.quantity; }
}

// Items de curación
export class HealthItem extends Item {
	constructor(name, imgID, value, description) {
		super(name, imgID, "HEALTH", value, description);		
	}
}

// Items de daño (armas)
export class WeaponItem extends Item {
	constructor(name, imgID, attackValue, defValue, queLocura, description) {
		super(name, imgID, "WEAPON", attackValue, description);
		this.defValue = defValue;
		this.queLocura = queLocura;
	}

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
		return function(player, enemies, index){
			enemies[index].turnEffectController.activateBleed(percentage, 3);
			return player.attack(enemies[index]);
		}
	}

	static stun(maxTurns, percentages) {
		return function(player, enemies, index) {
			let activeTurns = 0;
			let active = true;
			while (activeTurns < maxTurns && active){
				active = Math.floor(Math.random() * 100) < percentages[activeTurns];
				if (active) activeTurns++;
			}
			console.log(activeTurns);
			enemies[index].turnEffectController.activateStun(activeTurns);
			return player.attack(enemies[index]);
		}
	}

	static multipleAttack(times) {
		return function(player, enemies, index) {
			let dmg = player.getDamage();
			dmg = dmg * 60 / 100;
			for (let i = 0; i < times; i++)
				enemies[index].healthController.changeHealth(-dmg);
			return dmg * times;
		}
	}

	static lifeAbsorbtion(percentage) {
		return function (player, enemies, index) {
			let dmg = player.attack(enemies[index]);
			player.healthController.changeHealth(dmg*percentage/100);
		}
	}

}