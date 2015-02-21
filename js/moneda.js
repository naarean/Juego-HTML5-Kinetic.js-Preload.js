function Moneda(x,y,imagen){ //recibe las coordenadas x e y donde ha de aparecer y la imagen. lo llamamos desde main.js

	Kinetic.Image.call(this); //constructor

	this.setWidth(30);
	this.setHeight(30);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
}

Moneda.prototype = Object.create(Kinetic.Image.prototype); //hace que todos los metodos de Image de Kinetic les tenga tambien Moneda