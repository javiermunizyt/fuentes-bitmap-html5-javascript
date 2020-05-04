/*
Creado por Javier Muñiz @javianmuniz para
el canal de YouTube "Programar es increíble"

Suscríbete para más vídeos y tutoriales:
https://www.youtube.com/channel/UCS9KSwTM3FO2Ovv83W98GTg

Enlace al vídeo con el tutorial sobre cómo se creó este código:
https://youtu.be/a6i09msJ93Q

FUENTE UTILIZADA
https://opengameart.org/content/boxy-bold-font


*/



var canvas;
var ctx;
var FPS = 50;


//TAMAÑO REAL DEL CANVAS (SIN AMPLIAR POR CSS)
var widthCanvas = 100;
var heightCanvas = 100;

var widthCanvasAmpliado = 512;
var heightCanvasAmpliado = 512;


var factorX = widthCanvasAmpliado/widthCanvas;
var factorY = heightCanvasAmpliado/heightCanvas;

//----------------------------------------------------


//MODIFICAMOS EL ESTILO CSS (por eso usamos canvas.style.width y no canvas.width)
function reescalaCanvas(){
	canvas.style.width = widthCanvasAmpliado + "px";
	canvas.style.height = heightCanvasAmpliado + "px";
}


var tilesFuente;

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //PONEMOS EL TAMAÑO REAL DEL CANVAS
  canvas.width = widthCanvas;
  canvas.height= heightCanvas;

	reescalaCanvas();

	tilesFuente = new Image();
	tilesFuente.src='img/boxy_bold_font.png';


  setInterval(function(){
    principal();
  },1000/FPS);
}




//-------------------------------------------
const oscilacionEntreLetras = 0.2;
const velocidadLetras = 0.2;
const amplitudMovimiento = 5;


class Texto{

	constructor(){
		this.clipX; 	//posición x clipping
		this.clipY;	//posicion y clipping

		this.tamX; 	//tamaño X
		this.tamY;	//tamaño Y

		this.espacio = 0;

		this.yMov = 0;

	}


	letra(caracter,x,y){
		this.clipX = atlas[caracter].x;
		this.clipY = atlas[caracter].y;

		this.tamX = atlas[caracter].w;
		this.tamY = atlas[caracter].h;

		ctx.drawImage(tilesFuente,this.clipX,this.clipY,this.tamX,this.tamY,(x + this.espacio),y,this.tamX,this.tamY);
	}


	frase(cadena,x,y){
		this.espacio = 0;	//inicializamos a cero los espacios

		var yMovAux = this.yMov;
		var desplazamiento = 0;

		for(var a=0; a<cadena.length; a++){

			desplazamiento = Math.sin(yMovAux)*amplitudMovimiento;
			yMovAux += oscilacionEntreLetras;

			this.letra(cadena[a],x,(y+desplazamiento));
			this.espacio += this.tamX;
		}

		this.yMov += velocidadLetras;

	}





}




function borraCanvas(){
  canvas.width=canvas.width;
  canvas.height=canvas.height;
}


var texto1 = new Texto();
var texto2 = new Texto();
var texto3 = new Texto();

function principal(){
  borraCanvas();

	texto1.frase("programar",5,30);
	texto2.frase("es",25,45);
	texto3.frase("increible",5,60);

}
