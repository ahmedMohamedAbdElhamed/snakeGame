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

// Initiate the value of the highscore
highScore.innerHTML = `HighScore: ${hs}`;

// Game Over condition
let gameOver = false;

// Start function
window.onload = function(){
    foodRespawn(); // to respawn food every time randomly
    addEventListener('keyup', move) // wait for u to use arrow key to increase velx & vely to start move
    setInterval(frameRate, 1000/10); // this indicates the velocity of the snake also how quick the game will dedecte any change
}

// main function the franeRate fn that will print any change happens also will dedect when the game is over
function frameRate(){
    // game over var to prevent game from continue running after lost
    if(gameOver == true){
        return;
    }
    // change the positions by the velocity to start move
    sankeHeadX += velX;
    sankeHeadY += velY
    
    // this function check wether you eat the food or not because if u eat it it will respwan the food randomly & increase score by 1
    if(sankeHeadX == foodX && sankeHeadY == foodY){
        snakeBody.push(['','']);
        foodRespawn()
        sc += 1;
        score.innerHTML = `Your Score: ${sc}`;
    }

    let frames = '';
    // this function start to take the coordinates of the tail blocks and pass it to the one behind in order to follow up with each other & follow the head
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
        frames += `<div id='snakeBody' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    }

    snakeBody[0] = [sankeHeadX, sankeHeadY]

    frames += `<div id='snakeBody' style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]}'></div>`;
    frames += `<div id='food' style='grid-area: ${foodY} / ${foodX}'></div>`;
    frames += `<div id='snakeHead' style='grid-area: ${sankeHeadY} / ${sankeHeadX}'></div>`;
    playSpace.innerHTML = frames;
    
    // to check if u eat ur self or not
    for(let i = snakeBody.length-1; i >= 0; i--){
        // i!==0 here because if u didn't write it it will end game once u start :(
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
    
    // to check if u crashed in the wall or not
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

// the function that randomly respwan food
function foodRespawn(){
    foodX = Math.ceil(Math.random() * 30);
    foodY = Math.ceil(Math.random() * 30);
}

// the function that detect the arrow key pressed
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

// // the function that detect the arrow button pressed
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
