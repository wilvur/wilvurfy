const temas = [
    {id:0, titulo:"La cajita Infeliz", album:"Grandes fracasos vol.1", desc:"Sountrack", src:"cajita.mp3" , cover:"coverAgua.PNG"},
    {id:1, titulo:"La sociedad del cansancio", album:"Grandes fracasos vol.1", desc:"Basado en la vida de una Hormiga", src:"sociedadcansancio.mp3" , cover:"coverAlbum.PNG"},
    {id:2, titulo:"Sinfonia del marginado Wagner", album:"Grandes fracasos vol.1", desc:"primera sinfonica", src:"sinfonia01.mp3" , cover:"coverChina.PNG"},
    {id:3, titulo:"Ennio Nipon Parte I", album:"Grandes fracasos vol.I", desc:"Soundtrack oriental", src:"ennioNippon.mp3" , cover:"coverMedias.PNG"},
    {id:4, titulo:"Manzanas amistosas multidimensionales", album:"Grandes fracasos vol.I", desc:"demo01", src:"manzanas.mp3" , cover:"coverMedias.PNG"}
];

// gestion de la duracion de los temas 

const temasDuracionTemp = [
    77.609775,
    78.550175,
    91.533025,
    103.967325,
    100.00000
    
];

const totalDuracion = convertirSec(temasDuracionTemp.reduce((total, duracion) => {
    return total + duracion;
  }));

const temasDuracion = [];

function cargarMetadata(displayTemasDiv) {
    temas.map( tema => {
        const temaD = new Audio(`./mp3/${tema.src}`);
        temaD.onloadedmetadata = function(){ 
            temasDuracion.push(temaD.duration);  
        }  
            
        displayTemasDiv()
    });
}

cabCantidadTemas = document.getElementById("cabCantidadTemas");
cabCantidadTemas.innerHTML = temas.length;
cabTotalDuracion = document.getElementById("cabTotalDuracion");
cabTotalDuracion.innerHTML = totalDuracion;

// para insertar los div en cada uno de los temas de la lista 
function displayTemasDiv() { 
    // aca es el donde inyecto los div con los temas 
    const temasDiv = document.getElementById("temas"); 
    const html = temas.map(tema => {
     return  `
            <div class="temaDiv flex  text-sm md:text-xl hover:bg-gray-900 opacity-80 select-none ">
            <div class="my-3 mx-6 flex-shrink-0">
                    <span onclick="playTema(${tema.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ico-play h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                </span>  
            </div>
            <div class="w-full my-3 mr-6">${tema.titulo}</div>
            <div class="w-full my-3 mr-6">${tema.album}</div>
            <div class="temaD  my-3 mr-6 flex-shrink-0 ">${convertirSec(temasDuracionTemp[tema.id])}</div>
            <div class="w-full my-3 mr-6 hidden md:block">${tema.desc}</div> 
            </div>
    `  
  }).join(' ')
   
    temasDiv.innerHTML = html;
}

// carga los metadatos y posterionmente carga div
cargarMetadata(displayTemasDiv);

//////////////////////////////////////////////  player 
// el tema por defecto
var temaActualId = 2;
var temaActual = temas.filter(tema => tema.id === temaActualId) ;
var audio = new Audio(`./mp3/${temaActual[0].src}`);

// mapeo del DOM
var icoPlayHolder = document.getElementById("icoPlayHolder");
var temaDiv = document.getElementsByClassName("temaDiv");
const temaIcoPlay = document.getElementsByClassName("ico-play");

const icoPause = `<svg  onclick="pause()" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`;

const icoPlay = `<svg onclick="play()" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
</svg>`;

//cambio el tema 
function playTema(id) { 


    // mapeo los elementos del player
    const playerBar = document.getElementById("playerBar");
    const playerDuration = document.getElementById("playerDuration");
    const playertitulo = document.getElementById("titulo");   
    const playerCover = document.getElementById("playerCover");
    const playerCurrent = document.getElementById("playerCurrent");
    
        // saco los datos del tema a reproducir segun la id que manda 
        temaActual = temas.filter(tema => tema.id === id) ;
        audio.pause();
        pause(); // esto borra los estilos 
        
        audio = new Audio(`./mp3/${temaActual[0].src}`);
        audio.play();
        //para visualizar los cambios al play
        icoPlayHolder.innerHTML= icoPause;
        temaActualId = id ; // dejo el id que queda reproduciendo
        playerCover.setAttribute("src", `./cover/${temaActual[0].cover}`)  
        
        
        //para cambiar el ico de play
        temaIcoPlay[temaActualId].classList.add("text-green-600");
        temaDiv[temaActualId].classList.add("text-green-600");

    
        // listener para cuando termina el tema
        audio.addEventListener('ended', (event) => {  next() } )   
 
    // contador para las acciones 
    const contador = setInterval(() => {
        const ancho = Math.round(audio.currentTime / audio.duration.toFixed(3) * 100);
        //volumen
        const volumen = document.getElementById("volumen").value / 100;
        audio.volume = volumen;

        if (ancho > 0) {   playerBar.setAttribute("value", ancho);}
            playerDuration.innerHTML = convertirSec(temasDuracionTemp[temaActualId]);
            playertitulo.innerHTML =  temaActual[0].titulo ;
            playerCurrent.innerHTML = convertirSec(audio.currentTime);
        }
    , 1000);

}

// funciones del player
function pause() {
    audio.pause();  
    icoPlayHolder.innerHTML= icoPlay;
    temaIcoPlay[temaActualId].classList.remove("text-green-600");
    temaDiv[temaActualId].classList.remove("text-green-600");
}
function play() {
    playTema(temaActualId);
    icoPlayHolder.innerHTML= icoPause;
}
function next() {
    if (temaActualId < temas.length ) {
        playTema(temaActualId + 1);
        icoPlayHolder.innerHTML= icoPause;
    }
}
function prev() {
    if (temaActualId > 0 ) {
        playTema(temaActualId - 1);
        icoPlayHolder.innerHTML= icoPause;
    }
}


// 
             
// UTILIDADES VARIAS
function convertirSec(sec) {
    const duration = new Date(sec * 1000).toISOString().substr(14, 5);
    return duration;
}





