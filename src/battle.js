export class Battle extends Phaser.Scene{
	constructor() {
		super({ key: 'animation' });
	}

	preload(){
		this.load.image('battlefield', '../assets/castle.gif');
		this.load.spritesheet('player', '../assets/MariaPita01.png', {frameWidth: 32, frameHeight: 32});
	}

	create(){
		this.add.image(0, 0, 'battlefield').setOrigin(0, 0);

		let player = new Player();
	}

}