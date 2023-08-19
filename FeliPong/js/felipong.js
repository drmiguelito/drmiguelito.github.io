//****Inicialización ****
//--->Estilo de fuente
var font8bits = new FontFace('font8bits', 'url(PressStart2P-Regular.ttf)');
font8bits.load().then(function(font){
    document.fonts.add(font);
});
//--->Canvas
const canvas = document.getElementById("pong");
const contexto = canvas.getContext("2d");
let paused = false;
drawRect(0,0,canvas.width, canvas.height, "#2b1223"); //Pantalla de precarga

//--->Audio
let bgMusicSelectChar = new Audio();
let soundSelectChar = new Audio();
let soundSelectLevel = new Audio();
let soundSelectToPlay = new Audio();
let bgMusic = new Audio();
let playerWins = new Audio();
let cpuWins = new Audio();
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let cpuScore = new Audio();
bgMusicSelectChar.src ="audio/trololo8bits.mp3";
soundSelectChar.src = "audio/selectChar8bits.mp3";
soundSelectLevel.src = "audio/selectLevel8bits.mp3";
soundSelectToPlay.src = "audio/selectCharToPlay8bits.mp3";
bgMusic.src ="audio/finalCountdown8bits.mp3";
playerWins.src="audio/whatIsLove8bits.mp3";
cpuWins.src="audio/itsMyLife8bits.mp3";
hit.src ="";
wall.src="";
userScore="";
cpuScore="";

//--->Imágenes
var char1 = new Image();
var char2 = new Image();
var char3 = new Image();
var char4 = new Image();
var char5 = new Image();
var char6 = new Image();
var char7 = new Image();
var char8 = new Image();
var char9 = new Image();
var char10 = new Image();
var kitty = new Image();
var logoFeliPong = new Image();
var logoFeliPongSmall = new Image();
var logoFeliPongScreen = new Image();
char1.src="img/pongTala.png";
char2.src="img/pongPipe.png";
char3.src="img/pongMickey.png";
char4.src="img/pongVale.png";
char5.src="img/pongAna.png";
char6.src="img/pongHugo.png";
char7.src="img/pongLulu.png";
char8.src="img/pongDanny.png";
char9.src="img/pongMengo.png";
char10.src="img/pongEze.png";
kitty.src ="img/gatito8bits.webp";
logoFeliPong.src="img/logoFeliPong.png";
logoFeliPongSmall.src="img/logoFeliPongSmall.png";
logoFeliPongScreen.src="img/FeliPongScreen2.png";

//--->Inicialización de pantalla
let bgColorField = "#132e1b"; //color de fondo de las pantallas
let screenLoad = true; //pantalla de créditos
let screenWelcome = false; //Pantalla de inicio
let screenSelectChar = false; //Pantalla para seleccionar personaje
let screenGame = false; //Pantalla de juego

