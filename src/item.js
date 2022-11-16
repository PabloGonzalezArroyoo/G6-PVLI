export default class Item {
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, value, description){
		this.name = name;
		this.imgID = imgID;
		this.type = type;
		this.value = value;
		this.description = description;
		this.quantity = 1;
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
	constructor(name, imgID, value, description) {
		super(name, imgID, "WEAPON", value, description);
	}
}