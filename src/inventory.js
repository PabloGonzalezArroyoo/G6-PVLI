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

	getItems(){return this.allItems;}

	// Añade armas y objetos (si no existen) al array y suma 1 a la cantidad de objetos si existen
	addItem(itemIndex){
		let item = listOfItems[itemIndex];
		let itemName = item.getName();
		let itemType = item.getType();
		
		if (this.weaponAndObjectSize < 15 && this.foodSize < 3) {
			// Si es un arma directamente se añade al inventario
			if (itemType === 'Arma') {
				this.weaponAndObjectSize++;
				item.setCuantity(1);
				this.allItems.push(item);
			}
			// Si es un objeto o comida...
			else if (itemType === 'Objeto' ||  itemType === 'Comida') {
				let i = 0; let e = false;
				while (i < this.allItems.length && !e) {
					if (itemName == this.allItems[i].name) e = true;
					i++;
				}
				// Si está en el array de items se stackea
				if (e) {
					let quantity = this.allItems[i - 1].getCuantity();
					this.allItems[i - 1].setCuantity(quantity + 1);
				}
				// Si no, se añade
				else {
					if (itemType === 'Objeto') this.weaponAndObjectSize++;
					else if (itemType === 'Comida') this.foodSize++;
					item.setCuantity(1);
					this.allItems.push(item);
				}
			}
		}
		else if (this.weaponAndObjectSize == 15) {
			console.log("NO SE PUEDE AÑADIR MAS ARMAS/OBJETOS");
		}
		else if (this.foodSize == 3) {
			console.log("NO SE PUEDE AÑADIR MAS COMIDA");
		}
	}

	// Resta 1 a la cantidad del item si existe y lo elimina del array si la cantidad es 0
	subtractItem(itemIndex){
		let item = listOfItems[itemIndex];
		let itemName = item.getName();
		
		let i = 0; let e = false;
		while (i < this.allItems.length && !e) {
			if (itemName == this.allItems[i].name) e = true;
			i++;
		}
		// Si está en el array de items se elimina
		if (e) {
			let quantity = this.allItems[i - 1].getCuantity() - 1;
			// Se elimina el item del array
			if (quantity == 0) {
				this.allItems.splice(i-1, 1);
			}
			else {
				this.allItems[i - 1].setCuantity(quantity);
			}
		}
		else {
			console.log("El item " + itemName + " no se encuentra en el inventario y, por tanto, no se puede eliminar");
		}
	}
}