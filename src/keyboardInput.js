import phaser from "./lib/phaser.js";
export class keyboard
{
    constructor(scene) {
        this.beingUsed = 0;
        this.inputKeyboard = false;
        this._scene = scene;
        this.arrows = scene.input.keyboard.addKeys('left, up, right, down, enter');
        this._buttonArray
        this._cursorPositionX = scene.input.mousePointer.x;
        this._cursorPositionY = scene.input.mousePointer.y;
    }

    setStartButton(button) {
        this.button = button;
    }

    unselectButton() {
        this.button.onPointerOut();
    }

    changeButton(button) {
        this.unselectButton();
        this.button = button;
        this.button.selectButton();
    }

    // Procesa el input
    processInput() {
        this._scene.input.keyboard.on('keydown',() => {
            if (phaser.Input.Keyboard.JustDown(this.arrows.up) && this.button.adjacent[0]) 
                this.changeButton(this.button.adjacent[0]);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.down) && this.button.adjacent[1]) 
                this.changeButton(this.button.adjacent[1]);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.left) && this.button.adjacent[2]) 
                this.changeButton(this.button.adjacent[2]);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.right) && this.button.adjacent[3]) 
                this.changeButton(this.button.adjacent[3]);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.enter)) 
                this.button.onReleaseClick();
        });

/*
        if (this.inputKeyboard && (this._cursorPositionX != this._scene.input.mousePointer.x || this._cursorPositionY != this._scene.input.mousePointer.y)) {
            for (var i = 0; i < self._buttonArray.length; i++) self._buttonArray[i].onPointerOut();
            this.inputKeyboard = false;
        }*/
    }
}