//--->Objetos
//Usuario
const user = {
    x: 0,
    y: (canvas.height - 100 )/ 2,
    width: 80,  
    height: 100,
    score: 0,
    color: bgColorField
}
//Cpu
const cpu = {
    x: canvas.width - 100,
    y: (canvas.height - 100) / 2,
    width: 80,
    height: 100,
    score: 0,
    color: bgColorField
}
//Bola
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    velocidadX: 5, //velocidad horizontal (velocidad + dirección)
    velocidadY: 5, //velocidad vertical (velocidad + dirección)
    speed: 7, //velocidad
    color: "white"
}
//Red
const net = {
    x: (canvas.width - 2)/2,
    y: 0,
    width: 5,
    height: 10,
    color: "white"
}
//--->Métodos
//---Rectángulo
function drawRect(x,y,w,h,color){
    contexto.fillStyle = color;
    contexto.fillRect(x,y,w,h);
}
//---Círculo
function drawCircle(x,y,r,color){
    contexto.fillStyle = color;
    contexto.beginPath();
    contexto.arc(x,y,r,0,Math.PI*2,true);
    contexto.closePath();
    contexto.fill();
}
//---Arco
function drawArc(x,y,r,color){
    contexto.fillStyle = color;
    contexto.beginPath();
    contexto.arc(x,y,r,0,Math.PI*2,true);
    contexto.closePath();
    contexto.fill();
}
//---Red
function drawNet(){
    for(let i= 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
//---Marcador
function drawText(text, x, y, color){
    contexto.fillStyle = "#fff";
    contexto.font = "40px font8bits";
    contexto.fillText(text, x, y);
}
//---Pantalla de inicio
function drawTextCredits(text, x, y, color, bgcolor){
    contexto.fillStyle = "#a0cf2a";
    contexto.font = "20px font8bits";
    contexto.fillText(text, x, y);
}
//---Inicio de juego: título
function drawTextTitle(text, x, y, color, bgcolor){
    contexto.fillStyle = "#a0cf2a";
    contexto.font = "60px font8bits";
    contexto.fillText(text, x, y);
}
//---Inicio de juego: press start
function drawTextStart(text, x, y, color, bgcolor){
    contexto.fillStyle = "#fff";
    contexto.font = "15px font8bits";
    contexto.fillText(text, x, y);
}
//---Selección de personaje
function drawTextSelect(text, x, y, color){
    contexto.fillStyle = "#fff";
    contexto.font = "16px font8bits";
    contexto.fillText(text, x, y);
}
//---Dificultad: descripción
function drawTextDifficulty(text, x, y, color){
    contexto.fillStyle = "#fff";
    contexto.font = "12px font8bits";
    contexto.fillText(text, x, y);
}
//---Dificultad: titulo
function drawTextDifficultyTitle(text, x, y, color){
    contexto.fillStyle = "#fff";
    contexto.font = "8px font8bits";
    contexto.fillText(text, x, y);
}
//---Fin de juego
function drawTextEndGame(text, x, y, color, bgcolor){
    contexto.fillStyle = "#fff";
    contexto.font = "20px font8bits";
    contexto.fillText(text, x, y);
}

//****Controles****
//--->Parámetros iniciales
let difficultyLevel = 0.04; //Nivel de dificultad normal
let difficultyLevelText = "MEDIUM";
let welcomeTitle = "    Click to start";
let charPlayer = char1;
let charCPU = char2;
let selectPlayer = 1; //personaje por default
let selectCPU = 1; //personaje por default cpu
let selectCharText = "TALA"; //nombre de personaje por default
var textAlignWidth = canvas.width/2-32; //corrige alineación de nombre del personaje

//---->MOUSE CONTROL
canvas.addEventListener("click", (event) => { //pantallas y selección
    //Pantalla de selección de personaje
    if(screenSelectChar){ 
        const isPointInPath = contexto.isPointInPath(btSelectRight, event.offsetX, event.offsetY);
        contexto.fillStyle = isPointInPath ? dentroBtDerecho() : fuera();
        const isPointInPath2 = contexto.isPointInPath(btSelectLeft, event.offsetX, event.offsetY);
        contexto.fillStyle = isPointInPath2 ? dentroBtIzquierdo() : fuera();
        const isPointInPath3 = contexto.isPointInPath(btSelectPlayer, event.offsetX, event.offsetY);
        contexto.fillStyle = isPointInPath3 ? dentroBtSelect() : fuera();
        const isPointInPath4 = contexto.isPointInPath(btSelectLevel, event.offsetX, event.offsetY);
        contexto.fillStyle = isPointInPath4 ? dentroBtNivel() : fuera();
    }
    //Pantalla de bienvenida
    if(screenWelcome){
        screenWelcome = false;
        screenSelectChar = true;
        bgMusicSelectChar.play();
    } 
    //Pantalla de créditos
    if(screenLoad){ 
        screenLoad = false;
        screenWelcome = true;
    } 
});
canvas.addEventListener("mousemove", (evento) => { //juego
    if(screenGame){
        let rect = canvas.getBoundingClientRect();
        user.y = evento.clientY - rect.top - user.height/2; 
        if(user.y <= 0){
            user.y = 0;
        }
        if(user.y + user.height >= canvas.height){
            user.y = canvas.height - user.height;
        }
    }
});  
//--->CANVAS SCREEN BUTTONS
//Botón nivel de dificultad
const btSelectLevel = new Path2D(); 
btSelectLevel.rect(canvas.width/2 + 180, canvas.height/2+140, 100, 30);
let level = 2;
function dentroBtNivel(){
    level = level + 1;
    if(level == 1){
        difficultyLevel = 0.03; 
        difficultyLevelText = " EASY ";
    }
    if(level == 2){
        difficultyLevel = 0.04;
        difficultyLevelText = "MEDIUM";
        }
    if(level == 3){
        difficultyLevel = 0.05;
        difficultyLevelText = " HARD ";
        level = 0;
    }
    soundSelectLevel.play();
}
//Botón derecho (avanza)
const btSelectRight = new Path2D(); 
btSelectRight.rect(400, canvas.height/2, 100, 40); 
function dentroBtDerecho(){
    selectPlayer = selectPlayer + 1;
    if(selectPlayer == 11 || selectPlayer <= 0) {
        selectPlayer = 1;
    }
    selectPlayerCPU = selectPlayer; //toma el valor del user character para el switch
    seleccionarPersonaje(); // lo mete en el switch
    charPlayer = charPlayerCpu; //carga el resultado en el char player
    soundSelectChar.play();
}
//Botón izquierdo (retrocede)
const btSelectLeft = new Path2D(); 
btSelectLeft.rect(100, canvas.height/2, 100, 40);
function dentroBtIzquierdo(){
    selectPlayer = selectPlayer - 1;
    if(selectPlayer <= 0) {
        selectPlayer = 10;
    }
    selectPlayerCPU = selectPlayer; //toma el valor del user character para el switch
    seleccionarPersonaje(); // lo mete en el switch
    charPlayer = charPlayerCpu; //carga el resultado en el char player
    soundSelectChar.play();
}
//Botón seleccionar
const btSelectPlayer = new Path2D(); 
btSelectPlayer.rect(canvas.width/2 - 50, canvas.height/2+120, 100, 40);
function dentroBtSelect(){
    //---determinación de personaje oponente---
    randomOponent(); //función aleatoria para determinar oponente
    while(selectPlayer == selectCPU){ //Logra que siempre user !=  cpu
        randomOponent();
    }
    //---Asignación de personaje---
    selectPlayerCPU = selectCPU;
    seleccionarPersonaje();
    charCPU = charPlayerCpu;
    soundSelectToPlay.play();
    //---prosecución del pasaje al juego---
    screenSelectChar = false; //abandona screen select character
    bgMusicSelectChar.pause(); //detiene bg música de pantalla anterior
    screenGame = true; //inicia screen game
    bgMusic.play(); //inicia bg music de juego
}
//---Selección aleatoria de oponente
function randomOponent(){
    const lowest = 1; 
    const highest = 10;
    let randomNumber = Math.random() * (highest - lowest) + lowest;
    selectCPU = Math.round(randomNumber);
}
function seleccionarPersonaje(){
    switch(selectPlayerCPU){
        case 1:
            charPlayerCpu = char1;
            selectCharText ="TALA"; 
            textAlignWidth = canvas.width/2-32;
            break;
        case 2:
            charPlayerCpu = char2;
            selectCharText ="PIPE";
            textAlignWidth = canvas.width/2-30;
            break;   
        case 3:
            charPlayerCpu = char3;
            selectCharText ="MICKEY";
            textAlignWidth = canvas.width/2-45;
            break;  
        case 4:
            charPlayerCpu = char4;
            selectCharText ="VALE";
            textAlignWidth = canvas.width/2-30;
            break;
        case 5:
            charPlayerCpu = char5;
            selectCharText ="ANA";
            textAlignWidth = canvas.width/2-22;
            break;
        case 6:
            charPlayerCpu = char6;
            selectCharText ="HUGO";
            textAlignWidth = canvas.width/2-30;
            break;
        case 7:
            charPlayerCpu = char7;
            selectCharText ="LULU ";
            textAlignWidth = canvas.width/2-30;
            break;
        case 8:
            charPlayerCpu = char8;
            selectCharText ="DANNY";
            textAlignWidth = canvas.width/2-40;
            break;
        case 9:
            charPlayerCpu = char9;
            selectCharText ="MENGO";
            textAlignWidth = canvas.width/2-37;
            break;
        case 10:
            charPlayerCpu = char10;
            selectCharText ="EZE";
            textAlignWidth = canvas.width/2-23;
            break;    
        }
}
//Click fuera de botón (nada)
function fuera(){
    if(screenSelectChar){
        //  //
    }
}
//--->KEYBOARD CONTROL
window.addEventListener("keydown", arrowOn, false);
window.addEventListener("keyup", arrowOff, false);
var arrowUp = false;
var arrowDown = false; 

function arrowOn(evento){
    if(screenGame){ //pantalla de juego
        if(evento.keyCode == 38 || evento.key == "ArrowUp") {
            arrowUp = true;
        }
        else if(evento.keyCode == 40 || evento.key == "ArrowDown") {
            arrowDown = true;
            arrowUp = false;
        }
        else if(evento.key == "Enter"){
            if(!paused){
                paused = true;
            }
            if(paused){
                paused = false;
            }
        }
    }
    if(screenSelectChar && !screenGame){ //pantalla de selección de personaje
        if(evento.keyCode == 39 || evento.key == "ArrowRight"){
            dentroBtDerecho();
        }
        if(evento.keyCode == 37 || evento.key == "ArrowLeft"){
            dentroBtIzquierdo();
        }
        if(evento.key == "Enter"){
            dentroBtSelect();
        }
        if(evento.keyCode == 38 || evento.key == "ArrowUp") {
            dentroBtNivel();
        }
        else if(evento.keyCode == 40 || evento.key == "ArrowDown") {
            dentroBtNivel();
        }
    }
    if(screenWelcome){
        if(evento.key == "Enter"){
            screenWelcome = false;
            screenSelectChar = true;
            bgMusicSelectChar.play();
        }
    } 
    //Pantalla de créditos
    if(screenLoad){ 
        if(evento.key == "Enter"){
            screenLoad = false;
            screenWelcome = true;
        }
    }
}
function arrowOff(evento){
    if(screenGame){
        if(evento.key == 38 || evento.key == "ArrowUp") {
            arrowUp = false;
        }
        else if(evento.key == "Down" || evento.key == "ArrowDown") {
            arrowDown = false;
        }
    }
}
function arrowControlLogic(){
    if(arrowUp) {
        
        if (user.y <= 0){
            user.y = 0;
        } else {
            user.y -= 7;
        }
    }
    if(arrowDown) {
        
        if (user.y + user.height >= canvas.height){
            user.y = canvas.height - user.height;
        } else {
            user.y += 7;
        }
    }
}
//--->TOUCH SCREEN
canvas.addEventListener("touchstart", touchHandler);
canvas.addEventListener("touchmove", touchHandler);

function touchHandler(evento){
    if(evento.touches){
        let rect = canvas.getBoundingClientRect();
        user.y = evento.touches[0].clientY - rect.offsetTop - user.height/2;
        if(user.y <= 0){
            user.y = 0;
        }
        if(user.y + user.height >= canvas.height){
            user.y = canvas.height - user.height;
        }
        event.preventDefault();
    }        
}
    //****Lógica del juego***
//-->Detección de colisiones
function collision(b, p){  
    //player (p)
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    //ball (b)
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius; 
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}
//-->Reseteo de pelota (tras marcar punto)
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocidadX = - ball.velocidadX;
    ball.speed = 7;
}
//--->UPDATE
function update(){
    if (ball.x - ball.radius < 0){
        cpu.score++;
        //cpuScore.play();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width){
        user.score++;
        //userScore.play();
        resetBall();
    }
    if (ball.y <= 0){
        ball.y = 0 + ball.radius;
    }
    if (ball.y >= canvas.height){
        ball.y =  canvas.height - ball.radius;
    }
    ball.x += ball.velocidadX;
    ball.y += ball.velocidadY;

    //--Inteligencia de cpu--
    cpu.y += ((ball.y - (cpu.y + cpu.height/2)))*difficultyLevel;
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height){
        ball.velocidadY = -ball.velocidadY;
        //wall.play();
    }
    let player = (ball.x + ball.radius < canvas.width/2) ? user : cpu;
    
    //--Colision--
    if(collision(ball, player)){
        //hit.play();
        let collidePoint = (ball.y - (player.y + player.height/2));
        //Punto de colision
        collidePoint = collidePoint / (player.height / 2);
        //Angulo de rebote
        let angleRad = (Math.PI/4)*collidePoint;
        //Dirección
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        //Acción
        ball.velocidadX = direction*ball.speed * Math.cos(angleRad);
        ball.velocidadY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }
    arrowControlLogic();
}
//****GRAFICOS****
//--->Precarga
if(screenLoad){
    setTimeout(function(){ 
        screenLoad = false;
        screenWelcome = true;
    }, 5000); 
}
//--->Gameplay
function game(){ 
    if(!paused){
        if(screenGame){
            update(); //lógica del juego
        }
        render(); //gráficos
        if(user.score == 3 || cpu.score == 3 ){
            bgMusic.pause();
            clearInterval(loop);
            drawRect(150, 105, 200, 160, bgColorField);
            drawArc(ball.x + 50, ball.y+5, ball.radius, ball.color); //dibujar bola
            if(user.score == 3){   
                playerWins.play();                   
                drawRect(user.x, user.y, 100, 100, bgColorField);
                contexto.drawImage(charPlayer, canvas.width/2-50, canvas.height/2-80, 100, 100);        
                drawTextEndGame("User wins", canvas.width/2-75, canvas.height/2+50);
            }
            else {
                cpuWins.play();            
                drawRect(cpu.x, cpu.y, 100, 100, bgColorField);
                contexto.drawImage(charCPU, canvas.width/2-50, canvas.height/2-80, 100, 100);
                drawTextEndGame("Computer wins", canvas.width/2-120, canvas.height/2+50);
            }
        }
    }
}
//--->Renderización
function render(){
    if(screenLoad){
        drawRect(0,0,canvas.width, canvas.height, "#0c1d11");
        contexto.drawImage(logoFeliPong, 0, 0, 600, 400);
        drawTextStart("Credits", canvas.width/4, 300);      
        drawTextStart("Dev: Miguel Almanza", canvas.width/4, 325);
        drawTextStart("Art: Paula Wasinger", canvas.width/4, 350);
    }
    if(screenWelcome){
        drawRect(0,0,canvas.width, canvas.height, "#0c1d11");
        contexto.drawImage(logoFeliPongScreen, 0, 0, 600, 400); //Pipe
        contexto.drawImage(logoFeliPongSmall, canvas.width/2-120, 55, 255, 155); //Logo      
        drawTextStart(welcomeTitle, canvas.width/4-10, canvas.height/2+40);
    }  
    if(screenSelectChar){
        drawRect(0,0,canvas.width, canvas.height, "#0c1d11"); //clear canvas
        drawTextStart("Choose your character", canvas.width/4, 56);
        drawTextSelect(selectCharText, textAlignWidth, canvas.height/2+100, "white");
        contexto.drawImage(charPlayer, canvas.width/2-70, canvas.height/3, 140, 140);
        contexto.fillStyle = "#69744d";
        contexto.fill(btSelectLeft);
        contexto.fill(btSelectRight);
        contexto.fill(btSelectPlayer);
        contexto.fill(btSelectLevel);
        drawTextSelect("<<", canvas.width - 467, canvas.height/2+30);
        drawTextSelect(">> ", canvas.width -160, canvas.height/2+30);
        drawTextDifficulty("SELECT", canvas.width/2 - 34, canvas.height/2 + 147);
        drawTextDifficultyTitle("Difficulty  ", canvas.width/2 + 195, canvas.height/2 + 135);
        drawTextDifficulty(difficultyLevelText, canvas.width/2 + 195, canvas.height/2+162);
    }    
    if (screenGame){
        bgMusicSelectChar.pause();
        drawRect(0,0,canvas.width, canvas.height, "#132e1b"); //limpiar canvas
        drawText("", canvas.width, canvas.height); //limpiar texto
        drawText(user.score, canvas.width/4, canvas.height/5); //dibujar user score
        drawText(cpu.score, 3*canvas.width/4, canvas.height/5); //dibujar cpu score
        drawNet(); //dibujar red
        drawRect(user.x, user.y, user.width, user.height, user.color); //dibujar paleta usuario
        drawRect(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color); //dibujar paleta cpu
        contexto.drawImage(charPlayer, user.x, user.y, 100, 100);
        contexto.drawImage(charCPU, cpu.x, cpu.y, 100, 100);
        drawArc(ball.x, ball.y, ball.radius, ball.color); //dibujar bola
    }
}
//--->Frames / seg
    let framePerSecond = 50; //frames por segundo
    let loop = setInterval(game, 1000/framePerSecond); //Llamar a la función 50 veces/seg
