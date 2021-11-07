const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

//9) увеличение змейки
class SnakePart {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
}

let snakePart = []
let snakeLength = 2

let speed = 7
let pixelCount = 20
let pixelSize = canvas.width/pixelCount - 2

//5)направление движения змеи
let xVelocity = 0
let yVelocity = 0

//3) стартовая позиция
let headX = 10
let headY = 10

//7) стартовая точка для яблока
let appleX = 5
let appleY = 5

//11) score
let score = 0

//1)создаем game loop
function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if(result) return
    //2) очистка полотна для нового кадра
    clearScreen()
    drawSnake()
    drawApple()
    appleEat()
    drawScore()
    if(score>5) speed = 10
    if(score>10) speed = 13
    if(score>18) speed = 15
    if (score>22) speed = 20
    setTimeout(drawGame, 1000/speed)
}

//2) очистка полотна для нового кадра
function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width, canvas.height)
}
//4)
function drawSnake() {
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX*pixelCount, headY*pixelCount, pixelSize, pixelSize)
    //9)
    ctx.fillStyle = 'green'
    snakePart.forEach(e => {
        ctx.fillRect(e.x*pixelCount, e.y*pixelCount, pixelSize, pixelSize)
    })
    snakePart.push(new SnakePart(headX, headY))
    if(snakePart.length > snakeLength) {
        snakePart.shift()
    }
}

//5) меняем направление движения змеи
document.body.addEventListener('keydown', keyDown)
function keyDown(e) {
    console.log(e)
    //up
    if(e.keyCode == 38) {
        if(yVelocity == 1) return
        yVelocity = -1
        xVelocity = 0
    }
    //down
    if(e.keyCode == 40) {
        if(yVelocity == -1) return
        yVelocity = 1
        xVelocity = 0
    }
    //left
    if(e.keyCode == 37) {
        if(xVelocity == 1) return
        yVelocity = 0
        xVelocity = -1
    }
    //right
    if(e.keyCode == 39) {
        if(xVelocity == -1) return
        yVelocity = 0
        xVelocity = 1
    }
}

//6) изменение позиции змеи
function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}
//7)
function drawApple() {
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX*pixelCount, appleY*pixelCount, pixelSize, pixelSize)
}

//8) столкновеие с яблоком
function appleEat() {
    if(appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random()*pixelCount)
        appleY = Math.floor(Math.random()*pixelCount)
        snakeLength++
        score++
        eat.play()
    }
}
//12) sound eating

const eat = new Audio('eat.mp3')

//10) game over :(
    function isGameOver() {
        let gameOver = false
        if(yVelocity == 0 && xVelocity ==0) {
            return false
        }
        if(headX < 0 || headX == pixelCount || headY < 0 || headY == pixelCount) {
            gameOver = true
        }
        snakePart.forEach(e => {
            if(e.x == headX && e.y == headY) {
                gameOver = true
            }
        })
        if(gameOver) {
            ctx.fillStyle = 'white'
            ctx.font = '32px Arial'
            ctx.fillText('Game Over!', canvas.width/3.8, canvas.height/2)
            new Audio('hit.wav').play()
        }
        return gameOver
    }

    //11)
    function drawScore() {
        ctx.fillStyle = 'white'
        ctx.font = '16px Arial'
        ctx.fillText('Score: '+score, canvas.width-70, 20)
    }
drawGame()