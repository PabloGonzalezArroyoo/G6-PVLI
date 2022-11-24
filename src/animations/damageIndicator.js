import EventDispatcher from "../combat/eventDispatcher.js";

export default class DamageInd extends Phaser.GameObjects.GameObject {
    constructor(scene, x, y, spriteSheet) {
        super(scene, x, y);
        this.textObj = new Phaser.GameObjects.Text(scene, x, y, "hola", {fontFamily: 'Silkscreen', fontSize: 20});
        this.spriteObj = new Phaser.GameObjects.Sprite(scene, x, y, spriteSheet);
        this.scene.add.existing(this);
        this.scene.add.existing(this.spriteObj);
        this.scene.add.existing(this.textObj);

        this.emitter = EventDispatcher.getInstance();

        this.deactivateInd();
    }

    // Devuelve el texto actual
    getText() { return this.textObj.text; }

    // Secuencia de llamadas para actualizar el indicador
    updateInd(actor, position, type, value) {
        this.activeInd();
        this.setIndPosition(actor, position, type);
        this.setIndTex(value, type);
        this.scene.time.delayedCall(1200, () => {this.deactivateInd()});

        // this.emitter.once("animationcomplete-attack", () => {
        //    this.setIndPosition(position, type);
        //    this.setIndTex(value, type);
        // })
    }
    
    deactivateInd() {
        this.textObj.setVisible(false);
        this.spriteObj.setVisible(false);
    }

    activeInd() {
        this.textObj.setVisible(true);
        this.spriteObj.setVisible(true);
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
        else { 
            this.x = 400; 
            this.y = 400;
        }
        // console.log(this.textObj.x, this.textObj.y);
    }

    // Cambia el texto a mostrar y su color
    setIndTex(value, type) {
        this.textObj.text = "";
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