export default class EnemyAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y, spritesheet){
		super(scene, x, y, spritesheet);
		this.defaultAnimation = this.spritesheet + '_idle';
		this.scene.add.existing(this);
		this.setScale(6,6);

		//animacion idle
		this.scene.anims.create({
		key: this.spritesheet + '_idle',
		frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 0, end: 3}),
		frameRate: 6,
		repeat: -1
		});
		this.scene.anims.create({
			key: this.spritesheet + '_attack',
			frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 4, end: 8}),
			frameRate: 6,
			repeat: 0
		})

		// inicia con la animacion idle
		this.playIdle();
	}

	//cambia a la animacion Idle
	playIdle(){
		this.play(this.spritesheet + '_idle');
	}

	playAttack(){
		this.play(this.spritesheet + '_attack');
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