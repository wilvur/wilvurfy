// temas 
const temas = [
    {id:01, titulo:"La cajita Infeliz", album:"albun", duracion:"1:30", desc:"descripcion"},
    {id:02, titulo:"La sociedad del cansancio", album:"album desconocido", duracion:"1:40", desc:"descripcion esto"},
    {id:03, titulo:"Sinfonia del marginado", album:"album desconocido", duracion:"1:40", desc:"descripcion esto"},
    {id:04, titulo:"Ennio Nipon Parte I", album:"album desconocido", duracion:"1:40", desc:"descripcion esto"},
];

//console.table(temas)

const temasDiv = document.getElementById("temas");

const html = temas.map(tema => {
     return  `
            <div class="flex text-lg hover:bg-gray-800 hover:text-blue-200">
            <div class="p-3 w-3 m-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="p-3 w-full m-3">${tema.titulo}</div>
            <div class="p-3 w-full m-3">${tema.album}</div>
            <div class="p-3 w-full m-3">${tema.duracion}</div>
            <div class="p-3 w-3 m-3">...</div> 
            </div>
    `  
    }).join(' ')

temasDiv.innerHTML = html;

const audio = new Audio("./mp3/cajita.mp3");
const playerBar = document.getElementById("playerBar");
const playerDuration = document.getElementById("playerDuration");

setInterval(() => {
    const ancho = Math.round(audio.currentTime / audio.duration.toFixed(3) * 100);
    if (ancho > 0) {   playerBar.setAttribute("value", ancho);}
    playerDuration.innerHTML = convertirSec(audio.currentTime);  
}, 1000)

//play
function play() {
    audio.play();
    console.log("di a play")
}

//va contando los segundos
function contadorG() {
    segundoA++;
    console.log(segundoA);
}  
// stop 
function stop() {
    audio.pause();
    audio.currentTime = 0;
    playerBar.setAttribute("value", 0);    
}
// 


function convertirSec(sec) {
    const duration = new Date(sec * 1000).toISOString().substr(14, 5);
    return duration;
}





