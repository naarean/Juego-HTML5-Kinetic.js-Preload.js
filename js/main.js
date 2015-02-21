var framesHeroe = {  //JSON con arrays para manejar el sprite con las imagenes del Heroe
	estatico: [{
		x: 30,
        y: 0,
        width: 65,
        height: 79
	}],
    caminar: [{
        x: 30,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 109,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 0,
        width: 65,
		height: 79
	}, {
		x: 267,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 0,
		width: 65,
		height: 79
	}],
    salto: [{
        x: 109,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 70,
        width: 65,
        height: 79
    },{
        x: 188,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	}]
};
var stage, fondo, personaje, grupoAssets, puntuacion, imagenFondo;
var teclado = {};
var intervalo;
var gravedad = 0.8;
var rebote = 0;  //porque al caer desde altura no queremos que rebote el personaje
var juego = new Game();
var juego_iniciado = false; 

var imgHeroe = new Image();
imgHeroe.src = 'imgs/Heroe.png';
var imgEnemigo = new Image();
imgEnemigo.src = 'imgs/enemy.png';
var imgMoneda = new Image();
imgMoneda.src = 'imgs/moneda.png';
var imgPlataforma = new Image();
imgPlataforma.src = 'imgs/pattern.png';
var imgPuerta = new Image();
imgPuerta.src = 'imgs/puerta.png';
var imgLlave = new Image();
imgLlave.src = 'imgs/llave.png';
var imgFondo = new Image();
imgFondo.src = 'imgs/fondo.jpg';

grupoAssets = new Kinetic.Group({
	x: 0,
	y: 0
});
stage = new Kinetic.Stage({
	container: 'game',  //lo hemos declarado en el html
	width: 960,
	height: 500
});
imagenFondo = new Kinetic.Image({
	x:0,
	y:0,
	image: imgFondo,
	width: stage.getWidth(),
	height: stage.getHeight()
});
puntuacion = new Kinetic.Text({
	text: 'Puntuacion: 0',
	height: 35,
	width: 150,
	x: stage.getWidth()-150,
	y: 15,
	fill: '#f7f7f7',
	fontFamily: 'Arial',
	fontSize: 20
});

