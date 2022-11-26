import EventDispatcher from "../combat/eventDispatcher.js";

export default class Indicator extends Phaser.GameObjects.GameObject {
    constructor(scene, x, y, spriteSheet) {
        super(scene, x, y);
        this.textObj = new Phaser.GameObjects.Text(scene, x, y, "indicador", {fontFamily: 'Silkscreen', fontSize: 20});
        this.spriteObj = new Phaser.GameObjects.Sprite(scene, x, y, spriteSheet);
        this.scene.add.existing(this);
        this.scene.add.existing(this.spriteObj);
        this.scene.add.existing(this.textObj);

        this.scene.anims.create({
            key: 'damage',
            frames: this.scene.anims.generateFrameNumbers(spriteSheet, {start: 0, end: 5}),
            frameRate: 20,
            repeat: 0
        });

        this.emitter = EventDispatcher.getInstance();

        this.deactivateInd();

        this.spriteObj.setScale(2, 2);
    }

    // Devuelve el texto actual
    getText() { return this.textObj.text; }

    // Secuencia de llamadas para actualizar el indicador
    updateInd(actor, type, position, value) {
        this.activeInd();
        this.setIndPosition(actor, position, type);
        this.setIndTex(value, type);
        this.spriteObj.play(type);
        this.scene.time.delayedCall(1200, () => {this.deactivateInd()});

        // this.emitter.once("animationcomplete-attack", () => {
        //    this.setIndPosition(position, type);
        //    this.setIndTex(value, type);
        // })
    }
    
    // Hace que el indicador sea invisible
    deactivateInd() {
        this.spriteObj.setVisible(false);
        this.textObj.setVisible(false);
    }

    // Hace que el indicador sea visible
    activeInd() {
        this.spriteObj.setVisible(true);
        this.scene.time.delayedCall(200, ()=> {this.textObj.setVisible(true)});
    }

    // Cambia la posición del indicador
    setIndPosition(actor, position, type) {
        // console.log(this.textObj.x, this.textObj.y);
        if (type === "damage") {
            if (actor === "player") {
                this.textObj.x = position.x - 120;
                this.spriteObj.x = this.textObj.x + 20;
            }
            else {
                this.textObj.x = position.x + 90;
                this.spriteObj.x = this.textObj.x + 20;
            }
            
            this.textObj.y = position.y - 165;
            
            this.spriteObj.y = this.textObj.y + 15;
        }
        else { this.x = 400; this.y = 400; }
        // console.log(this.textObj.x, this.textObj.y);
    }

    // Cambia el texto a mostrar y su color
    setIndTex(value, type) {
        this.textObj.text = "-" + value;
        if (type === "damage") this.textObj.setColor('#c50000');
        else this.textObj.setColor('#38ff00');
    }

    // Cambia la posición de ambos objetos (texto y sprite)
    changeBothPositions(postion) {
        this.textObj.x = postion.x;
        this.textObj.y = postion.y;
        this.spriteObj.x = postion.x;
        this.spriteObj.y = postion.y;
    }
}