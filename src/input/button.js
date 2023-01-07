export default class Button extends Phaser.GameObjects.Sprite {
    // Recibe escena y posicion en ella, spritesheet y posiciones dentro del archivo de cada estado, y la funcion que se hace al click
    constructor(scene, x, y, spriteSheet, defaultFrame, frameOnOver, frameOnDown, keyboardInput, functionToDo, functionOnOver, functionOnOut) {
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
        this._functionOnOver = functionOnOver;
        this._functionOnOut = functionOnOut;
        //Keyboard para modificar
        //this._functionOnOver=functiononOver;
        this.keyboardInput = keyboardInput;
        this.adjacent = {};
    }

    // Click
    onClick() {
        this.setFrame(this._frameOnDown);
        if (this.scene.scene.key === 'titleScene' || this.scene.scene.key === 'cinematicScene' || this.scene.scene.key === 'inventoryScene') {
            this.select = this.scene.sound.add('select');
            this.select.play();
        }
    }

    // Al dejar de clicar
    onReleaseClick() {
        this.setFrame(this._frameOnOver);
        this._functionToDo();
    }

    // Al pasar por encima
    onOver() {
        if (this.keyboardInput) this.keyboardInput.changeButton(this);
        else this.selectButton();
        if (this._functionOnOver) this._functionOnOver();
    }

    // Al salir del botón
    onPointerOut() {
        if(this._functionOnOut) this._functionOnOut();
        this.setFrame(this._defaultFrame);
    }

    // Al seleccionar un botón
    selectButton(){
        this.setFrame(this._frameOnOver);
    }

    // Deolver si el frame es el de onOver
    isSelected(){
        return this.frame.name === this._frameOnOver;
    }

    // Devolver si el input está habilitado
    isEnabled(){
        return this.input.enabled;
    }

    // Asigna los botones adjacentes a este
    // Usado para acceder a estos a traves del input
    setAdjacents(up, down, left, right) {
        this.setAdjacent(up, "up");
        this.setAdjacent(down, "down");
        this.setAdjacent(left, "left");
        this.setAdjacent(right, "right");
    }
    
    // Asigna el boton dado en la direccion dada
    setAdjacent(button, direction){
        Object.defineProperty(this.adjacent, direction, {
            value: button,
            writable: true
        });
    }
}
