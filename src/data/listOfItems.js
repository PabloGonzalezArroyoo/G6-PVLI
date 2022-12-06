import {WeaponItem} from '../inventory/item.js';

export var listOfItems = {
	weapons: [
		{key: "Cimitarra de madera",
		imgID: "cimMad", 
		attack: 25,
		defense: 3,
		queLocura: WeaponItem.areaAttack(10),
		desc: "Más que una cimitarra (un tipo de espada arabe si no sabes lo que es) parece un juguete, pero sigue haciendo pupa si se usa con rabia."}, 

		{key: "Cimitarra de acero",
		imgID: "cimAc", 
		attack: 35,
		defense: 5,
		queLocura: WeaponItem.areaAttack(20),
		desc: "¡Esto sí es un arma! Su filo puede cortar ingleses como si fueran hojas de té rancio.¡Cuidado que te cortas!."},

		{key: "Cimitarra loca",
		imgID: "cimLoc", 
		attack: 50,
		defense: 8,
		queLocura: WeaponItem.areaAttack(30),
		desc: "Este arma, forjada en el mismísimo Albacete (las mejores navajas) confiere a su portador una fuerza de locura, así como una furia ciega a todo lo que huela a fish&chips."},

		{key: "Daga Oxidada",
		imgID: "dagOx",
		attack: 35,
		defense: 0,
		queLocura: WeaponItem.bleeding(2),
		desc: "Esta daga está en tan mal estado que si quisieras untar queso en un sandwich con ella, destrozarías el pan. Que rabia da eso."},

		{key: "Daga Afilada",
		imgID: "dagAf", 
		attack: 55,
		defense: 1,
		queLocura: WeaponItem.bleeding(3),
		desc: "Para manejar este arma, necesitas la supervisión de un adulto o que los ingleses hayan matado a tu marido. Si este es el caso, usala para causar una muerte indolora (mentira)"},
		
		{key: "Daga Excéntrica",
		imgID: "dagEx", 
		attack: 70,
		defense: 3,
		queLocura: WeaponItem.bleeding(4),
		desc: "Esta arma, tan decorada y dorada, perteneció a un alto cargo inglés. Nunca más la echará de menos, ya que la tuvo clavada un tiempo en el esternón. Un corte muy limpio, sí."},

		{key: "Alabarda de marca blanca",
		imgID: "alMb", 
		attack: 20,
		defense: 7,
		queLocura: WeaponItem.stun(1, [100]),
		desc: "Su calidad deja mucho que desear, casi parece de plástico y tiene una etiqueta en la cabeza que marca “Carrefour”. Normal, que esperar de los franceses."},

		{key: "Alabarda de verdad",
		imgID: "alVrd", 
		attack: 30,
		defense: 10,
		queLocura: WeaponItem.stun(2, [100, 70]),
		desc: "Este hacha de peso considerable es un arma contundente que hace muy buena combinación cuando está clavada en el pecho de algún Sir de Wessex."},

		{key: "Alabarda demencial",
		imgID: "alDem", 
		attack: 40,
		defense: 15,
		queLocura: WeaponItem.stun(3, [100, 70, 30]),
		desc: "Este monstruo de la ingenieria medieval parece sacado del infierno o de los barrios de Londres, que es lo mismo. De artesanía vasca, sin duda es un arma muy eficaz partiendo piratas por la mitad."},

		{key: "Ropera Inglesa",
		imgID: "ropIng", 
		attack: 30,
		defense: 2,
		queLocura: WeaponItem.multipleAttack(2),
		desc: "Es tan endeble que si estocases con todas tus fuerzas a una manta, la punta se partiría. Menos mal que los bebe-hojas son igual de endebles."},

		{key: "Ropera Castellana",
		imgID: "ropCst", 
		attack: 40,
		defense: 4,
		queLocura: WeaponItem.multipleAttack(3),
		desc: "Armas dignas de los valientes soldados españoles y fabricadas en León. Capaces de causar terror con solo desenvainarlas."},

		{key: "Ropera alocada",
		imgID: "ropAl", 
		attack: 55,
		defense: 6,
		queLocura: WeaponItem.multipleAttack(4),
		desc: "Esta espada está tan afilada que parece de papel y es tan resistente que puede aguantar 300 elefantes sobre su filo. Es una locura que pueda existir un arma así y varios físicos han dejado su profesión al intentar estudiarla (no van a cobrar el paro)."},

		{key: "Sacho",
		imgID: "sacho", 
		attack: 32,
		defense: 1,
		queLocura: WeaponItem.lifeAbsorption(30),
		desc: "Herramienta de agricultura gallega que puede hacer daño, pero es incapaz de aguantar el ritmo de las armas normales en un combate. Eso sí, podrás arar sobre las tumbas de tus enemigos."},
		
		{key: "Fouciño",
		imgID: "fouc", 
		attack: 45,
		defense: 3,
		queLocura: WeaponItem.lifeAbsorption(40),
		desc: "Otra herramienta de jardinería pero útil en otras aplicaciones menos… pacíficas. Quita esas malas hierbas que son los ingleses y haz que su rey se lo beba con agua hervida."},

		{key: "Guadaña Extravagante",
		imgID: "guad", 
		attack: 60,
		defense: 4,
		queLocura: WeaponItem.lifeAbsorption(50),
		desc: "Has encontrado la guadaña de la Muerte y quiere que se la devuelvas. Tendrás que pagarle con vidas y, aunque la de los habitantes de la Pérfida Albión no valgan mucho, seguramente se conforme si la cantidad es grande. ¡Es hora de cosechar!"},
	
		{key: "Puño",
		imgID: "puño", 
		attack: 15,
		defense: 0,
		defense: 10,
		desc: "-"},

		{key: "Asta de Bandera",
		imgID: 'asta',
		attack: 80,
		defense: 15,
		desc: "Un clásico. Harás poco daño pero la satisfacción que te dará matar con esta arma no te la dará cualquier otra"}
	],

	healths: [
		{key: "Bolla de pan",
		imgID: "bolla", 
		heal: 20,
		desc: "Bolla de pan calentita y crujiente. Cura 20 de vida"},

		{key: "Caldo gallego",
		imgID: "caldo", 
		heal: 40,
		desc: "Caldo gallego típico de la zona, de lo mejorcito que puedes encontrar. Cura 40 de vida"},
		
		{key: "Polbo á feira",
		imgID: "polbo", 
		heal: 60,
		desc: "Polbo á feira, el plato tradicional por excelencia de la zona, un manjar en toda regla. Cura 60 de vida"},
	]
}

export var weaponsLevel1 = ["cimMad", "dagOx", "alMb", "ropIng", "sacho"];
export var weaponsLevel2 = ["cimAc", "dagAf", "alVrd", "ropCst", "fouc"];
export var weaponsLevel3 = ["cimLoc", "dagEx", "alDem", "ropAl", "guad"];
