import listOfItems from 'listOfItems.js'

export class Inventory{
	constructor(equipedWeapon = listOfItems[0], items = []){
		this.equipedWeapon = equipedWeapon;
		this.items = items;
	}

	getEquipedWeapon(){return epipedWeapon;}

	setEquipedWeapon(item){this.equipedWeapon = item;}

	addItem(item){
		this.items.push(item);
	}
}