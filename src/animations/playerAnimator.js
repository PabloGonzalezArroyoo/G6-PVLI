export default class PlayerAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y){
		super(scene, x, y, 'player');
		this.defaultAnimation = 'idleBack';
		this.scene.add.existing(this);

		//animacion jump
		this.scene.anims.create({
			key: 'jump',
			frames: this.scene.anims.generateFrameNumbers('player_jump', {start: 0, end: 5}),
			frameRate: 7,
			repeat: 0
		});

		//animacion idle
		this.scene.anims.create({
			key: 'idle',
			frames: this.scene.anims.generateFrameNumbers('player_idle', {start: 0, end: 5}),
			frameRate: 7,
			repeat: -1
		});
		//animación idle de espaldas
		this.scene.anims.create({
            key: 'idleBack',
            frames: scene.anims.generateFrameNumbers('player_idleBack', {start: 0, end: 5}),
            framesRate: 7,
            repeat: -1 
        });
		//animación de ataque
		this.scene.anims.create({
			key: 'attack',
			frames: scene.anims.generateFrameNumbers('player_attack', {start: 0, end: 5}),
			framesRate: 7,
			repeat: 0 
		});
		//animación de defensa
		this.scene.anims.create({
			key: 'defense',
			frames: scene.anims.generateFrameNumbers('mariaPita_defendBack',{start:0, end:5}),
			frameRate: 7,
			repeat: 0 
		});

		// inicia con la animacion idle
		this.play('idleBack');
		this.setScale(10,10);
	}

	//cambia a la animacion Jump
	playJump(){
		this.play('jump');
	}

	//cambia a la animacion Idle
	playIdle(){
		this.play('idle');
	}

	//cambia a la animacion IdleBack
	playIdleBack(){
		this.play('idleBack');
	}

	//cambia a la animacion Attack
	playAttack(){
		this.play('attack');
	}
	playDefense(){
		this.play('defense');
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