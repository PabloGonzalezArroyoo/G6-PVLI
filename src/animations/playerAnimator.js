//Esta clase actua como una libreria de animaciones para el jugador
//Permite al jugador tener animaciones
export default class PlayerAnimator extends Phaser.GameObjects.Sprite{
	// Name es el nombre del spritesheet
	constructor(scene, x, y){
		super(scene, x, y, 'player');
		this.defaultAnimation = 'idleBack';
		this.scene.add.existing(this);

		// Animación idle de espaldas
		this.scene.anims.create({
            key: 'idleBack',
            frames: scene.anims.generateFrameNumbers('player_idleBack', {start: 0, end: 5}),
            framesRate: 7,
            repeat: -1 
        });

		// Animación de ataque
		this.scene.anims.create({
			key: 'attack',
			frames: scene.anims.generateFrameNumbers('player_attack', {start: 0, end: 5}),
			framesRate: 7,
			repeat: 0 
		});

		// Animación de defensa
		this.scene.anims.create({
			key: 'defense',
			frames: scene.anims.generateFrameNumbers('player_defendBack',{start:0, end:5}),
			frameRate: 7,
			repeat: 0 
		});
		
		// Animación de qué locura
		this.scene.anims.create({
			key: 'whatAmadness',
			frames: scene.anims.generateFrameNumbers('player_whatAmadness',{start:0, end:8}),
			frameRate: 7,
			repeat: 0 
		});

		// Inicia con la animacion idle
		this.play('idleBack');
		this.setScale(10,10);
	}

	//cambia a la animacion IdleBack
	playIdleBack() {
		this.play('idleBack');
	}

	//cambia a la animacion Attack
	playAttack() {
		this.play('attack');
	}

	playDefense() {
		this.play('defense');
	}

	playWhatAMadness() {
		this.play('whatAmadness');
	}

	//pre-update que gestiona los posibles problemas de las animaciones
	preUpdate(t, dt){
		super.preUpdate(t, dt);

		//si no hay animacion vuelve a la animacion por defecto
		if (this.anims.isPlaying === false){
			this.play(this.defaultAnimation);
		}
	}
} 