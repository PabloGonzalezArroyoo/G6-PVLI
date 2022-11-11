export default class Item{
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, value, description){
		this.name = name;
		this.imgID = imgID;
		this.type = type;
		this.value = value;
		this.description = description;
		this.quantity = 0;
	}

	getName(){return this.name};

	getImgID(){return this.imgID;}

	getType(){return this.type};

	getValue(){return this.value};

	getDesc() { return this.description; }

	getQuantity(){return this.quantity};

	setQuantity(quantity){this.quantity=quantity};

	addQuantity(number){this.quantity+=number};
}