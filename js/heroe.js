function Heroe(imagen,animaciones){ //recibe un sprite.png y un JSON para animar el sprite
	
	Kinetic.Sprite.call(this); //constructor

	this.setWidth(40);
	this.setHeight(70);
	this.attrs.image = imagen;
	this.setAnimations(animaciones);
	this.setAnimation('caminar'); //en que frame del sprite ha de comenzar
	this.attrs.frameRate = 10;  //velocidad de animacion del sprite
	this.vx = 15;
	this.vy = 0;
	this.limiteDer = 0;  //limite derecha
	this.limiteTope = 0;  //el suelo
	this.direccion = true;
	this.contador = 0;  //0 no está saltando, 1 está en salto
	this.estaSaltando = false;

	this.avanzar = function(){
		if(this.direccion) this.move(this.vx,0); //esta mirando a la derecha
		else{
			this.attrs.drawFunc = function (a){
				var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,0,0,d.width,d.height)
			}
			this.setScale({x:1}); //este es un hack ya que no esta pensado para esto, le rota 180º
			this.direccion = true;
		}
		if(this.getX() > this.limiteDer){  //si llega al borde derecho ...
			this.move(this.limiteDer - this.getX(),0); //...que no me deje moverlo mas a la dcha
		}
	}

	this.retroceder = function(){
		if(!this.direccion) this.move(-15,0); //va hacia atras
		else{
			this.attrs.drawFunc = function (a){  //hemos de modificar una funcion de Kinetic para adaptarla a nuestro juego, debido al hack que hacemos
				var b=this.attrs.animation,c=this.attrs.index,d=this.attrs.animations[b][c],e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,-d.width,0,d.width,d.height)
			}
			this.setScale({x:-1}); //este es un hack ya que no esta pensado para esto, le rota 180º
			this.direccion = false;
		}
		if(this.getX() < 0){  //si llega al borde izq ...
			this.move(-this.getX(),0); //...que no me deje moverlo mas a la izq
		}
	}

	this.saltar = function(){
		this.estaSaltando = true;
		if(this.vy <= 2){ //esta sobre una plataforma
			this.setAnimation('salto'); //define el grupo de frames dentro del JSON qe ha de utilizar
		}
		this.vy = -20; //que frene verticalmente al saltar
		this.contador++;  //esta saltando
		this.afterFrame(10, function(){ //afterFrame es despues de 11 frames (los frames que tiene salto, 0 es el primer frame) haz algo, en este caso es para cuando saltemos, pasados unos frames, que dejemos de mostrar la animacion de saltar
			this.estaSaltando = false;
			this.setAnimation('estatico'); //despues de 11 fotogramas saltando paso a estático
		}); 
	}

	this.aplicarGravedad = function(gravedad, rebote){
		this.vy += gravedad; //que acelere al caer
		this.move(0,this.vy);  //la gravedad siempre le hace bajar
		if((this.getY() + this.getHeight()) > this.limiteTope){ //para cuando toque suelo que no le siga aplicando gravedad
			this.setY(this.limiteTope - this.getHeight());  //como muy abajo el suelo	
			this.vy=0; //al tocar suelo acaba la velocidad vertical
			this.contador = 0; //cuando toque el suelo puede volver a saltar
		}
	}
}

Heroe.prototype = Object.create(Kinetic.Sprite.prototype); //hace que todos los metodos de Sprite de Kinetic les tenga tambien Heroe
