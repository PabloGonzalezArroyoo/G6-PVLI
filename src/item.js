export default class Item{
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, value, description){
		this.name = name;
		this.imgID = imgID;
		this.type = type;
		this.value = value;
		this.description = description;
		this.cuantity = 0;
	}

	getName(){return this.name};

	getType(){return this.type};

	getValue(){return this.value};

	getDesc() { return this.description; }

	getCuantity(){return this.cuantity};

	setCuantity(cuantity){this.cuantity=cuantity};

	addCuantity(number){this.cuantity+=number};
}