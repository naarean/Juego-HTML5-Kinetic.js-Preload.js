function Enemigo(x,y,imagen){ //recibe las coordenadas x e y donde ha de aparecer y la imagen. lo llamamos desde main.js

	Kinetic.Image.call(this); //constructor

	this.setWidth(60);
	this.setHeight(60);
	this.setX(x);
	this.setY(y);
	this.contador = 0;
	this.setImage(imagen);

	this.aleatorio = function(inferior, superior){
		var posibilidades = superior - inferior;
		var random = Math.random() * posibilidades;
		random = Math.floor(random);
		return parseInt(inferior) + random;
	}

	this.mover = function(){
		this.contador++;
		this.setX(this.getX() + Math.sin(this.contador * Math.PI /50)*5); //el 50 y el 5 son los que determinan los limites de movimiento del enemigo
	}
}

Enemigo.prototype = Object.create(Kinetic.Image.prototype); //hace que todos los metodos de Image de Kinetic les tenga tambien todas las instancias de Enemigo