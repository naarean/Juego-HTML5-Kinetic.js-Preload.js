function Plataforma(x,y,imagen){ //recibe las coordenadas x e y donde ha de aparecer y la imagen. lo llamamos desde main.js

	Kinetic.Rect.call(this); //constructor

	this.setWidth(200);
	this.setHeight(40);
	this.setX(x);
	this.setY(y);
	this.setFillPatternImage(imagen);
}

Plataforma.prototype = Object.create(Kinetic.Rect.prototype); //hace que todos los metodos de Rect de Kinetic les tenga tambien todas las instancias de Plataforma