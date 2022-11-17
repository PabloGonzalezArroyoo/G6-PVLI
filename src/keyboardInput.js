import phaser from "./lib/phaser.js";
export class keyboard
{
    constructor(scene) {
        this.inputKeyboard = false;
        this._scene = scene;
        this.arrows = scene.input.keyboard.addKeys('left, up, right, down, enter');
        this._cursorPositionX = scene.input.mousePointer.x;
        this._cursorPositionY = scene.input.mousePointer.y;
    }

    setStartButton(button) {
        this.button = button;
        //this.button.selectButton();
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
            if (phaser.Input.Keyboard.JustDown(this.arrows.up) && this.button.adjacent.up) 
                this.changeButton(this.button.adjacent.up);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.down) && this.button.adjacent.down) 
                this.changeButton(this.button.adjacent.down);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.left) && this.button.adjacent.left) 
                this.changeButton(this.button.adjacent.left);
            else if (phaser.Input.Keyboard.JustDown(this.arrows.right) && this.button.adjacent.right) 
                this.changeButton(this.button.adjacent.right);
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