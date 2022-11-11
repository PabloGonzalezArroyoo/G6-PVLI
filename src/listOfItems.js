import Item from './item.js'
import { HealthItem, WeaponItem } from './item';

// Array de items al que acceder para saber a qué item se hace referencia
export var listOfItems = [
	// Items de curación (curativos)
	new HealthItem("Polbo á feira", 			"*archivo*", 60, "*descripcion*"),
	new HealthItem("Caldo gallego", 			"*archivo*", 40, "*descripcion*"),
	new HealthItem("Bolla de pan", 				"*archivo*", 20, "*descripción*"),

	// Items de daño (armas)
	new WeaponItem("Cimitarra de madera", 		"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Cimitarra de acero", 		"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Cimitarra loca", 			"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Daga Oxidada", 				"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Daga afilada", 				"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Daga excéntrica", 			"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Alabarda de marca blanca", 	"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Alabarda de verdad", 		"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Alabarda demencial", 		"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Ropera inglesa", 			"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Ropera castellana", 		"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Ropera alocada", 			"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Sacho", 					"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Fouciño", 					"*archivo*", 25, "*descripcion*"),
	new WeaponItem("Guadaña extravagante", 		"*archivo*", 25, "*descripcion*")
];