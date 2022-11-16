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
	new WeaponItem("Cimitarra de madera","cimitarraMadera", 25, "*descripcion*"),
	new WeaponItem("Cimitarra de acero","cimitarraAcero", 25,"*descripcion*"),
	new WeaponItem("Cimitarra loca","cimitarraLoca", 25, "*descripcion*"),
	new WeaponItem("Daga Oxidada","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Daga afilada","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Daga excéntrica","*imgID*", "*descripcion*"),
	new WeaponItem("Alabarda de marca blanca","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Alabarda de verdad","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Alabarda demencial","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Ropera inglesa","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Ropera castellana","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Ropera alocada","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Sacho","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Fouciño","*imgID*", 25, "*descripcion*"),
	new WeaponItem("Guadaña extravagante","*imgID*", 25, "*descripcion*")
];