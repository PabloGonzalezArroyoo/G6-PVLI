import phaser from "./lib/phaser.js";
import { Button } from "./button.js";
export class keyboard
{
    constructor(scene,arrayBotones)
    {
        this.beingUsed=0;
        this.inputTeclas=false;
        this.flechas = scene.input.keyboard.addKeys('left, up, right, down, enter');
        this._arrayBotones=arrayBotones;
    }
    procesInput()
    {
        if(phaser.Input.Keyboard.Events.ANY_KEY_DOWN)
		{
			this.inputTeclas=true;
            this._arrayBotones[this.beingUsed].onPointerOut();
            if(phaser.Input.Keyboard.JustDown(this.flechas.left)&&this.beingUsed-1>=0)this.beingUsed-=1;
            else if(phaser.Input.Keyboard.JustDown(this.flechas.right)&&this.beingUsed+1<this._arrayBotones.length)this.beingUsed+=1;
            else if(phaser.Input.Keyboard.JustDown(this.flechas.up)&&this.beingUsed-2>=0)this.beingUsed-=2;
            else if(phaser.Input.Keyboard.JustDown(this.flechas.down)&&this.beingUsed+2<this._arrayBotones.length)this.beingUsed+=2;
            else if(phaser.Input.Keyboard.JustDown(this.flechas.enter))this._arrayBotones[this.beingUsed].onReleaseClick();
			if(!phaser.Input.Keyboard.JustDown(this.flechas.enter))this._arrayBotones[this.beingUsed].onOver();
			console.log(this.beingUsed);
		}
    }
		

}