export default class EnemyAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y, spritesheet){
		super(scene, x, y, spritesheet);
		this.defaultAnimation = spritesheet + '_idle';
		this.scene.add.existing(this);
		this.setScale(3,3);

		//animacion idle
		this.scene.anims.create({
		key: spritesheet + '_idle',
		frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 0, end: 3}),
		frameRate: 6,
		repeat: -1
		});

		// inicia con la animacion idle
		this.play(spritesheet + '_idle');
	}

	//cambia a la animacion Idle
	playIdle(){
		this.play(spritesheet + '_idle');
	}

	//pre-update que gestiona los posibles problemas de las animaciones
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		//si no hay animacion vuelve a la animacion por defecto
		if(this.anims.isPlaying === false){
			this.play(this.defaultAnimation);
		}
	}
}