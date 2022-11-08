import Character from './character.js'
import EnemyAnimator from './animations/enemyAnimator.js'
import HealthController from './healthController.js';

// Clase base Enemy
export class Enemy extends Character {
    constructor(scene, x, y, spritesheet, maxHealth, damage) {
        if (scene !== null) super(x, y, new EnemyAnimator(scene, x, y, spritesheet), new HealthController(scene, x, y - 150, maxHealth), damage);
        else super(x, y, null, null, damage)
    }
    // método para añadir una escena si no tenía
    setScene(scene, maxHealth, spritesheet){
        this.healthController = new HealthController(scene, this.x, this.y - 150, maxHealth);
        this.animator = new EnemyAnimator(scene, this.x, this.y, spritesheet);
    }
    attack(player){    
        // Animacion de ataque
        // this.animator.playAttack();

        // Le baja vida al jugador y devolvuelve el daño hecho
        return player.receiveAttack(this.damage);
    }
    getAnimator(){return this.animator;}
}

// Enemigo 1
export class DrunkRuffian extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'drunkRuffian', 100, 15);
    }
    setScene(scene){
        super.setScene(scene, 100, 'drunkRuffian');
    }
}

// Enemigo 2
 export class StinkyPirate extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'stinkyPirate', 150, 25);
    }
    setScene(scene){
        super.setScene(scene, 150, 'stinkyPirate');
    }
}

// Enemigo 3
export class ScurviedSailor extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'scurviedSailor', 200, 35);
    }
    setScene(scene){
        super.setScene(scene, 200, 'scurviedSailor');
    }
    
    attack(player){
        super.attack(player);
        // envenenar
        let bleed = Math.floor(Math.random() * 100) < 15;
        if (bleed) player.bleedController.activateBleed(3, 2);
    }
}

// Enemigo 4
 export class ExperiencedBuccaneer extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'experiencedBuccaneer', 250, 45);
    }
    setScene(scene){
        super.setScene(scene, 250, 'experiencedBuccaneer');
    }

    attack(player){
        // Calcular probabilidad de critico
        let crit = Math.floor(Math.random() * 100) < 15;
        // Calcular aumento de daño de critico
        let critDmg = (this.damage/100)*40;
        // Aumentar el daño
        if (crit) this.damage += critDmg;
        // Atacar
        super.attack(player);
        // Restaurar el daño
        if (crit) this.damage -= critDmg;
    }
}

// Enemigo 5
 export class AlienatedCosair extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'alienatedCosair', 300, 55);
    }
    setScene(scene){
        super.setScene(scene, 300, 'alienatedCosair');
    }
    
    attack(player){
        // Calcular probabilidad de cura
        let heal = Math.floor(Math.random() * 100) < 15;
        let dmg = super.attack(player);
        if (heal) this.healthController.changeHealth((dmg/100)*50);
    }
}

// Boss Final
 export class EnsignDrake extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'ensignDrake', 500, 50);
    }
    setScene(scene){
        super.setScene(scene, 500, 'ensignDrake');
    }
    
    attack(player){
        // cualquiera de las otras habilidades
        // Calcular probabilidad de critico
        let ability = true/*Math.floor(Math.random() * 100) < 20*/;
        if (ability){
            let rnd = 0/*Math.floor(Math.random() * 3)*/;
            if (rnd == 0) console.log(ScurviedSailor.attack)/*ScurviedSailor.attack.apply(this, [player])*/;
            if (rnd == 1) ExperiencedBuccaneer.attack.apply(this, [player]);
            if (rnd == 2) AlienatedCosair.attack.apply(this, [player]);
        }
        else super.attack(player);
    }
}