function nivelUno(){
	if (juego_iniciado) return; //para que no entre dos veces en nivelUno, si ya inicio el juego que no entre
	juego_iniciado = true;

	juego.puntuacion = 0; 
	juego.llave = true;

	fondo = new Kinetic.Layer();

	//enemigos
	grupoAssets.add(new Enemigo(200,stage.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(850,stage.getHeight()/3.9-60,imgEnemigo));
	grupoAssets.add(new Enemigo(170,stage.getHeight()/3-60,imgEnemigo));
	grupoAssets.add(new Enemigo(1020,stage.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(1120,stage.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(1220,stage.getHeight()-75,imgEnemigo));

	//suelo
	var suelo = new Plataforma(0,stage.getHeight()-15,imgPlataforma);
	suelo.setWidth(stage.getWidth()*2);
	grupoAssets.add(suelo);

	//plataformas
	grupoAssets.add(new Plataforma(20,stage.getHeight()/1.5,imgPlataforma));
	grupoAssets.add(new Plataforma(190,stage.getHeight()/3,imgPlataforma));
	grupoAssets.add(new Plataforma(510,stage.getHeight()/1.6,imgPlataforma));
	grupoAssets.add(new Plataforma(870,stage.getHeight()/3.9,imgPlataforma));

	//monedas
	grupoAssets.add(new Moneda(350, stage.getHeight()/3-130,imgMoneda));
	grupoAssets.add(new Moneda(650, stage.getHeight()/2-130,imgMoneda));
	grupoAssets.add(new Moneda(80, stage.getHeight()-80,imgMoneda));
	grupoAssets.add(new Moneda(910, stage.getHeight()/6,imgMoneda));
	grupoAssets.add(new Moneda(1220, stage.getHeight()-85,imgMoneda));

	//puerta
	grupoAssets.add(new Puerta(910, stage.getHeight()-85,imgPuerta));

	personaje = new Heroe(imgHeroe, framesHeroe); //instanciamos pasando el sprite en png y los frames en JSON
	personaje.setX(0); //le ponemos a la izquierda
	personaje.setY(stage.getHeight() - personaje.getHeight()); //le ponemos abajo
	personaje.limiteDer = stage.getWidth() - personaje.getWidth();  //para que no se salga por la derecha de la pantalla
	personaje.limiteTope = stage.getHeight(); //no puede bajar mas del limite del canvas, el suelo

	//Añadimos segun prioridad de capas, lo mas al fondo: el fondo del juego
	fondo.add(imagenFondo);
	fondo.add(personaje);
	fondo.add(grupoAssets);
	fondo.add(puntuacion);
	personaje.start();
	stage.add(fondo);
	intervalo = setInterval(frameLoop,1000/20); //Que llame a esta funcion 20 veces por segundo
}

function nivelDos(){
	console.log("has comenzado el nivel dos");
	fondo = new Kinetic.Layer();
	juego.llave = false;

	//Enemigos
	grupoAssets.add(new Enemigo(200,stage.getHeight()/1.5-60,imgEnemigo));
	grupoAssets.add(new Enemigo(850,stage.getHeight()/3.9-60,imgEnemigo));
	grupoAssets.add(new Enemigo(25,stage.getHeight()/3-60,imgEnemigo));
	grupoAssets.add(new Enemigo(500,stage.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(650,stage.getHeight()-75,imgEnemigo));
	grupoAssets.add(new Enemigo(850,stage.getHeight()-75,imgEnemigo));
	//Puerta
	grupoAssets.add(new Puerta(1800,stage.getHeight()-90,imgPuerta));
	//Plataformas 
	var piso = new Plataforma(0,stage.getHeight()-15,imgPlataforma)
	piso.setWidth(stage.getWidth()*2);
	grupoAssets.add(piso);
	grupoAssets.add(new Plataforma(190,stage.attrs.height/1.5,imgPlataforma));
	grupoAssets.add(new Plataforma(10,stage.attrs.height/3,imgPlataforma));
	grupoAssets.add(new Plataforma(310,stage.attrs.height/4,imgPlataforma));
	grupoAssets.add(new Plataforma(870,stage.attrs.height/3.9,imgPlataforma));
	//LLave
	grupoAssets.add(new Llave(850,stage.getHeight()/3.9-60,imgLlave));
	//Monedas 
	grupoAssets.add(new Moneda(350,stage.getHeight()/3-130,imgMoneda));	
	//Personaje 
	personaje = new Heroe(imgHeroe,framesHeroe);
	personaje.setX(0);
	personaje.limiteDer = stage.getWidth() - personaje.getWidth();
	personaje.setY(stage.getHeight()-80);
	personaje.limiteTope = stage.getHeight();
    fondo.add(imagenFondo);
	fondo.add(personaje);
	fondo.add(grupoAssets);
	fondo.add(puntuacion);
	personaje.start();
	stage.add(fondo);
	intervalo = setInterval(frameLoop,1000/20);
}

function moverPersonaje(){
	if(personaje.getAnimation()!='caminar' && (teclado[37] || teclado[39])){
		personaje.setAnimation('caminar');
	}
	if(teclado[37]){  //si tecla 37 (flecha izquierda) es true (pulsada) 
		personaje.retroceder();
	}
	if(teclado[39]){ //si tecla 39 (flecha dcha) es true (pulsada) 
		personaje.avanzar();
	}
	if(teclado[38] && personaje.contador < 1){ //tecla 38 flecha arriba y no este ya saltando
		personaje.saltar();
	}
	if(!(teclado[39] || teclado[38] || teclado[37])){ //si no presionas ninguna tecla
		personaje.setAnimation('estatico');
	}
}

function addEventoTeclado(){
	addEvento(document,"keydown", function(e){ //que este pendiente de que se pulse una tecla en el document
		teclado[e.keyCode] = true;
	});

	addEvento(document,"keyup", function(e){
		teclado[e.keyCode] = false;
	});	

	function addEvento(elemento, evento, funcion){
		if(elemento.addEventListener){
			elemento.addEventListener(evento,funcion, false);
		}
		else if(elemento.attachEvent){
			elemento.attachEvent(evento, funcion);
		}
	}
}

addEventoTeclado();

function colision(a,b){ //recibe 2 objetos y devolvera true si hay colision y false sino
	var colision = false;

	//Colsiones horizontales
	if(b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth())
	{
		//Colisiones verticales
		if(b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight())
			colision = true;
	}
	//Colisión de a con b
	if(b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth())
	{
		if(b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight())
			colision = true;
	}
	//Colisión b con a
	if(a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth())
	{
		if(a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight())
			colision = true;
	}
	return colision;
}

function moverEnemigos(){
	var enemigos = grupoAssets.children; //un array con todos los elementos contenidos en grupoAssets, es la lista de enemigos
	for (i in enemigos){
		var enemigo = enemigos[i];
		if(enemigo instanceof Enemigo) //devuelve true si la clase de enemigo es Enemigo. Si no es enemigo que no lo mueva
			enemigo.mover();
	}
}

function aplicarFuerzas(){
	personaje.aplicarGravedad(gravedad, rebote);
}

function detectarColisionPlataformas(){
	var plataformas = grupoAssets.children;
	for(i in plataformas){
		var plataforma = plataformas[i];
		if(colision(plataforma,personaje)){  //si hay un choque
			if(plataforma instanceof Enemigo){ //si el personaje choca con un ememigo
				if(personaje.vy > 2 && personaje.getY() < plataforma.getY()){  //si el personaje cae sobre el enemigo y le mata
					plataforma.remove(); //eliminamos el enemigo
					juego.puntuacion += 5; //5 puntos por matar enemigos
					console.log(juego.puntuacion);
				}
				else{  //si es otro contacto entre enemigo y personaje, el personaje muere
					grupoAssets.removeChildren();
					document.getElementById('lose').style.display = 'block';
					document.getElementById('game').style.display = 'none';
					window.clearInterval(intervalo);
					juego_iniciado = false;
					console.log("fin de juego");
				}
			}
			else if(plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy >=0){
				personaje.contador = 0;
				personaje.setY(plataforma.getY() - personaje.getHeight());
				personaje.vy *= rebote;
			}
			else if(plataforma instanceof Moneda){ //si ha cogido la moneda, que la quite y sume puntos
				plataforma.remove();
				juego.puntuacion += 10;
			}
			else if(plataforma instanceof Llave){ //si coge la llave
				plataforma.remove();
				juego.llave = true;
				console.log("has cogido la llave")
				continue;
			}
			else if(plataforma instanceof Puerta && juego.llave){ //si llega a la puerta y tiene la llave
				if(juego.nivel == 1){  //si has terminado el nivel 1
					grupoAssets.removeChildren(); 
					window.clearInterval(intervalo);
					juego.nivel = 2;
					nivelDos();
				}
				else if(juego.nivel == 2){
					console.log("has terminado el nivel dos");
					grupoAssets.removeChildren();
					document.getElementById('win').style.display = 'block';
					document.getElementById('game').style.display = 'none';
					document.getElementById('score').innerHTML = juego.puntuacion;
					window.clearInterval(intervalo);
					juego_iniciado = false;
				} 
			}
		}
	}
}

function moverFondo(){ 
	if (personaje.getX() > (stage.getWidth()/2) && teclado[39]){ //se mueve si el personaje ha pasado la mitad del escenario y sigue avanzando. En realidad movemos los assets no el fondo
		personaje.vx = 2; //cambiamos la velocidad de nuestro personaje
		for (i in grupoAssets.children){ //en grupoAssets esta todos los elementos
			var asset = grupoAssets.children[i];
			asset.move(-5,0);
		} 
	}
	else{
		personaje.vx = 10; //personaje retorna a su velocidad normal
	}
}

function actualizarTexto(){
	puntuacion.setText('puntuacion: '+juego.puntuacion);
}

function frameLoop(){  //aqui colocamos todo aquello q necesitamos que compruebe el juego continuamente
	aplicarFuerzas();
	moverPersonaje();
	moverEnemigos();
	actualizarTexto();
	moverFondo();
	detectarColisionPlataformas();
	stage.draw();
}