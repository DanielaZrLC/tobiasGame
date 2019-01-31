    //canvas
    let canvas = document.getElementById ('myCanvas')
    let ctx = canvas.getContext ('2d')

    //globals//
    let health = document.getElementById("health")

    let interval,
        index,
        angle,
        frames = 0,
        speed = 2,
        friction = 0.98,
        keys = [],
        potionblue = [],
        // enemies = [],
        level = 1,
        maxSize = [],
        monster = [],
        losEnemies = 0

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
            this.health = 100;
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
            this.x = Math.floor(Math.random() * ((canvas.width - this.width) / 3));
            this.y = Math.floor(Math.random() * ((canvas.height - this.height) / 3));
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
        
        checkIfTouch(obstacle){
            return (
                this.x < obstacle.x + obstacle.width &&
                this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height &&
                this.y + this.height > obstacle.y
            );
        }
        
        
        checkCollison(hero) {
            if(this.checkIfTouch(hero)){
                hero.x+= (this.velX * -3) //cambiar con valores enemies
                hero.y+= (this.velY * -3)
                hero.velX = this.velX  * -1
                hero.velY = this.velY * -1
            }
        }

        moveEnemy(){
            angle =Math.atan2(this.y-tobias.y,this.x-tobias.x)
            this.x -= Math.cos(angle)*1
            this.y-=Math.sin(angle)*1 
            this.velX = Math.floor(Math.random() * 3)
            this.velY= Math.floor(Math.random() * 3)
        }
    }

    class Bullet {
        constructor(){
            this.x= 0
            this.y = 0
            this.width = 15
            this.height = 15
            this.image = new Image ()
            this.image.src = imageItems
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
        
        

        // moveEnemy()
        checkCollisonHero()
        checkCollisonEnemy()

        ctx.clearRect(0, 0, 700, 500);
        updatePlayer(tobias);
        generateEnemy()
        drawEnemy()
        enemies.draw()
        
        setTimeout(update, 10);
    }

    function gameOver(){

        clearInterval(interval)
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
        
        fondo.draw()
        player.draw()
        

    }

    // auxiliar functions
    function checkCollisonHero(){
        if(tobias.checkIfTouch(enemies)){
            tobias.x+= (tobias.velX * -5) //cambiar con valores enemies
            tobias.y+= (tobias.velY * -5)
            tobias.velX = -tobias.velX
            tobias.velY = -tobias.velY
            // gameOver()
        }   
    }

    function checkCollisonEnemy(){
        if(enemies.checkIfTouch(tobias)){
            console.log({hey: enemies.velX, heeh: enemies.velY})
            tobias.x+= (enemies.velX * -1) //cambiar con valores enemies
            tobias.y+= (enemies.velY * -1)
            tobias.velX = enemies.velX  * -1
            tobias.velY = enemies.velY * -1
            // gameOver()
        }   
    }
 
    function generateEnemy(){
        if(!(frames%100===0)) return 
        if(losEnemies < 3){
        losEnemies++
            console.log("Generé uno marica")
            let enemike = new Enemy();
            monster.push(enemike);
}
    }

    function drawEnemy(){
        monster.forEach(function(e, index){
            e.draw();
            e.moveEnemy();
            e.checkCollison(tobias)
            
        })
    }


    update()
    //listeners

    addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });