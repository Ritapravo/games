// Game Constants & Variables
//https://www.pinclipart.com/pins/snake/

let level = prompt("Enter the level from 1 to 20", "1");
console.log("level "+level+" selected");

function displayLevel(){
    //console.log();
    document.getElementById('level').innerHTML=level;
}
setInterval(displayLevel, 100);

let inputDir = {x:0, y:0};
let speed = level*2;
let lastPaintTime = 0;
let score = 0;



let snakeArr =[
    {x:13, y:15}
]
food = {x:6, y:7};

function displayScore(){
    //console.log();
    document.getElementById('score-val').innerHTML=score;
}
setInterval(displayScore, 100);

//
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    //console.log(ctime);
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        const element = snakeArr[i];
        if(snake[i].x===snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        inputDir ={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        score = 0;
    }
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        score += 1;
        console.log(score);
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }
    // Moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        //snakeElement.classList.add('snake');
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1} //start the snake
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
        
    }
});