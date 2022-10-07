window.onload = function()
{
	var width = window.screen.width * window.devicePixelRatio - 100;
	var height = window.screen.height * window.devicePixelRatio - 200;
	console.log(width,height);
	document.getElementById("pagina").style.width = width + "px";
	document.getElementById("pagina").style.height = height + "px";
};