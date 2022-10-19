export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'MariaPita')
        //this._defense;
        //this._defenseBoost;

        this.scene.add.existing(this);

        // Animaciones
        this.scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('MariaPita_idle', {start: 0, end: 5}),
            framesRate: 5,
            repeat: -1 });
        
        this.scene.anims.create({
            key: 'idleBack',
            frames: scene.anims.generateFrameNumbers('MariaPita_idleBack', {start: 0, end: 5}),
            framesRate: 5,
            repeat: -1 });
        
        this.scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('MariaPita_jump', {start: 0, end: 5}),
            framesRate: 5,
            repeat: -1 });

        this.setScale(10, 10);
        
        //this.play('idle');
        this.play('idleBack');
        //this.play('jump');
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
    }
}