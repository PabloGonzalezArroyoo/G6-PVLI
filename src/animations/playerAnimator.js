export default class PlayerAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y, name){
		super(scene, x, y, name);
		this.currentAnimation = 'none';
		this.scene.add.existing(this);

		this.scene.anims.create({
		key: 'jump',
		frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 5}),
		frameRate: 7,
		repeat: 0
		});

		this.scene.anims.create({
		key: 'idle',
		frames: this.scene.anims.generateFrameNumbers('player', {start: 6, end: 11}),
		frameRate: 7,
		repeat: -1
		});
	}

	changeAnimation(name){
		this.currentAnimation = name;
	}

	preUpdate(t, dt){
		super.preUpdate(t, dt);

		if(this.anims.isPlaying === false){
			this.play('idle');
			this.currentAnimation = 'idle'
		}

		if(this.currentAnimation == 'jump'){
			this.play('jump',true);
			this.currentAnimation = 'none';
		}
	}
}