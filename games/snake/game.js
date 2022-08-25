class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

const canvas = document.getElementById("snakeboard")
const context = canvas.getContext("2d")

let speed = 5

const numTiles = [30, 20]
const tileSize = [
    canvas.width / numTiles[0],
    canvas.height / numTiles[1],
]

let body = []
let headPosition = new Point(10, 10)
let tailLength = 3

let apple = new Point(5, 5)

let inputsDirection = new Point(0, 0)

let score = 0

const eatSound = new Audio('audio/bite.mp3')


function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if(result) {
        alert('Game Over! \nNice try, you scored ' + score + ' points.')
        return
    }

    clearScreen()

    checkAppleHit()
    drawApple()
    drawSnake()

    drawScore()

    if(score >= 5) {
        speed = 7
    }
    if(score >= 10) {
        speed = 10
    }

    setTimeout(drawGame, 1000 / speed)
}

function isGameOver() {
    if(
        inputsDirection.x === 0
        && inputsDirection.y === 0
    ) {
        // Game hasn't started yet
        return false
    }

    //left
    if(headPosition.x < 0) {
        return true
    //right    
    } else if(headPosition.x === numTiles[0]) {
        return true
    //up
    } else if(headPosition.y < 0) {
        return true
    //down
    } else if(headPosition.y === numTiles[1]) {
        return true
    }

    for(let i = 0; i < body.length; i++) {
        let part = body[i]
        if(part.x === headPosition.x && part.y === headPosition.y) {
            return true
        }
    }
}

function drawScore() {
    context.fillStyle = "white"
    context.font = "10px Arial"
    context.fillText("Score " + score, canvas.width - 50, 10)
}

function clearScreen() {
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
    context.fillStyle = "green"

    body.push(new Point(headPosition.x, headPosition.y));
    while(body.length > tailLength) {
        body.shift();
    }

    for(let i = 0; i < body.length; i++) {
        let part = body[i]
        context.fillRect(part.x * tileSize[0], part.y * tileSize[1], tileSize[0], tileSize[1])
    }


    context.fillStyle = "lightgreen"
    context.fillRect(headPosition.x * tileSize[0], headPosition.y * tileSize[1], tileSize[0], tileSize[1])
}

function changeSnakePosition() {
    headPosition.x = headPosition.x + inputsDirection.x
    headPosition.y = headPosition.y + inputsDirection.y
}

function drawApple() {
    context.fillStyle = "red"
    context.fillRect(apple.x * tileSize[0], apple.y * tileSize[1], tileSize[0], tileSize[1])
}

function checkAppleHit() {
    if(
        apple.x === headPosition.x
        && apple.y === headPosition.y
    ) {
        apple.x = Math.floor(Math.random() * numTiles[0])
        apple.y = Math.floor(Math.random() * numTiles[1])
        tailLength++
        score++
        eatSound.play()
    }
}

document.body.addEventListener("keydown", keyDown)

function keyDown(event) {

    if(event.code === 'KeyW' || event.code === 'ArrowUp') {
        if(inputsDirection.y === 1)
            return
        inputsDirection.y = -1
        inputsDirection.x = 0
    }

    if(event.code === 'KeyS' || event.code === 'ArrowDown') {
        if(inputsDirection.y === -1)
            return
        inputsDirection.y = 1
        inputsDirection.x = 0
    }

    if(event.code === 'KeyA' || event.code === 'ArrowLeft') {
        if(inputsDirection.x === 1)
            return
        inputsDirection.y = 0
        inputsDirection.x = -1
    }

    //right
    if(event.code === 'KeyD' || event.code === 'ArrowRight') {
        //68 is d
        if(inputsDirection.x === -1)
            return
        inputsDirection.y = 0
        inputsDirection.x = 1
    }
}

drawGame()
