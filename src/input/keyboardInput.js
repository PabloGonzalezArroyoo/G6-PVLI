import phaser from "../lib/phaser.js";

export default class KeyboardInput {
    constructor(scene) {
        this._scene = scene;
        this.arrows = scene.input.keyboard.addKeys('left, up, right, down, enter');
        scene.input.keyboard.on('keydown', ()=>{this.processInput();});
    }

    // Asigna un boton inicial
    setStartButton(button) {
        this.button = button;
    }
    // Llama a la funcion al salir del boton sin la necesidad del evento de raton
    unselectButton() {
        this.button.onPointerOut();
    }

    // Cambia el boton actual
    changeButton(button) {
        this.unselectButton();
        this.button = button;
        this.button.selectButton();
    }

    // Si el boton esta seleccionado se ejecuta la funcion pedida
    // en caso contrario se selecciona el boton
    onPressedKey(func) {
        if (this.button.isSelected()) {
            func();
            if (this.button._functionOnOver) this.button._functionOnOver();
        } else {
            this.button.selectButton();
        }
    }

    // Procesa el input
    processInput() {
        if (this.button.isEnabled()) {
            if (phaser.Input.Keyboard.JustDown(this.arrows.up) && this.button.adjacent.up) 
                this.onPressedKey(() => {
                    this.changeButton(this.button.adjacent.up);
                });
            else if (phaser.Input.Keyboard.JustDown(this.arrows.down) && this.button.adjacent.down) 
                this.onPressedKey(() => {
                    this.changeButton(this.button.adjacent.down);
                });
            else if (phaser.Input.Keyboard.JustDown(this.arrows.left) && this.button.adjacent.left) 
                this.onPressedKey(() => {
                    this.changeButton(this.button.adjacent.left);
                });
            else if (phaser.Input.Keyboard.JustDown(this.arrows.right) && this.button.adjacent.right) 
                this.onPressedKey(() => {
                    this.changeButton(this.button.adjacent.right);
                });
            else if (phaser.Input.Keyboard.JustDown(this.arrows.enter)) 
                this.onPressedKey(() => {
                    this.button.onReleaseClick();
                });
            else this.button.selectButton();
        }
    }
}