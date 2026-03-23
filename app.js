const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const gridSize = 20;
const INITIAL_POSITION = 0;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = { x: 15, y: 10 };
let score = 0;
let gameSpeed = 100;


function draw() {
    // clear canvas 
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake (green)
    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });

    // draw food (red )
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 1,
        gridSize - 1

    );
}


function move() {
    // copy head position 
    let head = {
        x: snake[0].x,
        y: snake[0].y
    };

    // move head on based on direction 
    if(direction === 'UP') head.y--;
    if(direction === 'DOWN') head.y++;
    if(direction === 'LEFT') head.x--;
    if(direction === 'RIGHT') head.x++;
    
    // add new head to front 
    snake.unshift(head);

    // check if food eaten
    if(head.x === food.x && head.y === food.y ){
            score++;
            placeFood();
        } else {
          snake.pop();    // Remove tail
        }

}

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.key;
    
    // prevent 180 turn 

    if(key === 'ArrowUp' && direction !== 'DOWN')
        direction = 'UP';

     if(key === 'ArrowDown' &&  direction !== 'UP')
        direction = 'DOWN';

         if(key === 'ArrowLeft' && direction !== 'RIGHT')
        direction = 'LEFT'; 
        
      if(key === 'ArrowRight' && direction !== 'LEFT')
        direction = 'RIGHT';
}

function checkCollision() {
    const head = snake[0];

    // wall collision
    if (head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount)
        return true;
    
    // self collision 
    for (let i = 1 ; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y )
            return true;
    }
    return false;
}

function placeFood() {
    food.x = Math.floor(
        Math.random() * tileCount
    );
    food.y = Math.floor(
        Math.random() * tileCount
    );
}

function gameLoop() {
    // update game state 
    move();

    // check if game over

    if(checkCollision()) {
        alert('Game Over ! Score: '  + score
        );

        // reset game 
        snake = [{ x : 10, y : 10 }];
        direction = 'RIGHT';
        score = 0;
        placeFood();
    }

    // Draw everything
    draw();

    // schedule next frame 
    setTimeout(gameLoop, gameSpeed);
}

// start the game 
placeFood();
gameLoop();
