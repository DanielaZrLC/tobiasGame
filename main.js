



//canvas
let canvas = document.getElementById ('myCanvas')
let ctx = canvas.getContext ('2d')


//globals//

let interval
let frames = 0
let x = 150,
    y = 150,
    velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.98,
    keys = [];
// let player1 = Hero
// let player2 = Hero2




//images
let imageBoard ={
    bg: "./Images/board1.png",
    stone1:"./Images/stone1.png",
    stone2:"./Images/stone2.png",
    stone3:"./Images/stone3.png",
    stone4:"./Images/stone4.png",
    wall:"./Images/muro1.png"
}
let imageEnemies = {
    impLeft1: "./Images/enemy1.png",
    impLeft2:"./Images/enemy1b.png",
    impRig1: "./Images/enemy1der2.png",
    impRig2: "./Images/enemy1der2.png",
    cacoLeft1: "./Images/enemy2.png",
    cacoLeft2: "./Images/enemy2b.png",
    cacoRig1: "./Images/enemy2der.png",
    cacoRig2:"./Images/enemy2der2.png",
    skullLeft1:"./Images/enemy3.png",
    skullLeft2:"./Images/enemy3b.png",
    skullRig1: "./Images/enemy3der.png",
    skullRig2:"./Images/enemy3der2.png.png",
    pinkyLeft1:"./Images/enemy4.png",
    pinkyLeft2:"./Images/enemy4b.png",
    pinkyRig1:"./Images/enemy4der.png",
    pinkyRig:"./Images/enemy4der2.png",
}

let imageHero ={

}

let imageItems = {
    goodAction1:"./Images/Good1.png",
    goodAction12:"./Images/Good2.png",
    potionBlue:"./Images/BluePotion.png",
    potionRed:"./Images/RedPotion.png",
    bomb:"./Images/Bomb.png",
}

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
        // this.x -= this.x;
        // if(this.x === -this.width) this.x = 0;
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        // ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
        ctx.fillStyle = "white";
        ctx.font = '50px Avenir';
        ctx.fillText(Math.floor(frames / 60), this.width -100, 50)
    }
}

    class Hero{
    constructor(){
        this.which = true;
        this.x = 0;
        this.y = canvas.height / 2;
        this.velY= 0;
        this.velX= 0;
        this.width = 50;
        this.height = 50;
        this.image = new Image ();
        this.image.src = imageEnemies.impLeft1;
        this.image2 = new Image();
        this.image2.src = imageEnemies.impLeft2;
    }

    draw(){
        let img = this.which ? this.image:this.image2;
        ctx.drawImage(img,this.x,this.y,this.width,this.height);
        if(frames%10===0) this.toggleWhich();
        
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

class Enemies{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = imageEnemies.skullLeft1;
    }
}

class Items {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 20;
        this.height = 20;
        this.image = new Image ()
        this.image.src = imageItems.stone1;
    }
}
//instancias
let fondo = new Board()
let tobias = new Hero()



//main functions

function start (){
    interval = setInterval (update, 1000/60)
}

function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    frames++
    // fondo.draw()
    // tobias.draw()
    // updatePlayer();

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
    ctx.clearRect(0, 0, 700, 500);
    updatePlayer(tobias);
    
    setTimeout(update, 10);
}

////////////////////////////////////
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
    fondo.draw()
    player.draw()
}
//////////////////////////////////////////
// function gameOver(){
//     ctx.font = "80px Avenir";
//     ctx.fillText("Game Over", 20,100);
//     ctx.font = "20px Serif";
//     ctx.fillStyle = 'peru';
//     ctx.fillText("Ganó el jugador: " + x, 20,130);
//     ctx.fillText("Press 'Esc' to reset", 20,160);
// }

//auxiliar functions
update()
//listeners

addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


