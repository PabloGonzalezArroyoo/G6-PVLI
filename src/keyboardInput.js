import phaser from "./lib/phaser.js";
export class keyboard
{
    constructor(scene)
    {
        this.beingUsed=0;
        this.inputKeyboard=false;
        this._scene=scene;
        this.arrows = scene.input.keyboard.addKeys('left, up, right, down, enter');
        this._buttonArray
        this._cursorPositionX=scene.input.mousePointer.x;
        this._cursorPositionY=scene.input.mousePointer.y;
    }

    // Asigna el array de botones que habrá en la escena
    loadButtonArray(arrayBotones)
    {
        this._buttonArray=arrayBotones;
        console.log(this._buttonArray);
    }

    // Marca qué botón de qué posición está siendo usado
    setBeingUsed(position)
    {
        this.beingUsed=position;
    }

    // Procesa el input
    processInput()
    {
        var self=this;
        
        this._scene.input.keyboard.on('keydown',function(){
            //Desactiva todos los botones primero
            for(var i=0;i<self._buttonArray.length;i++)self._buttonArray[i].onPointerOut();
            //Activa el input te teclado
            self.inputKeyboard=true;
            if(phaser.Input.Keyboard.JustDown(self.arrows.left)&&self.beingUsed-1>=0)self.beingUsed-=1;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.right)&&self.beingUsed+1<self._buttonArray.length)self.beingUsed+=1;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.up)&&self.beingUsed-2>=0)self.beingUsed-=2;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.down)&&self.beingUsed+2<self._buttonArray.length)self.beingUsed+=2;
            else if(phaser.Input.Keyboard.JustDown(self.arrows.enter))self._buttonArray[self.beingUsed].onReleaseClick();
			if(!phaser.Input.Keyboard.JustDown(self.arrows.enter))self._buttonArray[self.beingUsed].onOver();
            self._cursorPositionX=self._scene.input.mousePointer.x;
            self._cursorPositionY=self._scene.input.mousePointer.y;
        })

        if(this.inputKeyboard&&(this._cursorPositionX!=this._scene.input.mousePointer.x||this._cursorPositionY!=this._scene.input.mousePointer.y))
        {
            for(var i=0;i<self._buttonArray.length;i++)self._buttonArray[i].onPointerOut();
            this.inputKeyboard=false;
        }
    }
}