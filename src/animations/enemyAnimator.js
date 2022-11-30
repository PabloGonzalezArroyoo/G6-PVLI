export default class EnemyAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y, spritesheet){
		super(scene, x, y, spritesheet);
		this.defaultAnimation = spritesheet;
		this.scene.add.existing(this);
		this.setScale(6,6);

		//animacion idle
		this.scene.anims.create({
		key: 'idle',
		frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 0, end: 3}),
		frameRate: 6,
		repeat: -1
		});
		this.scene.anums.create({
			key: 'attack',
			frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 4, end: 8}),
			frameRate: 6,
			repeat: 0
		})

		// inicia con la animacion idle
		this.playIdle();
	}

	//cambia a la animacion Idle
	playIdle(){
		this.play('_idle');
	}

	playAttack(){
		this.play('attack');
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