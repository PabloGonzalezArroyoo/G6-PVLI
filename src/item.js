export class Item{
	//type puede ser arma o objeto y valor es el valor de ataque(arma) o de curacion(objeto) 
	constructor(name, imgID, type, value){
		this.name = name;
		this.imgID = imgID;
		this.type = type;
		this.value = value;
	}
}