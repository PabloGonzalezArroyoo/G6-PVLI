import { HealthItem, WeaponItem } from './item.js';

// Array de items al que acceder para saber a qué item se hace referencia
export var listOfItems = [
	// Default
	new WeaponItem("Puño","*imgID*", 60, "*descripcion*"),

	// Items de curación (curativos)
	new HealthItem("Polbo á feira","cimitarraMadera", 60, "*descripcion*"), // <-- cambiar imgID por la correspondiente
	new HealthItem("Caldo gallego","*imgID*", 40, "*descripcion*"),
	new HealthItem("Bolla de pan","*imgID*", 20, "*descripción*"),

	// Items de daño (armas)
	new WeaponItem("Cimitarra de madera","cimitarraMadera", 25, "*descripcion*", WeaponItem.areaAttack(10)),
	new WeaponItem("Cimitarra de acero","cimitarraAcero", "*descripcion*", WeaponItem.areaAttack(20)),
	new WeaponItem("Cimitarra loca","cimitarraLoca", 25, "*descripcion*", WeaponItem.areaAttack(30)),
	new WeaponItem("Daga Oxidada","*imgID*", 25, "*descripcion*", WeaponItem.bleeding(2)),
	new WeaponItem("Daga afilada","*imgID*", 25, "*descripcion*", WeaponItem.bleeding(3)),
	new WeaponItem("Daga excéntrica","*imgID*", "*descripcion*", WeaponItem.bleeding(4)),
	new WeaponItem("Alabarda de marca blanca","*imgID*", 25, "*descripcion*", WeaponItem.stun(1, [100])),
	new WeaponItem("Alabarda de verdad","*imgID*", 25, "*descripcion*", WeaponItem.stun(2, [100, 70])),
	new WeaponItem("Alabarda demencial","*imgID*", 25, "*descripcion*", WeaponItem.stun(3, [100, 70, 30])),
	new WeaponItem("Ropera inglesa","*imgID*", 25, "*descripcion*", WeaponItem.multipleAttack(2)),
	new WeaponItem("Ropera castellana","*imgID*", 25, "*descripcion*", WeaponItem.multipleAttack(3)),
	new WeaponItem("Ropera alocada","*imgID*", 25, "*descripcion*", WeaponItem.multipleAttack(4)),
	new WeaponItem("Sacho","*imgID*", 25, "*descripcion*", WeaponItem.lifeAbsorbtion(30)),
	new WeaponItem("Fouciño","*imgID*", 25, "*descripcion*", WeaponItem.lifeAbsorbtion(40)),
	new WeaponItem("Guadaña extravagante","*imgID*", 25, "*descripcion*", WeaponItem.lifeAbsorbtion(50))
];