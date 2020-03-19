
    window.onload = () => {
        document.getElementById("start-button").onclick = () => {
            startGame();
        };
        
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext("2d")
    
        let imgOcean = new Image()
        imgOcean.src = 'images/ocean.jpg'
    
        let imgTurtle = new Image()
        imgTurtle.src = 'images/turtle.png'
    
        let imgTearMissile1 = new Image()
        imgTearMissile1.src = 'images/tearMissile.png'

        let imgTearMissile2 = new Image()
        imgTearMissile2.src = 'images/tearMissile.png'
    
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
        let tearMissile2 = {
            x: turtle.x + 40,    
            y: turtle.y - 5,     
            width: 20,
            height: 40,
            img: imgTearMissile2
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

        let oneBottle = new Bottle();

        let addTwoRawsOfBottles = () => {


            for (let i = 0; i < 13; i++) {

                myBottles.push(new Bottle(i * 40 + 40, 10, 50, 50))

            }
            // same modidying y 
            for (let i = 0; i < 13; i++) {

                myBottles.push(new Bottle(i * 40 + 40, 70, 50, 50))

            }
        
        }

        let draw = () => {
            // frameCounter++
            drawBackground();
            drawTurtle();
            drawMissile1();
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

        let drawMissile1 = () => {
            ctx.drawImage(tearMissile1.img, tearMissile1.x, tearMissile1.y, tearMissile1.width, tearMissile1.height)
            console.log('missile1')

            if (tearMissile1.x < 40) {
                tearMissile1.x += 10
            }
            if (tearMissile1.x > 540) {
                tearMissile1.x -= 10
            }

            tearMissile1.y -= 10

            if (tearMissile1.y < 0) {
                tearMissile1.y = turtle.y
            }
        }

        let drawMissile2 = () => {
            console.log('missile2')
            ctx.drawImage(tearMissile2.img, tearMissile2.x+20, tearMissile2.y, tearMissile2.width, tearMissile2.height)
            if (tearMissile2.x < 40) {
                tearMissile2.x += 10
            }
            if (tearMissile2.x > 540) {
                tearMissile2.x -= 10
            }

            tearMissile2.y -= 6

            if (tearMissile2.y < 0) {
                tearMissile2.y = turtle.y
            }
        }

        let drawBottles = () => {
            for (let i = 0; i < myBottles.length; i++) {
                ctx.drawImage(myBottles[i].img, myBottles[i].x, myBottles[i].y, 50, 50)
                 myBottles[i].y += 0.5

            }

            if (myBottles.length === 0) {
                addTwoRawsOfBottles();
            }
        }

        let collisionDetection = () => {
            for (let i = 0; i < myBottles.length; i++) {
                if (
                    (tearMissile1.y <= myBottles[i].y + 50) &&
                    (tearMissile1.y >= myBottles[i].y) &&
                    (tearMissile1.x >= myBottles[i].x) &&
                    (tearMissile1.x <= myBottles[i].x + 50)
                ) {
                    myBottles.splice(i, 1);
                    bottlesAnnihilated += 1;
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
                tearMissile1.x += 18
            }
            if (event.key === 'ArrowLeft') {
                turtle.x -= 18
                tearMissile1.x -= 18
            }
        }
    
    
        function startGame() {
            draw()
        }


        let gameOver = () => {
            ctx.drawImage(imgGameOver, 0, 0, canvas.width, canvas.height)

        }
    
    };
    
        