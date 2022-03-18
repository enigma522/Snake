const canvas= document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let sounds = ["electro.mp3","electro1.mp3"];

let speed = 7;
let result=false;
let tileCount = 25;

let tilesize = canvas.width / 20 -2 ;

let headx = 10;
let heady = 10;
var snakeParts = [];
let tailLength = 2;

let xVelocity=0;
let yVelocity=0;


let appelx=Math.floor(Math.random()*19)+1;
let appely=Math.floor(Math.random()*19)+1;

let score=0;

function drawgame(){
  document.querySelector(".btn").style.visibility = "hidden";
  changesnakeposision();
  result=isgameover();
  if(result)
    return;
  background();
  scores();
  cheakborder();
  drawsnake();
  drawappel();
  checkeatappel();

  setTimeout(drawgame,1000/speed);
}


function background(){
  ctx.fillStyle = '#261C2C';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}


function drawsnake(){
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'blue';
  ctx.fillStyle = "blue";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tilesize, tilesize);
  }

  snakeParts.push(new SnakePart(headx, heady)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = -2;
  ctx.shadowBlur = 11;
  ctx.shadowColor = ' blue ';
  ctx.lineWidth = 100;


  ctx.fillStyle = 'blue';
  ctx.fillRect(headx*tileCount,heady*tileCount,tilesize,tilesize);
}

function drawappel(){
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 12;
  ctx.shadowColor = ' red ';
  ctx.lineWidth = 100;
  ctx.fillStyle = "red";
  ctx.fillRect(appelx*tileCount,appely*tileCount,tilesize,tilesize);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

function checkeatappel(){
  if(appelx==headx&&appely==heady){
    console.log("yes");
    score++;;
    ch = sounds[Math.floor(Math.random()*2)];
    var sound = new Audio(ch);
    sound.play();
    if(speed>15)
      speed=speed+0.255
    else
      speed+=0.5;
    tailLength++;
    appelx=Math.floor(Math.random()*19)+1;
    appely=Math.floor(Math.random()*19)+1;
  }
}


document.querySelector("body").addEventListener("keydown",function(){
  if(event.keyCode==38){
    if(yVelocity==1){return}
    yVelocity=-1;
    xVelocity=0;
  }
  if(event.keyCode==40){
    if(yVelocity==-1){return}
    yVelocity=1;
    xVelocity=0;
  }
  if(event.keyCode==39){
    if(xVelocity==-1){return}
    yVelocity=0;
    xVelocity=1;
  }
  if(event.keyCode==37){
    if(xVelocity==1){return}
    yVelocity=0;
    xVelocity=-1;
  }
});


document.querySelector("body").addEventListener("touchstart",function(){
  if(event.keyCode==38){
    if(yVelocity==1){return}
    yVelocity=-1;
    xVelocity=0;
  }
  if(event.keyCode==40){
    if(yVelocity==-1){return}
    yVelocity=1;
    xVelocity=0;
  }
  if(event.keyCode==39){
    if(xVelocity==-1){return}
    yVelocity=0;
    xVelocity=1;
  }
  if(event.keyCode==37){
    if(xVelocity==1){return}
    yVelocity=0;
    xVelocity=-1;
  }
});



function cheakborder(){
  if(headx<0){
    headx=19;
    xVelocity=-1;
  }
  if(headx>19){
    headx=0;
    xVelocity=1;
  }
  if(heady<0){
    heady=19;
    yVelocity=-1;
  }
  if(heady>19){
    heady=0;
    yVelocity=1;
  }
}


function changesnakeposision(){
  headx+=xVelocity;
  heady+=yVelocity;
}


function scores(){
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "#FA7D09";
  ctx.textAlign = "left";
  ctx.fillText("score: "+score, canvas.width-95, 20);
}

document.querySelector(".btn").addEventListener("click",function(){
  playagin();
  drawgame();
})

function isgameover(){
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }
  for (var i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i]
    if(part.x===headx && part.y===heady){
      document.querySelector(".btn").style.visibility = "visible";
      document.querySelector("h1").innerHTML = "Game Over !";
      return true;
    }

  }
}

function playagin(){
  document.querySelector("h1").innerHTML = "Snake 2D";
  score=0;
  snakeParts = [];
  headx = 10;
  heady = 10;
  tailLength = 2;
  speed = 7;
  xVelocity = 0;
  yVelocity = 0;
}

drawgame();
