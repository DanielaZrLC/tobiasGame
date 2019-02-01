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
        potionBlue = [],
        gameStarted = false,
        level = 1,
        maxSize = [],
        monster = [],
        losEnemies = 0,
        MAX_SIZE = 3,
        MAX_BULLETS = 1


    //images
    let armor = {
        bulletHero: './Images/bullet.png'
    }

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
        potionBlue:"./Images/BluePotion.png",
        potionRed:"./Images/RedPotion.png",
        bomb:"./Images/Bomb.png",
    }
    let good =  {
        goodAction:"./Images/Good1.png",
}
    let heroBullets = [
        { blueFire1 : "./Images/BlueFireball1.png", blueFire2 : "./Images/BlueFireball2.png", blueFire3 : "./Images/BlueFireball3.png" }
    ]    
    let enemiesBullets = [
        { fire1 : "./Images/Fireball1.png", fire2 : "./Images/Fireball2.png", fire3 : "./Images/Fireball3.png"}
    ]

    let sounds = {
        bgSound: './sounds/back.mp3',
        monsterDeath: './sounds/monster.mp3',
        heroDies: './sounds/heroDie.mp3'
    }


    let monsterScream = new Audio();
    monsterScream.src = sounds.monsterDeath
    
    let backgroundSound = new Audio();
    backgroundSound.src = sounds.bgSound
    backgroundSound.loop = true;
    backgroundSound.currentTime = 0

    let heroDies = new Audio();
    heroDies.src = sounds.heroDies;


    //clases
    class Board{
        constructor(){
            this.x = 0;
            this.y = 0;
            this.width = canvas.width;
            this.height = canvas.height;
            this.time = 0;
            this.boardConta = 0
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
            this.time = Math.floor(frames / 60)
            ctx.fillText(this.time,  this.width -100, 50)
        }
    }

    
 /////////////////////   
    class Stone2{
        constructor(){
            this.x = 530;
            this.y = 350;
            this.width = 50;
            this.height = 50;
            this.image = new Image ();
            this.image.src = imageSets.stone2
            this.image.onload = function(){
                this.draw();

            }.bind(this)
        }
        draw() {
            ctx.drawImage(this.image, this.x,this.y,this.width,this.height)
        }

        checkCollisonStone(hero) {
            if(this.checkIfTouch(hero)){
                hero.x+= (this.velX * -3) //cambiar con valores enemies
                hero.y+= (this.velY * -3)
                hero.velX = (this.velX  * -1)
                hero.velY = (this.velY * -1)
            }
        }
    }
    class Stone3{
        constructor(){
            this.x = 80;
            this.y = 350;
            this.width = 50;
            this.height = 50;
            this.image = new Image ();
            this.image.src = imageSets.stone3
            this.image.onload = function(){
                this.draw();

            }.bind(this)
        }
        draw() {
            ctx.drawImage(this.image, this.x,this.y,this.width,this.height)
        }
        checkCollisonStone(hero) {
            if(this.checkIfTouch(hero)){
                hero.x+= (this.velX * -3) //cambiar con valores enemies
                hero.y+= (this.velY * -3)
                hero.velX = (this.velX  * -1)
                hero.velY = (this.velY * -1)
            }
        }
    }
    ////////////////

    class Hero{
        constructor(){
            this.which = true;
            this.width = 40;
            this.height = 40;
            this.x = (canvas.width - this.width) / 2 ;
            this.y = (canvas.height - this.height) / 2;
            this.velY= 0;
            this.velX= 0;
            this.isAlive = true;
            this.bullets = [];
            this.enemiesKilled = 0;
            this.score = 0
            this.image = new Image ();
            index = Math.floor(Math.random() * imageHero.length)
            this.image.src = imageHero[index].img1;
            this.image2 = new Image();
            this.image2.src = imageHero[index].img2;
            this.image3 = new Image();
            this.image3.src = imageHero[index].img3;
            this.health = 100;
        }

        toDie(){
            if(this.health <= 0 ){
                heroDies.play()
                gameOver()
            }
        }
        // this.bullets.forEach()

        drawHealth() {
            ctx.fillStyle = "green"
            ctx.fillRect(20, 60, this.health * 2, 20)
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

    class Bullet {
        constructor(character) {
          this.width = 20;
          this.height = 20;
          this.x = character.x + (character.width/2) - (this.width / 2);
          this.y = character.y //- this.height;
          this.vX = 2;
          this.sx = 0;
          this.sy = 0;
          this.outOfRange = false
          this.imagee = new Image();
          this.imagee.src = armor.bulletHero;
          this.imagee.onload = function(){
            this.draw();
          }.bind(this);
        }
    
        draw() {
          

          if (frames % 5 === 0) this.sx += 160;
          if (this.sx === 480) this.sx = 0;
          this.x -= this.vX;
          if(this.x < 0){
              this.outOfRange = true;
          }
          ctx.drawImage(
              this.imagee,
                this.sx,
                this.sy,
                200,
                200,
                this.x,
                this.y,
                this.width,
                this.height
    );
          
        
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
            this.index;
            this.image = new Image ();
            index = Math.floor(Math.random() * imageEnem.length)
            this.image.src = imageEnem[index].img1;
            this.image2 = new Image();
            this.image2.src = imageEnem[index].img2;
            
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
    
    ////////
    
    class Potion {
        constructor(){
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.width = 20;
            this.height = 20;
            this.image = new Image ()
            this.image.src = imageItems.potionBlue
            this.image.onload = this.draw.bind(this)
        }
        draw(){
            let img = this.image
            ctx.drawImage(img,this.x,this.y,this.width,this.height);
        }
    }


        class Bomb {
            constructor(){
                this.x = 200;
                this.y = 250;
                this.width = 20;
                this.height = 20;
                this.image = new Image ()
                this.image.src = imageItems.bomb
                this.image.onload = this.draw.bind(this)
            }
            draw(){
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            }
            }
        class File {
            constructor (){
            this.x = 200;
            this.y = 200;
            this.width = 25;
            this.height = 25;
            this.image = new Image()
            this.image.src = good.goodAction
            this.image.onload = this.draw.bind(this)
            }
            draw(){
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
        }

    //instancias
    let fondo = new Board()
    let tobias = new Hero()
    // let enemies = new Enemy()
    let potion = new Potion()
    let bomb = new Bomb()
    let stone = new Stone2()
    let rock = new Stone3()
    let goods = new File()


    //main functions

    function intro_screen(){
        
        ctx.font = "50px Impact";
        ctx.fillStyle = "#0099CC";
        ctx.textAlign = "center";
        ctx.fillText("Tobias is waiting...", canvas.width/2, canvas.height/2);
    
        ctx.font = "20px Arial";
        ctx.fillText("Press The Start Button", canvas.width/2, canvas.height/2 + 50);
        
    }
    intro_screen()

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function start(){
        gameStarted = true;
        
         interval = setInterval (
            update()
        , 1000/60)
        backgroundSound.play()
    }


    function update(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        frames++
        // drawBullets(tobias);
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
        // checkCollisonHero()
        // checkCollisonEnemy()
        checkCollisonStone()
        checkAllEnemiesCollisions()
        hitHealth()
        

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatePlayer(tobias);
        generateEnemy()
        drawEnemy()
        // enemies.draw()
        potion.draw()
        bomb.draw()
        stone.draw()
        goods.draw()
        rock. draw()
        

        
        setTimeout(update, 10);
    }

    function gameOver(){
        clearInterval(interval)
        fondo.boardConta = fondo.time
        backgroundSound.currentTime = 0
        tobias.score = fondo.boardConta + tobias.enemiesKilled
        backgroundSound.pause() 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearCanvas()
        ctx.font = "VT323 150px"
        ctx.fillStyle = "black"
        ctx.fillText ("GAME OVER", 380,300)
        ctx.fillText ("Tu score es" + tobias.score, 380,400)
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
        player.bullets.forEach(b => {
            b.draw()
            if(b.x < canvas.x){
                player.bullets.pop();
                console.log(hero.bullets.length)
            }
        })
        player.drawHealth()
        player.toDie()
        escucha()   
    }

    function generateBullet(hero) {
        console.log(hero.bullets.length)
        if(hero.bullets.length < MAX_BULLETS){
            let bullet = new Bullet(hero);
            hero.bullets.push(bullet);
        } else if(hero.bullets[0].x < 0){
            hero.bullets.pop()
        }
      }
    
    function drawBullets(hero) {
        hero.bullets.forEach(function(bull){
            bull.draw();
            console.log(bull.x)
            if(bull.x < canvas.x){
                hero.bullets.pop();
            }
        })
    }

    function hitHealth() {
        monster.forEach((individual, index) => {
          if (tobias.checkIfTouch(individual)) {
            // individual.splice(index, 1)
            if(tobias.health > 0){
                tobias.health--
            }else {
                gameOver()
            }
            
          }
        })
      }

      

    function checkAllEnemiesCollisions(){
        monster.forEach((individual, index) => {
            if(individual.checkIfTouch(stone) || individual.checkIfTouch(rock)){
                individual.x-=2
                individual.y-=4
                individual.velX = Math.floor(Math.random() * 15)
                individual.velY = Math.floor(Math.random() * 15)    
            } else if(individual.checkIfTouch(tobias.bullets[0]? tobias.bullets[0] : 0)){
                let bala = tobias.bullets
                console.log(bala)
                monsterScream.play()
                monster.splice(index, 1)
                
                if(bala[0].checkIfTouch(individual)){
                    tobias.enemiesKilled++
                    bala.pop();
                    // MAX_BULLETS++
                }
                // bala[0].forEach((elem, index) =>{
                //     if(elem.checkIfTouch(individual)){
                //         bala.splice(index, 1)
                //     }
                // })
                losEnemies--;
                MAX_SIZE*=1.5;
                console.log("Soy un monstruo estúpido")
            }
        })
    }

    // function checkBulletCollision(){
    //     if(tobias.bullets[0].checkIfTouch(monsters.forEach(indivudual)))
    // }
    
////////////////////
    function checkCollisonStone(){
        if(tobias.checkIfTouch(stone) || tobias.checkIfTouch(rock)){
            tobias.x-=2
            tobias.y-=4
            tobias.velX = 0
            tobias.velY = 0
        }   
    }

 ////////////////////

    function generateEnemy(){
        if(!(frames%100===0)) return 
        if(losEnemies < MAX_SIZE){
        losEnemies++
            console.log("Generé uno marica")
            let enemike = new Enemy();
            monster.push(enemike);
}
    }

    function drawEnemy(){
        monster.forEach(function(e, index){
            e.index = index;
            e.draw();
            e.moveEnemy();
            e.checkCollison(tobias)
            
        })
    }
    function escucha(){
        if (keys[32]) {
            generateBullet(tobias);
        }
    } 
    // update()
    //listeners

    addEventListener("keydown", function (e) {
        keys[e.keyCode] = true;
    });
    addEventListener("keyup", function (e) {
        keys[e.keyCode] = false;
    });


    window.onload = function(){

        document.getElementById('startButton').addEventListener('click', function(){
            if(!gameStarted){
                start()
            }
        });
    }

    

