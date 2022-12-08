import {listOfItems} from '../data/listOfItems.js'
import {HealthItem, WeaponItem} from './item.js'

// Esta clase controla y crea el inventario del jugador
export default class Inventory{
	constructor() {
		let count = 0;
		this.weapons = {};
		listOfItems.weapons.forEach(object => {
			Object.defineProperty(this.weapons, object.imgID, {enumerable: true, 
				value: {weapon: new WeaponItem(object), owned: false, i: Math.floor(count / 3), j: count % 3}});
			count++;
		});
		count = 0;
		this.healths = {};
		listOfItems.healths.forEach(object => {
			Object.defineProperty(this.healths, object.imgID, {enumerable: true, 
				value: {item: new HealthItem(object), amount: 0, i: count }});
			count++;
		});
		this.addWeapon('puño');
		this.setEquipedWeapon('puño');
	}

	setEquipedWeapon(weaponID) {
		this.equipedWeapon = this.weapons[weaponID].weapon;
	}

	addWeapon(weaponID) {
		this.weapons[weaponID].owned = true;
	}

	addHealth(itemID, amount = 1) {
		this.healths[itemID].amount += amount;
	}

	substractWeapon(weaponID) {
		this.weapons[weaponID].owned = false;
	}

	substractHealth(itemID) {
		if (this.healths[itemID].amount > 0) this.healths[itemID].amount--;
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
			weapons.push({imgID: val.weapon.imgID, owned: val.owned, i: val.i, j: val.j});
		});

		let healths = [];
		Object.values(this.healths).forEach(val => {
			healths.push({imgID: val.item.imgID, amount: val.amount, i: val.i});
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
			this.healths[object.imgID].amount = object.amount;
			});

		this.setEquipedWeapon(inventory.equipedWeapon);
	}
}