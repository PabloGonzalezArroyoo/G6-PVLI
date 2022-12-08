//Esta clase es una libreria con las animaciones de los enemigos.
//Permite a los enemigos tener una animacion
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
		});
		
		if (this.spritesheet === 'ensignDrake') {
			this.setScale(10,10);
			this.noFlag = false;
			//animacion idle sin bandera
			this.scene.anims.create({
				key: this.defaultAnimation + '_noFlag',
				frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 9, end: 12}),
				frameRate: 6,
				repeat: -1
			});
			// animacion ataque sin bandera
			this.scene.anims.create({
				key: this.attackAnimation + '_noFlag',
				frames: this.scene.anims.generateFrameNumbers(spritesheet, {start: 13, end: 17}),
				frameRate: 6,
				repeat: 0
			});
		}

		// inicia con la animacion idle
		this.playIdle();
	}

	//cambia a la animacion Idle
	playIdle(){
		if (!this.noFlag) this.play(this.defaultAnimation);
		else this.play(this.defaultAnimation + '_noFlag');
	}

	playAttack(){
		if (!this.noFlag) this.play(this.attackAnimation);
		else this.play(this.attackAnimation + '_noFlag');
	}

	//pre-update que gestiona los posibles problemas de las animaciones
	preUpdate(t, dt){
		super.preUpdate(t, dt);
		//si no hay animacion vuelve a la animacion por defecto
		if(this.anims.isPlaying === false){
			this.playIdle();
		}
	}
}