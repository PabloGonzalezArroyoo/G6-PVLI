import { HealthItem, WeaponItem } from './item.js';

// Array de items al que acceder para saber a qué item se hace referencia
export var listOfItems = [
	// Default
	new WeaponItem("Puño","puño", 15, 10, ()=>{}, "*descripcion*"),

	// Items de curación (curativos)
	new HealthItem("Polbo á feira","cimitarraMadera", 60, "*descripcion*"), // <-- cambiar imgID por la correspondiente
	new HealthItem("Caldo gallego","*imgID*", 40, "*descripcion*"),
	new HealthItem("Bolla de pan","*imgID*", 20, "*descripción*"),
	
	// Items de daño (armas)
	new WeaponItem("Cimitarra de madera","cimitarraMadera", 25, 10, WeaponItem.areaAttack(10), "*descripcion*"),
	new WeaponItem("Cimitarra de acero","cimitarraAcero", 25, 10, WeaponItem.areaAttack(20), "*descripcion*"),
	new WeaponItem("Cimitarra loca","cimitarraLoca", 25, 10, WeaponItem.areaAttack(30), "*descripcion*"),
	new WeaponItem("Daga Oxidada","dagaOxidada", 25, 10, WeaponItem.bleeding(2), "*descripcion*"),
	new WeaponItem("Daga afilada","dagaAfilada", 25, 10, WeaponItem.bleeding(3), "*descripcion*"),
	new WeaponItem("Daga excéntrica","dagaExcéntrica", 25, 10, WeaponItem.bleeding(4), "*descripcion*"),
	new WeaponItem("Alabarda de marca blanca","*imgID*", 25, 10, WeaponItem.stun(1, [100]), "*descripcion*"),
	new WeaponItem("Alabarda de verdad","*imgID*", 25, 10, WeaponItem.stun(2, [100, 70]), "*descripcion*"),
	new WeaponItem("Alabarda demencial","*imgID*", 25, 10, WeaponItem.stun(3, [100, 70, 30]), "*descripcion*"),
	new WeaponItem("Ropera inglesa","*imgID*", 25, 10, WeaponItem.multipleAttack(2), "*descripcion*"),
	new WeaponItem("Ropera castellana","*imgID*", 25, 10, WeaponItem.multipleAttack(3), "*descripcion*"),
	new WeaponItem("Ropera alocada","*imgID*", 25, 10, WeaponItem.multipleAttack(4), "*descripcion*"),
	new WeaponItem("Sacho","*imgID*", 25, 10, WeaponItem.lifeAbsorbtion(30), "*descripcion*"),
	new WeaponItem("Fouciño","*imgID*", 25, 10, WeaponItem.lifeAbsorbtion(40), "*descripcion*"),
	new WeaponItem("Guadaña extravagante","*imgID*", 25, 10, WeaponItem.lifeAbsorbtion(50), "*descripcion*")
];