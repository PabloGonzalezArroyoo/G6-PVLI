import EventDispatcher from "../combat/eventDispatcher.js";

// Objeto que funciona como contenedor de un sprite y un texto. En él se escribirá un texto y se pintará un sprite con una animación
// en concreto según la situación; además de moverse entre jugador ni enemigos. Por ejemplo, si Maria Pita recibe 10 puntos de daño,
// el indicador se posicionará al lado de la barra de Maria Pita, reproducirá la animación de daño y escribirá por encima "-10"
export default class Indicator extends Phaser.GameObjects.Container {
    constructor(scene, x, y, spriteSheets) {
        super(scene, x, y);
        this.textObj = new Phaser.GameObjects.Text(scene, x, y, "indicador", {fontFamily: 'Silkscreen', fontSize: 20});
        this.spriteObj = new Phaser.GameObjects.Sprite(scene, x, y, spriteSheets.dmgInd);
        this.scene.add.existing(this);
        this.scene.add.existing(this.spriteObj);
        this.scene.add.existing(this.textObj);

        // Animación de daño
        this.scene.anims.create({
            key: 'damage',
            frames: this.scene.anims.generateFrameNumbers(spriteSheets.dmgInd, {start: 0, end: 5}),
            frameRate: 20,
            repeat: 0
        });

        // Animación de curación
        this.scene.anims.create({
            key: 'health',
            frames: this.scene.anims.generateFrameNumbers(spriteSheets.healInd, {start: 0, end: 6}),
            frameRate: 20,
            repeat: 0
        });

        // Animación de defensa
        this.scene.anims.create({
            key: 'def',
            frames: this.scene.anims.generateFrameNumbers(spriteSheets.defInd, {start: 0, end: 9}),
            frameRate: 20,
            repeat: 0
        });

        // Animación de arma
        this.scene.anims.create({
            key: 'weapon',
            frames: this.scene.anims.generateFrameNumbers(spriteSheets.wpInd, {start: 0, end: 6}),
            frameRate: 20,
            repeat: 0
        });

        // Animación de veneno
        this.scene.anims.create({
            key: 'poison',
            frames: this.scene.anims.generateFrameNumbers(spriteSheets.psnInd, {start: 0, end: 5}),
            frameRate: 20,
            repeat: 0
        });

        // Animación de sangrado
        this.scene.anims.create({
            key: 'bleed',
            frames: this.scene.anims.generateFrameNumbers(spriteSheets.bleedInd, {start: 0, end: 5}),
            frameRate: 20,
            repeat: 0
        });

        // Eventos
        this.emitter = EventDispatcher.getInstance();

        // Desactivar el indicador, ya que no es necesario nada más crearse
        this.deactivateInd();

        // Ajustar escala
        this.spriteObj.setScale(2, 2);
    }

    // Devuelve el texto actual
    getText() { return this.textObj.text; }

    // Secuencia de llamadas para actualizar el indicador
    updateInd(actor, type, position, value) {
        this.activeInd();                                                   // Activar indicador
        this.setIndPosition(actor, position, type);                         // Posición
        this.setIndTex(value, type);                                        // Cambiar texto
        this.spriteObj.play(type);                                          // Reproducir animación
        this.scene.time.delayedCall(1200, () => {this.deactivateInd()});    // Desactivar después de un tiempo
    }
    
    // Hace que el indicador sea invisible
    deactivateInd() {
        this.spriteObj.setVisible(false);
        this.textObj.setVisible(false);
    }

    // Hace que el indicador sea visible
    activeInd() {
        this.spriteObj.setVisible(true);
        this.scene.time.delayedCall(200, ()=> {this.textObj.setVisible(true)}); // Sincronizar con animación
    }

    // Cambia la posición del indicador
    setIndPosition(actor, position, type) {
        // Posición en X
        if (actor === "player" && (type === "damage" || type === "bleed")) { // Si realiza la acción el jugador y es un ataque, posición en el enemigo
            this.textObj.x = position.x - 130;
            this.spriteObj.x = this.textObj.x + 20;
        }
        else {                                              // Si no es un ataque del jugador o es el ataque del enemigo, posición del jugador
            this.textObj.x = position.x + 90;
            if (type === "damage"|| type === "def") this.spriteObj.x = this.textObj.x + 20;
            else if (type === "health" || type === "weapon") this.spriteObj.x = this.textObj.x + 25;
        }
        
        // Posición en Y
        this.textObj.y = position.y - 18;
        if (type == "damage" || type === "weapon") this.spriteObj.y = this.textObj.y + 15; // Si es un ataque o se está cambiando de arma
        else this.spriteObj.y = this.textObj.y + 18;        // Si es de curación, sangrado o veneno
    }

    // Cambia el texto a mostrar y su color
    setIndTex(value, type) {
        this.textObj.setColor('#fffff8');
        if (type === "damage" || type === "poison" || type === "bleed") {
            if (type === "damage") this.textObj.setColor('#c50000');
            else if (type === "bleed") this.textObj.setColor('#fff209')
            this.textObj.text = "-" + Math.round(value);
        }
        else {
            if (type === "health") this.textObj.text = "+" + value;
            else if (type === "weapon") this.textObj.text = "↑" + value;
            else this.textObj.text = " ";
        }
    }
}