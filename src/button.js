
export class Button extends Phaser.GameObjects.Sprite {
    // Recibe escena y posicion en ella, spritesheet y posiciones dentro del archivo de cada estado, y la funcion que se hace al click
    constructor(scene, x, y, spriteSheet, defaultFrame, frameOnOver, frameOnDown, functionToDo) {
        super(scene, x, y, spriteSheet,defaultFrame);

        // Añadir el botón a la escena y hacer interactivo
        scene.add.existing(this);
        this.setInteractive();
        
        // Eventos
        this.on('pointerdown',this.onClick);
        this.on('pointerup',this.onReleaseClick);
        this.on('pointerover',this.onOver);
        this.on('pointerout',this.onPointerOut);
        
        // Sprites de cada estado
        this._defaultFrame = defaultFrame;
        this._frameOnOver = frameOnOver;
        this._frameOnDown = frameOnDown;
        
        // Funcion al clickar
        this._functionToDo = functionToDo;
    }
    onClick() {
        this.setFrame(this.FrameOnDown);
    }
    onReleaseClick() {
        this.setFrame(this.defaultFrame);
        this._functionToDo();
    }
    onOver() {
        this.setFrame(this.frameOnOver);
    }
    onPointerOut() {
        this.setFrame(this.defaultFrame);
    }
}
