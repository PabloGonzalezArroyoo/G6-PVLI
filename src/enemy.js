import {entity} from '/entity.js'

export class Enemy extends entity {
    constructor(name, position, scale, rotation, color, imgId) {
        super(name, position, scale, rotation, color, imgId);
    }
}

export class enemy1 extends Enemy {
    constructor(name, position, scale, rotation, color, imgId) {
        super(name, position, scale, rotation, color, imgId);
    }
}
