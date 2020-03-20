
    window.onload = () => {
        document.getElementById("start-button").onclick = () => {
            startGame();
        };
        document.getElementById("tryAgain").onclick = () => {
            location.reload()
        };

        
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")
    
        let imgOcean = new Image()
        imgOcean.src = 'images/ocean.jpg'
    
        let imgTurtle = new Image()
        imgTurtle.src = 'images/turtle.png'
    
        let imgTearMissile1 = new Image()
        imgTearMissile1.src = 'images/tearMissile.png'
    
        let imgBottle = new Image()
        imgBottle.src = 'images/bottle.png'
    
        let imgGameOver = new Image()
        imgGameOver.src = 'images/gameOver.png'

        let frameCounter = 0
        bottlesAnnihilated = 0


        let turtle = {
            x: 100,
            y: 550,
            width: 100,
            height: 120,
            img: imgTurtle
        }
    
        let tearMissile1 = {
            x: turtle.x + 40,    //+40 is approx the half of the turtle's length
            y: turtle.y - 5,     
            width: 20,
            height: 40,
            img: imgTearMissile1
        }
        
        class Missiles {
            constructor() {
                this.x = turtle.x + 40
                this.y = turtle.y - 5
                this.width = 20
                this.height = 40
                this.img = imgTearMissile1
            }
        }

        class Bottle {
            constructor(x, y, height, width) {
                this.x = x
                this.y = y
                this.height = height
                this.width = width
                this.img = imgBottle
            }
        }
    
        let myMissiles =  [];

        let myBottles = [];
        
        let checkGameOver = false;

        let addTwoRawsOfBottles = () => {


            for (let i = 0; i < 13; i++) {

                myBottles.push(new Bottle(i * 40 + 40, 10, 50, 50))

            }
            // same modidying y 
            for (let i = 0; i < 13; i++) {

                myBottles.push(new Bottle(i * 40 + 40, 70, 50, 50))

            }
        
        }
        let shootAMissile = () => {
             myMissiles.push(new Missiles)
        }
        setInterval(shootAMissile, 400);


        let draw = () => {
            drawBackground();
            drawTurtle();
            drawMissiles();
            drawScore();
            drawBottles();
            collisionDetection();

            myBottles.forEach(element => {
                if (element.y - (element.height-45) > (canvas.height - turtle.height)) {
                    checkGameOver = true
                }

            });
            if (!checkGameOver) {
                window.requestAnimationFrame(draw) // calls itself 60 times per second
            }else{
                gameOver();
            }
        }

        let drawBackground = () => {
            ctx.drawImage(imgOcean, 0, 0, canvas.width, canvas.height)
        }

        let drawTurtle = () => {
            ctx.drawImage(turtle.img, turtle.x, turtle.y, turtle.width, turtle.height)
            if (turtle.x < 0) {
                turtle.x += 10
            }
            if (turtle.x > 500) {
                turtle.x -= 10
            }
        }

        // let drawMissile1 = () => {
        //     ctx.drawImage(tearMissile1.img, tearMissile1.x, tearMissile1.y, tearMissile1.width, tearMissile1.height)
        //     console.log('missile1')

        //     if (tearMissile1.x < 40) {
        //         tearMissile1.x += 10
        //     }
        //     if (tearMissile1.x > 540) {
        //         tearMissile1.x -= 10
        //     }

        //     tearMissile1.y -= 10

        //     if (tearMissile1.y < 0) {
        //         tearMissile1.y = turtle.y
        //     }
        // }


        let velocityBottles = 0.5

        let drawBottles = () => {
            for (let i = 0; i < myBottles.length; i++) {
                ctx.drawImage(myBottles[i].img, myBottles[i].x, myBottles[i].y, 50, 50)
                 myBottles[i].y += velocityBottles

            }

            if (myBottles.length === 0) {
                addTwoRawsOfBottles();
            }
        }

     


        let drawMissiles = () => {
            for (let i = 0; i < myMissiles.length; i++) {
                ctx.drawImage(myMissiles[i].img, myMissiles[i].x, myMissiles[i].y, myMissiles[i].width, myMissiles[i].height)

                 if (myMissiles[i].x < 40) {
                    myMissiles[i].x += 10
                }
                if (myMissiles[i].x > 540) {
                    myMissiles[i].x -= 10
                }
                myMissiles[i].y -= 7
              
                

            }
            
        }

        // add a for loop for the missiles + a splice to delete missiles 
        let collisionDetection = () => {
            for (let i = 0; i < myBottles.length; i++) {
                for (let j = 0; j < myMissiles.length; j++) {

                    if (
                        (myMissiles[j].y <= myBottles[i].y + 50) &&
                        (myMissiles[j].y >= myBottles[i].y) &&
                        (myMissiles[j].x >= myBottles[i].x) &&
                        (myMissiles[j].x <= myBottles[i].x + 50)
                    ) {
                        myBottles.splice(i, 1);
                        myMissiles.splice(j, 1);
                        bottlesAnnihilated += 1;

                    }
                }
            }

        }

        let drawScore = () => {
            ctx.font="30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(`Score : ${bottlesAnnihilated}`, 0, 22)
        }



        //moving the turtle left and right (missiles follow)
        document.onkeydown = (event) => {
            if (event.key === 'ArrowRight') {
                turtle.x += 18
                tearMissile.x += 18
            }
            if (event.key === 'ArrowLeft') {
                turtle.x -= 18
                tearMissile.x -= 18
            }
        }
    
    
        function startGame() {
            draw()
        }


        let gameOver = () => {
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height)
            document.getElementById("tryAgain").className = "display"
        }
        // document.getElementById("tryAgain")

      
    };

    
        