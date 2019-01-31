//canvas
let canvas = document.getElementById ('myCanvas')
let ctx = canvas.getContext ('2d')

//globals//
let health = document.getElementById("health")

let interval,
    index,
    frames = 0,
    speed = 2,
    friction = 0.98,
    keys = [];
    potionblue = []
    enemies = []
    level = []
    maxSize = []
    monster1 = []

//images
let imageBoard ={
    bg: "./Images/board1.png",
    logo:"./Images/Logo1.png",
}
let imageSets = {
    stone1:"./Images/stone1.png",
    stone2:"./Images/stone2.png",
    stone3:"./Images/stone3.png",
    stone4:"./Images/stone4.png",
    wall:"./Images/muro1.png",
}
let imageEnem = [
    {img1: "./Images/enemy1.png", img2: "./Images/enemy1b.png"},
    {img1: "./Images/enemy1der.png", img2: "./Images/enemy1der2.png"},
    {img1: "./Images/enemy2.png", img2: "./Images/enemy2b.png"},
    {img1: "./Images/enemy2der.png", img2: "./Images/enemy2der2.png"},
    {img1: "./Images/enemy3.png", img2: "./Images/enemy3b.png"},
    {img1: "./Images/enemy3der.png", img2: "./Images/enemy3der2.png"},
    {img1: "./Images/enemy4.png", img2: "./Images/enemy4b.png"},
    {img1: "./Images/enemy4der.png", img2: "./Images/enemy4der2.png"}
]
let imageHero =[
    {img1 : "./Images/Hero1.png", img2:"./Images/Hero2.png",img3:"./Images/Hero3.png"}
]
let imageItems = {
    goodAction1:"./Images/Good1.png",
    goodAction2:"./Images/Good2.png",
    potionBlue:"./Images/BluePotion.png",
    potionRed:"./Images/RedPotion.png",
    bomb:"./Images/Bomb.png",
}
let heroBullets = [
    { blueFire1 : "./Images/BlueFireball1.png", blueFire2 : "./Images/BlueFireball2.png", blueFire3 : "./Images/BlueFireball3.png" }
]    
let enemiesBullets = [
    { fire1 : "./Images/Fireball1.png", fire2 : "./Images/Fireball2.png", fire3 : "./Images/Fireball3.png"}
]

//clases
class Board{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = imageBoard.bg
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }
     draw() {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.fillStyle = "white";
        ctx.font = '50px Avenir';
        ctx.fillText(Math.floor(frames / 60), this.width -100, 50)
    }
}

class Hero{
    constructor(){
        this.which = true;
        this.width = 40;
        this.height = 40;
        this.x = (canvas.width - this.width) / 2 ;
        this.y = (canvas.height - this.height) / 2;
        this.velY= 0;
        this.velX= 0;
        this.image = new Image ();
        index = Math.floor(Math.random() * imageHero.length)
        this.image.src = imageHero[index].img1;
        this.image2 = new Image();
        this.image2.src = imageHero[index].img2;
        this.image3 = new Image();
        this.image3.src = imageHero[index].img3;
        this.health = 10;
    }
    draw(){
        let img = this.which ? this.image:this.image2;
        ctx.drawImage(img,this.x,this.y,this.width,this.height);
        if(frames%20===0) this.toggleWhich();
    }
    toggleWhich() {
        this.which = !this.which;
    }
    checkIfTouch(obstacle){
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
          );
    }
}

class Enemy{
    constructor(){
    this.which = true;
        this.width = 50;
        this.height = 50;
        this.x = (canvas.width - this.width) / 3 ;
        this.y = (canvas.height - this.height) / 3;
        this.velY= 0;
        this.velX= 0;
        this.image = new Image ();
        index = Math.floor(Math.random() * imageEnem.length)
        this.image.src = imageEnem[index].img1;
        this.image2 = new Image();
        this.image2.src = imageEnem[index].img2;
        this.bullets = []
    }
    draw(){
        let img = this.which ? this.image:this.image2;
        ctx.drawImage(img,this.x,this.y,this.width,this.height);
        if(frames%20===0) this.toggleWhich();
    }
    toggleWhich() {
        this.which = !this.which;
    }
    shootNrunAway (){
        this.x-=5;
    }
    checkIfTouch(item){
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
          );
    }
}

class Bullet {
    constructor(){
        this.x= 0
        this.y = 0
        this.width = 15
        this.height = 15
        this.image = new Image ()
        this.image.src = imageItems. 
    }
}

class Items {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 20;
        this.height = 20;
        this.image = new Image ()
        this.image.src = imageItems.bomb
        this.image.onload = this.draw.bind(this)
    }
    draw(){
        //abajo
        if (this.y < canvas.height-this.height) this.y +=2
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    }
    


//instancias
let fondo = new Board()
let tobias = new Hero()
let enemies = new Enemy()


//main functions
function start (){
    interval = setInterval (update, 1000/60)
}

function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    frames++

    

    if (keys[38]) {
        if (tobias.velY > -speed) {
            tobias.velY--;
        }
    }
    if (keys[40]) {
        if (tobias.velY < speed) {
            tobias.velY++;
        }
    }
    if (keys[39]) {
        if (tobias.velX < speed) {
            tobias.velX++;
        }
    }
    if (keys[37]) {
        if (tobias.velX > -speed) {
            tobias.velX--;
        }
    }    
    checkCollisonHero()

    ctx.clearRect(0, 0, 700, 500);
    updatePlayer(tobias);
    
    setTimeout(update, 10);
}

function gameOver(){

    clearIntervalº(interval)
    // clearCanvas()
    ctx.font = "VT323 150px"
    ctx.fillStyle = "black"
    ctx.fillText ("GAME OVER", 380,300)
    ctx.fillText ("Press enter to restart", 380,400)
}



//
function updatePlayer(player) {
    player.velY *= friction;
    player.y += player.velY;
    player.velX *= friction;
    player.x += player.velX;

    if (player.x >= 610) {
        player.x = 610;
    } else if (player.x <= 25) {
        player.x = 25;
    }

    if (player.y > 400) {
        player.y = 400;
    } else if (player.y <= 40) {
        player.y = 40;
    }
    if (keydown.space) {
        player.shoot();
    }
    fondo.draw()
    player.draw()
    enemies.draw()
}

//auxiliar functions
function checkCollisonHero(){
    if(tobias.checkIfTouch(enemies)){
        tobias.x+= (tobias.velX * -5) //cambiar con valores enemies
        tobias.y+= (tobias.velY * -5)
        tobias.velX = -tobias.velX
        tobias.velY = -tobias.velY
        tobias.health <= 10
        // gameOver()
    }   
}

function checkCollisonEnemy(){
    if(enemies.checkIfTouch(bulletHero)){
        enemyDies()
        // gameOver()
    }   
}

function generateEnemy(){
    if(!(frames%100===0) ) return;
    let enemX = new Enemy();
    monster1.push(enemX);
    enemX.image1.src = imageEnem.index
    enemX.x = canvas.width -100
    generateBullet(enemX)
}

function drawEnemy(){
        monster1.forEach(function(enemY){
            enemY.draw();
}

update()
//listeners

addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});