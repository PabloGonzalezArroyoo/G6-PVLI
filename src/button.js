import { keyboard } from "./keyboardInput.js";
export class Button extends Phaser.GameObjects.Sprite {
    // Recibe escena y posicion en ella, spritesheet y posiciones dentro del archivo de cada estado, y la funcion que se hace al click
    constructor(scene, x, y, spriteSheet, defaultFrame, frameOnOver, frameOnDown, keyboard, functionToDo) {
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
        //Keyboard para modificar
        //this._functionOnOver=functiononOver;
        this.keyboard = keyboard;
    }
    onClick() {
        this.setFrame(this._frameOnDown);
    }
    onReleaseClick() {
        this.setFrame(this._frameOnOver);
        this._functionToDo();
    }
    onOver() {
        if (this.keyboard) this.keyboard.changeButton(this);
        else this.selectButton();
    }
    onPointerOut() {
        this.setFrame(this._defaultFrame);
    }

    selectButton(){
        this.setFrame(this._frameOnOver);
    }

    setAdjacents(up, down, left, right) {
        this.adjacent = [];
        for (let i = 0; i < arguments.length; i++)
            if (!this.adjacent[i]) this.adjacent[i] = arguments[i];
    }
}
