import Entity from "./entity";

// Objeto State usado como un enum
const State = {
    locked: 0,
    unlocked: 1,
    complete: 2
}

export class Level extends Entity {
    constructor(name, position, scale, rotation, color, imgId, state, loot, enemies) {
        super(name, position, scale, rotation, color, imgId);
        this._state = state; // valor que indica si el nivel está bloqueado, desbloqueado o completado
        this._loot = loot; // array con todos los posibles items que dar al jugador al completar el nivel
        this._enemies = enemies; // array con todos los enemigos del nivel
    }


    // devuelve el estado actual del nivel
    getState(){return this._state;}

    // devuelve el enemigo pedido
    getEnemy(i){return this._enemies[i];}

    // método que determina si el nivel actual se ha completado o no y que cambia su state si se ha completado
    completed(){
        let complete = true;
        let i = 0;
        while (i < this._enemies.length && complete){
            if (_this.enemies[i].getCurrentHealth() > 0) complete = false;
            i++;
        }
        if (complete) this._state = State.complete;
        return complete;
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