import {DrunkRuffian, StinkyPirate, ScurviedSailor, ExperiencedBuccaneer, AlienatedCorsair, EnsignDrake} from '../characters/enemy.js'

//Los nombres de las propiedades deben coincidir con las claves del spritesheet para mayor manejo
//Se trata de una lista con los enemigos
export var listOfEnemies = {
    drunkRuffian: function(scene, x, y){return new DrunkRuffian(scene, x, y);},
    stinkyPirate: function(scene, x, y){return new StinkyPirate(scene, x, y);},
    scurviedSailor: function(scene, x, y){return new ScurviedSailor(scene, x, y);},
    experiencedBuccaneer: function(scene, x, y){return new ExperiencedBuccaneer(scene, x, y);},
    alienatedCorsair: function(scene, x, y){return new AlienatedCorsair(scene, x, y);},
    ensignDrake: function(scene, x, y){return new EnsignDrake(scene, x, y);}
};