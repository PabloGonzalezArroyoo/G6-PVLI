import {entity} from '/entity.js'

export class player extends entity {
    constructor(name, position, scale, rotation, color, imgId) {
        super('Maria Pita', position, scale, rotation, color, imgId);
    }
}