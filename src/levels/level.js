import EventDispatcher from "../combat/eventDispatcher.js";

// Objeto State usado como un enum
const State = {
    locked: 0,
    unlocked: 1,
    complete: 2
}

export class Level {
    constructor(levelData) {
        this.x = levelData.x; this.y = levelData.y;
        this.state = State.locked;
        this.level1prob = levelData.level1prob;
        this.level2prob = levelData.level2prob;
        this.level3prob = levelData.level3prob;
        this.enemies = levelData.enemies; // array con todos los enemigos del nivel

        this.spriteSheet = 'level';
        this.defaultFrame = 0 + this.state * 3;
        this.frameOnOver = 1 + this.state * 3;
        this.frameOnDown = 2 + this.state * 3;
        this.emitter = EventDispatcher.getInstance();
    }
    
    // Carga el nivel si no está bloqueado, emitiendo un evento que pasa los valores del nivel
    loadLevel(inventory){
        if (this.state !== State.locked) {
            this.emitter.emit('levelSelected', {level: this, inventory: inventory});
            this.emitter.destroy();
        }
    }

    // Asigna al array de siguientes niveles los correspondientes
    setNextLevels(levels){
        this.nextLevels = levels;
    }

    // Desbloquea los siguientes niveles
    unlockNextLevels(){
        if (this.nextLevels){
            this.nextLevels.forEach(level => {
                level.setUnlocked();
            });   
        }
    }

    // devuelve el estado actual del nivel
    getState(){return this.state;}

    // devuelve el enemigo pedido
    getEnemy(i){return this.enemies[i];}

    // devuelve los siguientes niveles del nivel pedido
    getNextLevels(){return this.nextLevels};

    // Marca el nivel como desbloqueado y cambia el sprite
    setUnlocked() {
        if(this.state === State.locked)this.changeState(State.unlocked);
    }

    // Marca el nivel como completado y cambia el sprite
    setCompleted() {
        this.changeState(State.complete);
        this.unlockNextLevels();
    }

    // Cambia el estado del nivel y adecúa el sprite
    changeState(state) {
        this.state = state;
        this.defaultFrame = this.defaultFrame % 3 + state * 3;
        this.frameOnOver = this.frameOnOver % 3 + state * 3;
        this.frameOnDown = this.frameOnDown % 3 + state * 3;
    }
}