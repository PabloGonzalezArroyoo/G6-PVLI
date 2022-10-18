export class SpriteAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y, name){
		super(scene, x, y, name);

		this.scene.add.existing(this);
	}

	//name es el nombre de la animacion y repeat esta por defecto en que se repita
	añadirAnimacion(name, start, end, repeat = -1){
		this.scene.anims.create({
		key: name,
		frames: scene.anims.generateFrameNumbers(this.name, {start:start, end:end}),
		frameRate: 5,
		repeat: repeat
		});
	}

	//name es el nombre de la animacion
	playAnimation(name){
		this.play(name);
	}

	stopAnimation(){
		this.stop();
	}
}