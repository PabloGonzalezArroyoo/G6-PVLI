import Character from './character.js'
import EnemyAnimator from '../animations/enemyAnimator.js'
import HealthController from './healthController.js';
import EventDispatcher from '../combat/eventDispatcher.js';

// Clase base Enemy
export class Enemy extends Character {
    constructor(scene, x, y, spritesheet, maxHealth, damage) {
        super(x, y, new EnemyAnimator(scene, x, y, spritesheet), new HealthController(scene, x, y - 150, maxHealth), damage);
        this.scene = scene;
        //Hacer al enemigo interactuable
        this.emmiter = EventDispatcher.getInstance();
        this.animator.on('pointerover',()=>{this.animator.setScale(7)});
        this.animator.on('pointerout',()=>{this.animator.setScale(6)});
        this.animator.on('pointerdown',()=>{this.OnClick()});

    }

    attack(player, abilityPercentage) {    
        // Hace la habilidad y devuelve el daño hecho
        if (abilityPercentage)
            if (Math.floor(Math.random() * 100) < abilityPercentage) 
                return this.ability(player);

        // Animacion de ataque
        this.animator.playAttack();

        // Golpea y devuelve el daño hecho
        return player.receiveAttack(this.damage);
    }

    // Habilidad por defecto de lo enemigos, simplemente ataca sin probabilidad de llamar a la habilidad
    ability(player) { return Enemy.prototype.attack.call(this, player); }

    getAnimator() { return this.animator; }
    
    // Devuelve el enemigo sobre el que realizar el ataque y avisa de que este ya se puede realizar
    OnClick() {   
        this.scene.selectedEnemy = this;
        this.emmiter.emit('enemyselected');
    }
    
    // Devuelve el nombre del enemigo
    getName() { 
        switch (this.constructor.name) {
            case 'DrunkRuffian': return 'Rufián embriagado';
            case 'StinkyPirate': return 'Pirata maloliente';
            case 'ScurviedSailor': return 'Marinero escorbutado';
            case 'ExperiencedBuccaneer': return 'Bucanero experimentado';
            case 'AlienatedCorsair': return 'Corsario enajenado';
            case 'EnsignDrake': return 'Alferez Drake (hermano)';
        }
    }
    
    // Devuelve el daño
    getDamage() { return this.damage; }
}

// Rufián Embriagado
export class DrunkRuffian extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'drunkRuffian', 100, 15);
    }
}

// Pirata maloliente
 export class StinkyPirate extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'stinkyPirate', 150, 25);
    }
}

// Marinero escorbutado
export class ScurviedSailor extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'scurviedSailor', 200, 35);
    }
    
    // Atacar con un 15% de probabilidad de hacer su habilidad
    attack(player) {
        return super.attack(player, 15)
    }

    ability(player) {
        player.turnEffectController.activateBleed(3, 2);
        return [super.attack(player), "envenena"];
    }
}

// Bucanero experimentado
 export class ExperiencedBuccaneer extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'experiencedBuccaneer', 250, 45);
    }

    attack(player) {
        return super.attack(player, 15);
    }

    // Atacar con un 15% de probabilidad de hacer su habilidad
    ability(player) {
        let critDmg = (this.damage/100)*40;
        // Aumentar el daño
        this.damage += critDmg;
        // Atacar
        let dmg = super.attack(player);
        // Restaurar el daño
        this.damage -= critDmg;
        
        return [dmg, "hace un golpe critico"];
    }
}

// Corsario enajenado
 export class AlienatedCorsair extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'alienatedCorsair', 300, 55);
    }
    
    // Atacar con un 15% de probabilidad de hacer su habilidad
    attack(player) {
        return super.attack(player, 15);
    }

    ability(player) {
        let dmg = super.attack(player);
        this.healthController.changeHealth((dmg/100)*50);
        return [dmg, "roba vida"];
    }
}

// Alferez Drake (hermano) (BOSS FINAL)
 export class EnsignDrake extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'ensignDrake', 500, 50);
    }
    
    attack(player) {
        // Atacar con un 20% de probabilidad de hacer su habilidad
        return super.attack(player, 20);
    }

    ability(player) {
        // Escoger una de las 3 habilidades aleatoriamente
        let rnd = Math.floor(Math.random() * 3);
        // Asignar tipo de enemigo para la habilidad
        let enemyType;
        if (rnd == 0) enemyType = ScurviedSailor;
        else if (rnd == 1) enemyType = ExperiencedBuccaneer;
        else if (rnd == 2) enemyType = AlienatedCorsair;
        // Habilidad
        return enemyType.prototype.ability.call(this, player);
    }

    stealFlag() {
        this.animator.noFlag = true;
        this.animator.playIdle();
    }
}