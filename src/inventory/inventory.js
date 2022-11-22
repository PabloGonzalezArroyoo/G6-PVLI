import {listOfItems} from '../data/listOfItems.js'
import {HealthItem, WeaponItem} from './item.js'

export default class Inventory{
/*	constructor(equippedWeapon = listOfItems[0], allItems = []){
		this.equippedWeapon = equippedWeapon;
		this.allItems = allItems;
	}

	getEquipedWeapon(){return this.equippedWeapon;}

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

	//Crea un objeto con la copia del inventario actual
	getInfo(){
		let inventory = {equippedWeapon: this.equippedWeapon.getName(), allItems: []};
		let i = 0;

		this.allItems.forEach(element => {
			inventory.allItems[i] ={ name: element.getName(), quantity: element.getQuantity()} ;
			i++;			
		});
		return inventory;
	}

	//Añade los objetos perdidos en batalla y reestablece el arma equipada
	setInfo(inventory){
		this.equippedWeapon = listOfItems.find((element) => element.getName() === inventory.equippedWeapon);
		inventory.allItems.forEach(item => {
			let index = this.allItems.findIndex((element) => element.getName() === item.name);
			if(index !== -1)
				this.allItems[index].setQuantity(item.quantity);
			else{
				this.allItems.push(listOfItems.find((element) => element.getName() === item.name));
				this.allItems[this.allItems.length - 1].setQuantity(item.quantity);
			}

		});
	}
}*/


	constructor() {
		this.weapons = {};
		listOfItems.weapons.forEach(object => {
			Object.defineProperty(this.weapons, object.imgID, {enumerable: true, value: {weapon: new WeaponItem(object), owned: false}});
		});
		this.healths = {};
		listOfItems.healths.forEach(object => {
			Object.defineProperty(this.healths, object.imgID, {enumerable: true, value: {item: object, amount: 0}});
		});
		this.addWeapon('puño');
		this.equipWeapon('puño');
	}

	equipWeapon(weaponId) {
		this.equipedWeapon = this.weapons[weaponId].weapon;
	}

	addWeapon(weaponId) {
		this.weapons[weaponId].owned = true;
	}

	addHealth(itemId) {
		this.health[itemId].amount++;
	}

	substractWeapon(weaponId) {
		this.weapons[weaponId].owned = false;
	}

	substractHealth(itemId) {
		if (this.health[itemId].amount > 0) this.health[itemId].amount--;
	}

	getEquipedWeapon(){
		return this.equipedWeapon;
	}

	// Devuelve la referencia a las armas
	getWeapons(){
		return this.weapons;
	}

	// Devuelve la referencia a los items de curacion
	getHealths(){
		return this.healths;
	}

	/**
	 * Genera un backup del inventario
	 * */
	getInventory(){
		let weapons = [];
		Object.values(this.weapons).forEach(val => {
			weapons.push({imgID: val.weapon.imgID, owned: val.owned});
		});

		let healths = [];
		Object.values(this.healths).forEach(val => {
			healths.push({imgID: val.item.imgID, amount: val.amount});
		});

		return {equipedWeapon: this.equipedWeapon.imgID, weapons: weapons, healths: healths}
	}

	/**
	 * Cambias el inventario al que se pasa por parametro
	 * @param {equipedWeapon: imgID, weapons: [{imgID, owned}], healths: [{imgID, amount}]} inventory Backup del inventario generado por getInventory
	**/
	setInventory(inventory){
		inventory.weapons.forEach(object => {
			this.weapons[object.imgID].owned = object.owned;
			});

		inventory.healths.forEach(object => {
			this.healths[object.imgID].amount = object.owned;
			});

		this.equipWeapon(inventory.equipedWeapon);
	}
}