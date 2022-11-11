export default class Item {
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, value, description){
		this.name = name;
		this.imgID = imgFile;
		this.type = type;
		this.value = value;
		this.description = description;
		this.quantity = 0;
	}

  getName() { return this.name; }
  
	getDesc() { return this.description; }

	getType() { return this.type; }

	getValue() { return this.value; }

	addQuantity(number) { this.quantity += number; }
  
  setQuantity(quantity) { this.quantity=quantity; }

	getQuantity() { return this.quantity; }
}


export class HealthItem extends Item {
	constructor(name, imgFile, value, description) {
		super(name, imgFile, "HEALTH", value, description);		
	}
}

export class WeaponItem extends Item {
	constructor(name, imgFile, value, description) {
		super(name, imgFile, "WEAPON", value, description);
	}
}