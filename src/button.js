
export class Button extends Phaser.GameObjects.Sprite {
    constructor(scene,spriteSheet,defaultFrame,frameOnOver,FrameOnDown,x,y,laFuncion) 
    {
        super(scene, x, y, spriteSheet,defaultFrame);
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown',this.onClick);
        this.on('pointerup',this.onReleaseClick);
        this.on('pointerover',this.onOver);
        this.on('pointerout',this.onPointerOut);  
        this.functionToDo=laFuncion;
    }
    onClick()
    {
        this.setFrame(this.FrameOnDown);
    }
    onReleaseClick()
    {
        this.setFrame(this.defaultFrame);
        this.functionToDo();
    }
    onOver()
    {
        this.setFrame(this.frameOnOver);
    }
    onPointerOut()
    {
        this.setFrame(this.defaultFrame);
    }
}
