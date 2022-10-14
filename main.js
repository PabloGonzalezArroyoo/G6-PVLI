// Uso de la libreria Phaser 5

// Importar al player, enemigos, etc.
// import ...

// Cuando la ventana cargue...
// Realizar la recogida de datos, inicializacion, bucle de juego, etc.
window.onload = function()
{
	//Coge la resolucion de la pantalla del ordenador
	var width = window.screen.width * window.devicePixelRatio;
	var height = window.screen.height * window.devicePixelRatio;
	console.log(width,height);
	//Ajusta el body a la resolucion de la pantalla
	document.getElementById("body").style.width = width + "px";
	document.getElementById("body").style.height = height + "px";
};

