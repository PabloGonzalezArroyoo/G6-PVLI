export default class EnemyAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y, spritesheet){
		super(scene, x, y, spritesheet);
		this.scene.add.existing(this);
		this.setScale(6,6);

		this.spritesheet = spritesheet;
		this.defaultAnimation = this.spritesheet + '_idle';
		this.attackAnimation = this.spritesheet + 'attack';

		//animacion idle
		this.scene.anims.create({
			key: this.defaultAnimation,
			frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 0, end: 3}),
			frameRate: 6,
			repeat: -1
		});
		// animacion ataque
		this.scene.anims.create({
			key: this.attackAnimation,
			frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 4, end: 8}),
			frameRate: 6,
			repeat: 0
		})

		// inicia con la animacion idle
		this.playIdle();
	}

	//cambia a la animacion Idle
	playIdle(){
		this.play(this.defaultAnimation);
	}

	playAttack(){
		this.play(this.attackAnimation);
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