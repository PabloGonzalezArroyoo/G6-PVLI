
constructor() {
	this.equipedWeapon;
	this.weapons = {};
	listOfWeapons.forEach(object => {
		Object.defineProperty(this.weapons, object.imgId, {value: {weapon: object, owned: false}});
	});
	this.health = {};
	listOfHealth.forEach(object => {
		Object.defineProperty(this.health, object.imgId, {value: {item: object, amount: 0}});
	});
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

useItem(itemId, player) {
	if (this.health[itemId])
		if (this.health[itemId].amount) {
		 this.health[itemId].amount--;
		 this.health[itemId].item.use(player);
		}
	else if (this.weapons[itemId])
		if (this.weapons[itemId].owned)
			this.weapons[itemId].weapon.use(player);
	else console.log("No se pudo usar el item");
}