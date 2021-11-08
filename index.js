const canvas = document.getElementById( 'game' );
const ctx = canvas.getContext( '2d' );

//9) увеличение змейки
class SnakePart {
    constructor( x, y ) {
        this.x = x
        this.y = y
    }
}

let snakePart = []
let snakeLength = 2

let speed = 7
let pixelCount = 20
let pixelSize = canvas.width / pixelCount

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

// level
let levelCount = 1;

//1)создаем game loop
function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if ( result ) return
    //2) очистка полотна для нового кадра
    clearScreen()
    drawSnake()
    drawApple()
    appleEat()
    drawScore()
    level()
    setTimeout( drawGame, 1000 / speed )
}

// Уровень
function level() {
    switch ( score ) {
        case 5:
            speed = 10;
            levelCount = 2;
            $( '#level' ).text( levelCount )
            break;
        case 10:
            speed = 13;
            levelCount = 3;
            $( '#level' ).text( levelCount )
            break;
        case 18:
            speed = 15;
            levelCount = 4;
            $( '#level' ).text( levelCount )
            break;
        case 22:
            speed = 20;
            levelCount = 5;
            $( '#level' ).text( levelCount )
            break;
        default:
            $( '#level' ).text( levelCount )
            break;
    }

}
//2) очистка полотна для нового кадра
function clearScreen() {
    ctx.fillStyle = 'black'
    ctx.fillRect( 0, 0, canvas.width, canvas.height )
}
//4)
function drawSnake() {
    ctx.fillStyle = 'orange'
    ctx.fillRect( headX * pixelCount, headY * pixelCount, pixelSize, pixelSize )
    //9)
    ctx.fillStyle = 'green'
    snakePart.forEach( e => {
        ctx.fillRect( e.x * pixelCount, e.y * pixelCount, pixelSize, pixelSize )
    } )
    snakePart.push( new SnakePart( headX, headY ) )
    if ( snakePart.length > snakeLength ) {
        snakePart.shift()
    }
}

//5) меняем направление движения змеи
document.body.addEventListener( 'keydown', keyDown )

function keyDown( e ) {
    //up
    if ( e.keyCode == 38 ) {
        if ( yVelocity == 1 ) return
        yVelocity = -1
        xVelocity = 0
    }
    //down
    if ( e.keyCode == 40 ) {
        if ( yVelocity == -1 ) return
        yVelocity = 1
        xVelocity = 0
    }
    //left
    if ( e.keyCode == 37 ) {
        if ( xVelocity == 1 ) return
        yVelocity = 0
        xVelocity = -1
    }
    //right
    if ( e.keyCode == 39 ) {
        if ( xVelocity == -1 ) return
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
    if ( appleX == headX && appleY == headY ) {
        appleX = Math.floor( Math.random() * pixelCount )
        appleY = Math.floor( Math.random() * pixelCount )
        snakeLength++
        score++
        eat.play()
    }
}
//12) sound eating
const eat = new Audio( 'eat.mp3' )

// Best score
let best = localStorage.getItem( 'bestScore' );

//10) game over :(
function isGameOver( gameOver ) {
    if ( gameOver == false ) {
        return
    }
    gameOver = false
    if ( yVelocity == 0 && xVelocity == 0 ) {
        return false
    }
    if ( headX < 0 || headX == pixelCount || headY < 0 || headY == pixelCount ) {
        gameOver = true
    }
    snakePart.forEach( e => {
        if ( e.x == headX && e.y == headY ) {
            gameOver = true
        }
    } )
    if ( gameOver ) {
        if ( score > localStorage.getItem( 'bestScore' ) ) {
            localStorage.setItem( 'bestScore', score )
            ctx.fillStyle = 'white'
            ctx.font = '32px Arial'
            ctx.fillText( 'New Record: '+score, (canvas.width / 3.8)-20, (canvas.height / 2)+30  )
        }
        ctx.fillStyle = 'white'
        ctx.font = '32px Arial'
        ctx.fillText( 'Game Over!', canvas.width / 3.8, canvas.height / 2 )
        new Audio( 'hit.wav' ).play()
    }
    return gameOver
}

// localStorage.clear()
//11)
function drawScore() {
    if ( localStorage.getItem( 'bestScore' ) > 0 ) {
        let best = localStorage.getItem( 'bestScore' );
        $( '#best-score' ).text( 'Best score: ' + best )
    }
    // Current score
    $( '#score' ).text( 'Score: ' + score )
}

drawGame()
$( '#button' ).click( function () {
    isGameOver( false )
    yVelocity = 0
    xVelocity = 1
    headX = 10
    headY = 10
    score = 0
    speed = 7
    snakePart = [];
    levelCount = 1;
    snakeLength = 2
    appleX = Math.floor( Math.random() * pixelCount )
    appleY = Math.floor( Math.random() * pixelCount )
    xVelocity = 0
    yVelocity = 0
    drawGame()
} )