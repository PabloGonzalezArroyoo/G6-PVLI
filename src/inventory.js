import {listOfItems} from './listOfItems.js'

export default class Inventory{
	constructor(equippedWeapon = listOfItems[0], allItems = []){
		this.equippedWeapon = equippedWeapon;
		this.allItems = allItems;
		this.weaponAndObjectSize = 0;
		this.foodSize = 0;
	}

	getEquipedWeapon(){return equippedWeapon;}

	setEquipedWeapon(item){this.equippedWeapon = item;}

	setItems(allItems){this.allItems = allItems;}

	getItems(){return this.allItems;}

	// Añade armas y objetos (si no existen) al array y suma 1 a la cantidad de objetos si existen
	addItem(item){
		let itemIndex = this.allItems.findIndex((element) => element.getName() === item.getName());
		if(itemIndex === -1)
			this.allItems.push(item);
		else{
			if(item.getType() !== 'WEAPON')
				this.allItems[itemIndex].addQuantity(1);
		}
	}

	// Resta 1 a la cantidad del item si existe y lo elimina del array si la cantidad es 0
	subtractItem(item){
		let itemIndex = this.allItems.findIndex((element) => element.getName() === item.getName());
		if(itemIndex !== -1){
				this.allItems[itemIndex].addQuantity(-1);
			if(this.allItems[itemIndex].getQuantity() === 0)
				this.allItems.splice(itemIndex,1);
		}
	}
}