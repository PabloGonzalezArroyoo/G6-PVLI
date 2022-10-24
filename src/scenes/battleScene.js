// Importaciones
//import { Character } from '../character.js';
import { Button } from '../button.js';
import Phaser from '../lib/phaser.js';
import Player from '../player.js';
import {Enemy1} from '../enemy.js';
//import Button from '../button.js';

/**
 * Escena de Batalla.
 * @extends Phaser.Scene
 */
export default class BattleScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'battleScene' });
	}

	/**
	 * Inicializa variables
	 * - Cargar nivel seleccionado
	*/
	init() {

	}

	/**
	 * Cargamos todos los assets que vamos a necesitar:
	 * 		- Fondo
	 * 		- Hud
	 * 		- Personajes
	 */
	preload() {
		// Fondo
		this.load.image('battleBackground', 'assets/Escenas/EscenaCombate/EscenaCombate.png');
		// Maria Pita (Animaciones)
		this.load.spritesheet('player_idle', 'assets/MariaPita/MariaPita_Idle.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_idleBack', 'assets/MariaPita/MariaPita_IdleBack.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_jump', 'assets/MariaPita/MariaPita_Jump.png', {frameWidth: 32, frameHeight: 32});
		this.load.spritesheet('player_attack', 'assets/MariaPita/MariaPita_Attack.png', {frameWidth: 50, frameHeight: 32});

		// Enemy (Animaciones)
		this.load.spritesheet('enemy', 'assets/enemy.png', {frameWidth: 97, frameHeight: 97})
		// Descripcion
		this.load.image('description', 'assets/Escenas/EscenaCombate/Descripcion.png');
		// Acciones
		this.load.image('cuadroAcciones', 'assets/Escenas/EscenaCombate/CuadroAcciones.png');
		this.load.image('textoAcciones', 'assets/Escenas/EscenaCombate/Capas/textoAcciones.png');
		this.load.image('boton', 'assets/Escenas/EscenaCombate/Capas/Boton.png');
		
		// Barra de vida
		this.load.image('lifeBar', 'assets/GUI/lifeBar38x8.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		// Fondo
		var background = this.add.image(0, 0, 'battleBackground').setOrigin(0, 0);

		// Maria Pita
		var player = new Player(this, 250, 475);
			// Barra de vida de Maria Pita
			var player_lifeBar = this.add.image(player.x, player.y - 150, 'lifeBar').setScale(5, 5);
		//Enemy1
		var enemy = new Enemy1(this,750,200);

		// Descripcion
		var description = this.add.image(0, 0, 'description').setOrigin(0, 0);

		// Acciones
		var cuadroAcciones = this.add.image(0, 0, 'cuadroAcciones').setOrigin(0, 0);
		
		// Interactivo
		this.botones= [new Button(this, 135, 617, 'boton', 0, 0, 0, function() {player.attack()}), //Boton ataque
		new Button(this, 375, 617, 'boton', 0, 0, 0, function() {player.objects()}), //boton objetos
		new Button(this, 135, 697, 'boton', 0, 0, 0, function() {player.defense()}), //boton defensa
		new Button(this, 375, 697, 'boton', 0, 0, 0, function() {player.quelocura()})]; //boton ¡QUE LOCURA!
		/*this.lastMousePositionX= game.input.mousePointer.x;
		this.lastMousePositionY=game.input.mousePointer.y;*/
		this.beingUsed=0;
	    this.inputTeclas=false;
	    this.flechas = this.input.keyboard.addKeys('left, up, right, down, enter');

		var textoAcciones = this.add.image(0, 0, 'textoAcciones').setOrigin(0, 0);

		// Transicion escena
		this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('optionsScene');
        });
	}

	update() { 


		if(this.flechas.left.isDown&&(this.beingUsed===1||this.beingUsed===3))
		{
			this.inputTeclas=true;
			this.botones[this.beingUsed].onPointerOut();
			this.beingUsed-=1;
			this.botones[this.beingUsed].onOver();
			console.log('funciona izquierda');
		}
		
		else if(this.flechas.right.isDown&&(this.beingUsed===0||this.beingUsed===2))
		{
			this.inputTeclas=true;
			this.botones[this.beingUsed].onPointerOut();
			this.beingUsed+=1;
			this.botones[this.beingUsed].onOver();
			console.log('funciona derecha');
		}
		else if(this.flechas.down.isDown&&this.beingUsed+2<=3)
		{
			this.inputTeclas=true;
			this.botones[this.beingUsed].onPointerOut();
			this.beingUsed+=2;
			this.botones[this.beingUsed].onOver();
			console.log('funciona abajo');
		}
		else if(this.flechas.up.isDown&&this.beingUsed-2>=0)
		{
			this.inputTeclas=true;
			this.botones[this.beingUsed].onPointerOut();
			this.beingUsed-=2;
			this.botones[this.beingUsed].onOver();
			console.log('funciona arriba');
		}
		else if(this.flechas.enter.isDown)
		{
			this.botones[this.beingUsed].onReleaseClick();
			console.log('Funciona enter');
		}

		/*if(inputTeclas===true && (game.input.mousePointer.x!=lastMousePositionX||game.input.mousePointer.y!=lastMousePositionY))
		{
			inputTeclas=false;
			for(var i=0;i<4;i++)
			{
				botones[i].OnPointerOut();
			}
		}*/
		console.log(this.beingUsed);

	}
}
