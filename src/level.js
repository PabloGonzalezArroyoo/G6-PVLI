import { Button } from "./button.js";

// Objeto State usado como un enum
const State = {
    locked: 0,
    unlocked: 1,
    complete: 2
}

export class Level/* extends Button */{
    constructor(scene, x, y, defaultFrame, frameOnOver, frameOnDown, state, enemies, loot) {
        if (scene !== null) this.button = new Button(scene, x, y, 'level', defaultFrame + state * 3, frameOnOver + state * 3, frameOnDown + state * 3, function(){scene.scene.start('battleScene', enemies, loot)});
        else {
            this.button = null;
            this.x = x; this.y = y;
            this.defaultFrame = defaultFrame + state * 3;
            this.frameOnOver = frameOnOver + state * 3;
            this.frameOnDown = frameOnDown + state * 3;
        }
        this.state = state; // valor que indica si el nivel está bloqueado, desbloqueado o completado
        this.loot = loot; // array con todos los posibles items que dar al jugador al completar el nivel
        this.enemies = enemies; // array con todos los enemigos del nivel
    }

    setScene(scene) {
        let self = this;
        this.button = new Button(scene, this.x, this.y, 'level', this.defaultFrame, this.frameOnOver, this.frameOnDown, function(){scene.scene.start('battleScene', self.enemies, self.loot);});
    }

    setNextLevels(levels){
        this.nextLevels = levels;
    }

    unlockNextLevels(){
        for(let i = 0; i < this.nextLevels.length; i++){
            this.nextLevels[i].setUnlocked();
        }
    }

    // devuelve el estado actual del nivel
    getState(){return this.state;}

    // devuelve el enemigo pedido
    getEnemy(i){return this.enemies[i];}

    // devuelve los siguientes niveles del nivel pedido
    getNextLevels(){return this.nextLevels};

    // método que determina si el nivel actual se ha completado o no y que cambia su state si se ha completado
    completed(){
        let complete = true;
        let i = 0;
        while (i < this.enemies.length && complete){
            if (this.enemies[i].getCurrentHealth() > 0) complete = false;
            i++;
        }
        if (complete) this.setCompleted();
        return complete;
    }

    // Marca el nivel como desbloqueado y cambia el sprite
    setUnlocked() {
        this.state = State.unlocked;
        this.changeSpriteState(this.state);
    }

    // Marca el nivel como completado y cambia el sprite
    setCompleted() {
        this.state = State.complete;
        this.changeSpriteState(this.state);
        this.unlockNextLevels();
    }

    // Cambia el sprite según el estado del nivel
    changeSpriteState(state) {
        this.defaultFrame = state * 3;
        this.frameOnDown = state * 3;
        this.frameOnOver = state * 3;
    }

    // No sé si funciona este método pero sería graciosísimo que sí
    /*
    // Devuelve un array con los items dropeados
    dropLoot(n){
        // copia del array de loot
        let posibleLoot = this._loot;
        let droppedLoot;
        // bucle para añadir loot a devolver hasta que no se quiera más o no quede más
        for(let i = 0; i < n && posibleLoot.length > 0; i++){
            // obtener un elemento aleatorio de posibleLoot
            let item = Math.floor(Math.random() * posibleLoot.length);
            // añadir el item escogido al drop
            droppedLoot[i] = posibleLoot[item];
            // intercambiar el dropeado con el último
            let temp = posibleLoot[item];
            posibleLoot[item] = posibleLoot[posibleLoot.length - 1];
            posibleLoos[posibleLoot.length - 1] = temp;
            // descartar el último de los posibles items a dropear
            posibleLoot.length--;
        }
        return dropLoot;
    }*/
}