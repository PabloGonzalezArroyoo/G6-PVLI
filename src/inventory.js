import {listOfItems} from './listOfItems.js'

export default class Inventory{
	constructor(equipedWeapon = listOfItems[0], items = []){
		this.equipedWeapon = equipedWeapon;
		this.items = items;
	}

	getEquipedWeapon(){return epipedWeapon;}

	setEquipedWeapon(item){this.equipedWeapon = item;}

	//Suma 1 a la cantidad del objeto si existe y si no lo añade al array
	addItem(item){
		let itemIndex = this.items.findIndex(element => element === item.getName());
		if(itemIndex === -1)
			this.items.push(item);
		else
			this.items[itemIndex].addCuantity(1);
	}

	//Resta 1 a la cantidad del objeto si existe y lo elimina del array si la cantidad es 0
	subtractItem(item){
		let itemIndex = this.items.findIndex(element => element === item.getType());
		if(itemIndex !== -1){
				this.items[itemIndex].addCuantity(-1);
			if(this.items[itemIndex].getCuantity() === 0)
				this.items.splice(itemIndex,1);
		}
	}
}