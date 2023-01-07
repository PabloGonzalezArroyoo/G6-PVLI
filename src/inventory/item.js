// Clase base de la que parten las armas y los objetos de curacion 
// Reciben el nombre, la imagen, el tipo y su descripcion
export default class Item {
	//El tipo puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
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
		this.healthValue = itemData.heal;  //El valor de curacion
	}

	getHealthValue() { return this.healthValue; }
}

// Items de daño (armas)
export class WeaponItem extends Item {
	constructor(itemData) {
		super(itemData.key, itemData.imgID, "WEAPON", itemData.desc);
		this.attackValue = itemData.attack; // Recibe el valor de ataque
		this.defValue = itemData.defense; // Recibe el valor de defensa
		this.queLocura = itemData.queLocura; //Recibe el tipo de ¡Que Locura! del arma
	}

	getAttack() { return this.attackValue; }
	
	getDefense() { return this.defValue; }

  // Ataque en area
	static areaAttack(percentage) {
		return function (player, enemies) {
			let dmg = player.getDamage();
			dmg /= enemies.length; //Divide el daño a realizar entre los enemigos de la escena
			dmg += player.getDamage()*(percentage/100); //Le suma un porcentaje según el nivel del arma
			enemies.forEach(enemy => {player.attack(enemy, dmg);}); // Le resta dicha vida a cada enemigo 
			return dmg;		
		}
	}
	// Realiza un ataque normal y activa el sangrado a los enemigos
	static bleeding(percentage) {
		return function(player, enemies, enemy){
			enemy.turnEffectController.activateBleed(percentage, 3);
			return player.attack(enemy);
           
		}
	}
	// Impide atacar al enemigo durante los turnos que el arma dicte
	static stun(maxTurns, percentages) {
		return function(player, enemies, enemy) {
			let activeTurns = 0;
			let active = true;
			// Determina la cantidad de turnos que dura el aturdimiento segun la suerte y el nivel de arma
			while (activeTurns < maxTurns && active){
				active = Math.floor(Math.random() * 100) < percentages[activeTurns]; 
				if (active) activeTurns++;
			}
			enemy.turnEffectController.activateStun(activeTurns); //Activa el aturdimiento los turnos dictados
			return player.attack(enemy);
            
		}
	}
	// Realiza varios ataques seguidos segun el nivel del arma
	static multipleAttack(times) {
		return function(player, enemies, enemy) {
			let dmg = player.getDamage();
			dmg = dmg * 60 / 100;
			for (let i = 0; i < times; i++)
				player.attack(enemy, dmg);
			return dmg * times;
		}
	}
	// Convierte un porcentaje del daño infligido a vida
	static lifeAbsorption(percentage) {
		return function (player, enemies, enemy) {
			let dmg = player.getDamage();
			player.attack(enemy);
			player.healthController.changeHealth(dmg*percentage/100);
		}
	}
	// Exclusivo del asta, determina el final del juego
	static endGame() {
		return function (player) {
			player.animator.scene.music.stop();
			player.animator.scene.scene.start('cinematicScene', {inventory: player.animator.scene.inventory, key: 'end'});
		}
	}
}