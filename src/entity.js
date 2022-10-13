export class Position {
  constructor(x,y){
    this._x = x;
    this._y = y;
  }

  // Otros metodos
  getPosX(){return this._x}
  getPosY(){return this._y}
  setPosX(x){this._x = x}
	setPosY(y){this._y = y}
}

export class Scale {
  constructor(x,y){
    this._x = x;
    this._y = y;
  }

  // Otros metodos
  getScaX(){return this._x}
  getScaY(){return this._y}
  setScaX(x){this._x = x}
	setScaY(y){this._y = y}
}

export class Rotation {
  constructor(x,y,z){
    this._x = x;
    this._y = y;
    this._z = z;
  }

  // Otros metodos
  getRotX(){return this._x}
  getRotY(){return this._y}
  getRotZ(){return this._z}
  setRotX(x){this._x = x}
	setRotY(y){this._y = y}
  setRotZ(y){this._y = z}
}

// Clase base Entity
export class Entity{
	constructor(name, position, scale, rotation, color, imgId){
		this.name = name;
		this._position = position;
		this._scale = scale;
    this._rotation = rotation;
		this._color = color;
		this._imgId = imgId
	}

  // Otros metodos
  getName(){return this.name}
  getPosX(){return this._position._x}
	getPosY(){return this._position._y}
  getScaX(){return this._scale._x}
  getScaY(){return this._scale._y}
  getRotX(){return this._rotation._x}
  getRotY(){return this._rotation._y}
  getRotZ(){return this._rotation._z}
  getColor(){return this._color}

  moveRight(right) {
    this._position._x+= right;
  }

  moveLeft(left) {
    this._position._x-= left;
  }

  moveUp(up) {
    this._position._y -= up;
  }

  moveDown(down) {
    this._position._y += down;
  }

  scale(x,y) {
    this._scale._x = x;
    this._scale._y = y;
  }

  rotate(x,y,z) {
    this._rotation._x += x;
    this._rotation._y += y;
    this._rotation._z += z;
  }

  changeColor(color) {
    this._color = color;
  }
}