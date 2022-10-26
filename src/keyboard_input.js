import phaser from "./lib/phaser.js";
import { Button } from "./button.js";
export class keyboard
{
    constructor(scene,arrayBotones)
    {
        this.beingUsed=0;
        this.inputKeyboard=false;
        this._scene=scene;
        this.arrows = scene.input.keyboard.addKeys('left, up, right, down, enter');
        this._arrayBotones=arrayBotones;
        this._cursorPositionX=scene.input.mousePointer.x;
        this._cursorPositionY=scene.input.mousePointer.y;
    }
    processInput()
    {
        var self=this;
        
        this._scene.input.keyboard.on('keydown',function(){
            //Desactiva todos los botones primero
            for(var i=0;i<self._arrayBotones.length;i++)self._arrayBotones[i].onPointerOut();
            //Activa el input te teclado
            self.inputKeyboard=true;
            if(phaser.Input.Keyboard.JustDown(self.arrows.left)&&self.beingUsed-1>=0)self.beingUsed-=1;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.right)&&self.beingUsed+1<self._arrayBotones.length)self.beingUsed+=1;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.up)&&self.beingUsed-2>=0)self.beingUsed-=2;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.down)&&self.beingUsed+2<self._arrayBotones.length)self.beingUsed+=2;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.enter))self._arrayBotones[self.beingUsed].onReleaseClick();
			if(!phaser.Input.Keyboard.JustDown(self.arrows.enter))self._arrayBotones[self.beingUsed].onOver();
            self._cursorPositionX=self._scene.input.mousePointer.x;
            self._cursorPositionY=self._scene.input.mousePointer.y;
        })
        if(this.inputKeyboard&&(this._cursorPositionX!=this._scene.input.mousePointer.x||this._cursorPositionY!=this._scene.input.mousePointer.y))
        {
            for(var i=0;i<this._arrayBotones.length;i++)this._arrayBotones[i].onPointerOut();
            this.inputKeyboard=false;
        }
        console.log(this.beingUsed);
    }
		

}