import { Position, Scale, Rotation } from './entity'
import {Enemy} from '/characters/enemy.js'

export var listOfEnemies = [
    new Enemy("enemy1_1", new Position(0,0), new Scale(10,10), new Rotation(0,0,0), 'white', 'enemy1'),
    new Enemy("enemy1_2", new Position(0,50), new Scale(10,10), new Rotation(0,0,0), 'black', 'enemy2'),
    new Enemy("enemy1_3", new Position(0,100), new Scale(10,10), new Rotation(0,0,0), 'grey', 'enemy3')
];