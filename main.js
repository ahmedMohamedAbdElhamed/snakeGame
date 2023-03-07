// Get elements
let playSpace = document.getElementById('play-space');
let score = document.getElementById('score');
let highScore = document.getElementById('high-score');

// Declaration of food coordinates
let foodX, foodY;

// Declaration of sanke head
let sankeHeadX = 5, sankeHeadY = 5;

// Declaration of snake tail
let snakeBody = [];

// Declaration to snake velocity
let velX = 0, velY = 0;

// Declaration of score & highscore variables
let sc = 0, hs;
if(localStorage.length > 0){
    hs = JSON.parse(localStorage.highscore);
}else{
    hs = 0;
}

highScore.innerHTML = `HighScore: ${hs}`;

// Game Over condition
let gameOver = false;

window.onload = function(){
    foodRespawn();
    addEventListener('keyup', move)
    setInterval(frameRate, 1000/10);
}

function frameRate(){
    if(gameOver == true){
        return;
    }

    sankeHeadX += velX;
    sankeHeadY += velY

    if(sankeHeadX == foodX && sankeHeadY == foodY){
        snakeBody.push(['','']);
        foodRespawn()
        sc += 1;
        score.innerHTML = `Your Score: ${sc}`;
    }

    let frames = '';

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
        frames += `<div id='snakeBody' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    }

    snakeBody[0] = [sankeHeadX, sankeHeadY]

    frames += `<div id='snakeBody' style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]}'></div>`;
    frames += `<div id='food' style='grid-area: ${foodY} / ${foodX}'></div>`;
    frames += `<div id='snakeHead' style='grid-area: ${sankeHeadY} / ${sankeHeadX}'></div>`;
    playSpace.innerHTML = frames;

    for(let i = snakeBody.length-1; i >= 0; i--){
        if(i!==0 && sankeHeadX == snakeBody[i][0] && sankeHeadY == snakeBody[i][1]){
            gameOver = true;
            if(hs <= sc){
                hs = sc;
                localStorage.setItem('highscore', JSON.stringify(hs));
            }
            window.alert('Game Over :(')
            location.reload();
        }
    }

    if(sankeHeadX == 0 || sankeHeadX == 30+1 || sankeHeadY == 0 || sankeHeadY == 30+1){
        gameOver = true;
        if(hs <= sc){
            hs = sc;
            localStorage.setItem('highscore', JSON.stringify(hs));
        }
        window.alert('Game Over :(')
        location.reload();
    }
}

function foodRespawn(){
    foodX = Math.ceil(Math.random() * 30);
    foodY = Math.ceil(Math.random() * 30);
}

function move(event){
    if(event.key == "ArrowUp" && velY != 1){
        velX = 0;
        velY = -1;
    }
    else if(event.key == "ArrowLeft" && velX != 1){
        velX = -1;
        velY = 0;
    }
    else if(event.key == "ArrowRight" && velX != -1){
        velX = 1;
        velY = 0;
    }
    else if(event.key == "ArrowDown" && velY != -1){
        velX = 0;
        velY = 1;
    }
}

function arrowsMove(id){
    if(id == 'up' && velY != 1){
        velX = 0;
        velY = -1;
    }
    else if(id == 'left' && velX != 1){
        velX = -1;
        velY = 0;
    }
    else if(id == 'right' && velX != -1){
        velX = 1;
        velY = 0;
    }
    else if(id == 'down' && velY != -1){
        velX = 0;
        velY = 1;
    }
}