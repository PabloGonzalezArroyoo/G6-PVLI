import { Button } from "./button.js";

// Objeto State usado como un enum
const State = {
    locked: 0,
    unlocked: 1,
    complete: 2
}

export class Level extends Button {
    constructor(scene, x, y, defaultFrame, frameOnOver, frameOnDown, state, enemies, loot) {
        if (scene !== null) super(scene, x, y, 'level', defaultFrame + state * 3, frameOnOver + state * 3, frameOnDown + state * 3, function(){scene.scene.start('battleScene', enemies, loot)});
        else {
            this.x = x; this.y = y; this.defaultFrame; this.frameOnOver; this.frameOnDown;
        }
        this.state = state; // valor que indica si el nivel está bloqueado, desbloqueado o completado
        this.loot = loot; // array con todos los posibles items que dar al jugador al completar el nivel
        this.enemies = enemies; // array con todos los enemigos del nivel
    }

    setScene(scene) {
        super(scene, this.x, this.y, 'level', this.defaultFrame + this.state * 3, this.frameOnOver + this.state * 3, this.frameOnDown + this.state * 3, function(){scene.scene.start('battleScene', this.enemies, this.loot)});
    }

    setNextLevels(levels){
        this._nextLevels = levels;
    }

    unlockNextLevels(){
        for(let i = 0; i < this._nextLevels.length; i++){
            this._nextLevels[i].setUnlocked();
        }
    }

    // devuelve el estado actual del nivel
    getState(){return this._state;}

    // devuelve el enemigo pedido
    getEnemy(i){return this._enemies[i];}

    // devuelve los siguientes niveles del nivel pedido
    getNextLevels(){return this._nextLevels};

    // método que determina si el nivel actual se ha completado o no y que cambia su state si se ha completado
    completed(){
        let complete = true;
        let i = 0;
        while (i < this._enemies.length && complete){
            if (_this.enemies[i].getCurrentHealth() > 0) complete = false;
            i++;
        }
        if (complete) this.setCompleted();
        return complete;
    }

    // Marca el nivel como desbloqueado y cambia el sprite
    setUnlocked() {
        this._state = State.unlocked;
        this.changeSpriteState(this._state);
    }

    // Marca el nivel como completado y cambia el sprite
    setCompleted() {
        this._state = State.complete;
        this.changeSpriteState(this._state);
        this.unlockNextLevels();
    }

    // Cambia el sprite según el estado del nivel
    changeSpriteState(state) {
        this._defaultFrame += state * 3;
        this._frameOnDown += state * 3;
        this._frameOnOver += state * 3;
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