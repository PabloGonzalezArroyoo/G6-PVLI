export default class DialogBox extends Phaser.GameObjects.Text {
	constructor(scene, x, y, width){
		super(scene,x,y);
		this.scene.add.existing(this);
		this.textToDisplay = '';
		this.timePerLetter = 40;
		this.isWritting = false;
		this.letterPos = 0;

		this.setWordWrapWidth(width); //Indica cuando hace el salto de linea
		this.setLineSpacing(15); // Indica el espaciado entre lineas
	}

	//Este metodo sirve para pasarle el texto que se quiere escribir, el maximo de caracteres es de 210
	setTextToDisplay(text){
	//En caso de que se este escribiendo algo sale un error e impide que se pise el texto actual
		if(this.isWritting === false){
			this.textToDisplay = text;
			this.isWritting = true;
		}
		else
			console.log('Ya se esta escribiendo un texto'); 
	}

	//Permite cambiar la velocidad de escritura
	setTimePerLetter(time){
		this.timePerLetter = time;
	}

	//Se llama en un update y escribe letra por letra el texto
	write(){
		//Si llega al final del texto devuelve la posicion a 0 y cambia el estado de escribiendo a false
		if(this.textToDisplay.length <= this.letterPos){
			this.isWritting = false;
			this.letterPos = 0;
			return;
		}
		let letter = this.textToDisplay.charAt(this.letterPos);
		this.text += letter;
		this.updateText();
		this.letterPos++;
	}

	//Este metodo imprime directamente todo el texto en pantalla
	printText(){
		this.text = this.textToDisplay;
		this.updateText();
		this.isWritting = false;
	}

	//Limpia el texto escrito y el texto a escribir ¡¡IMPORTANTE LLAMAR A LA FUNCION CADA VEZ QUE SE QUIERA ESCRIBIR UN NUEVO TEXTO!!
	clearText(){
		this.text = '';
		this.textToDisplay = '';
		this.letterPos = 0;
		this.isWritting = false;
		this.updateText();
	}
}