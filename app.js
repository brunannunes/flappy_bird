//take elements of the html
document.addEventListener('DOMContentLoaded', () =>{
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    //centralize the bird by adding space between the bird and the sky
    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false


    //function that make the game works
    function startGame(){
        //make the bird fall
        birdBottom -= gravity
        //moving the bird by adding pixels 
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    //invoke the function startGame every 20 miliseconds
    let gameTimerId = setInterval(startGame, 20)

    //e means event
    function control(e){
        //32 is the space in your keyboard
        if (e.keyCode === 32){
            jump()
        }
    }

    function jump(){
        //erevy time we invoke this function the bird will jump
       if (birdBottom < 500)birdBottom += 50 //adding 50 pixels for the jump
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }

    //every time you click in the keyboard the bird will jump
    document.addEventListener('keyup', control)

    function generateObstcle(){
        let obstacleLeft = 500
        //creating a method to the obstacle apper in radom places
        let radomHeight = Math.random() * 60
        let obstacleBottom = radomHeight
        //creating a div
        const obstacle = document.createElement('div')
        //adding a class into a div
        obstacle.classList.add('obstacle')
        //adding the div into the game-container
        gameDisplay.appendChild(obstacle)
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        function moveObstacle(){
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'

            //when the obstacle hit "the wall" the timer will stop from executing
            if(obstacleLeft == -60){
                clearInterval(timerId)
                //then the obstacle will be removed
                gameDisplay.removeChild(obstacle)
            }
            if(
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 ||
                birdBottom == 0
                ){
                gameOver()
            }
        }
        //invoking the function multiple times
        let timerId = setInterval(moveObstacle, 20)
        //it will generate another obstacle every 3 seconds
        setTimeout(generateObstcle, 3000)
    }
    generateObstcle()

    function gameOver(){
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
    }

    // clearInterval(timerId)
})
