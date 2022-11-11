export class Item {
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgFile, type, value, description){
		this.name = name;
		this.imgID = imgFile;
		this.type = type;
		this.value = value;
		this.description = description;
		this.cuantity = 0;
	}

	getDesc() { return this.description; }

	getType() { return this.type; }

	getValue() { return this.value; }

	addCuantity(number) { this.cuantity += number; }

	getCuantity() { return this.cuantity; }
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