// Game Constants & Variables
//https://www.pinclipart.com/pins/snake/

let level = 5;
level = prompt("Enter the level from 1 to 20", "5");


console.log("level "+level+" selected");

function displayLevel(){
    //console.log();
    document.getElementById('level').innerHTML=level;
}
setInterval(displayLevel, 100);

let direction = {x:0, y:0};
let speed = level*2;
let last_update = 0;
let score = 0;



let snake =[
    {x:13, y:15}
]
food = {x:6, y:7};

function displayScore(){
    //console.log();
    document.getElementById('score-val').innerHTML=score;
}
setInterval(displayScore, speed);

//
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-last_update)/1000 < 1/speed){
        return;
    }
    last_update = ctime;
    //console.log(ctime);
    gameEngine();
    //display_keys();
}


function display_food() {
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.id = 'food_elem';
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    document.getElementById('food_elem').style.animation = "animate 0.5s linear infinite";
}


function gameEngine(){
    // Part 1: Updating the snake array & food
    if(Check()){
        direction ={x:0, y:0};
        alert("Game Over. Press any key to play again! Your Score: "+score);
        snake = [{x:13, y:15}];
        score = 0;
    }
    // If you have eaten the food, increment the score and regenerate the food
    if(snake[0].y===food.y && snake[0].x===food.x){
        snake.unshift({x:snake[0].x+direction.x, y:snake[0].y+direction.y});
        let a = 2;
        let b = 16;
        score += 1;
        console.log(score);
        let x_val = Math.round(a+(b-a)*Math.random());
        let y_val = Math.round(a+(b-a)*Math.random());
        food = {x: x_val, y: y_val};
    }
    // Moving the snake
    for (let i = snake.length-2; i>=0; i--) {
        const element = snake[i];
        snake[i+1] = {...snake[i]};
    }
    snake[0].x += direction.x;
    snake[0].y += direction.y;

    // Part 2: Display the snake 
    board.innerHTML = "";
    snake.forEach((e, index)=>{
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
    foodElement.id = 'food_elem';
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    document.getElementById('food_elem').style.animation = "animate 0.5s linear infinite";
}


//document.getElementById('food_elem').style.animation = "animate 1s linear infinite";

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    direction = {x:0, y:1} //start the snake
    switch(e.key){
        case "ArrowUp":
            //console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            //console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            //console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            //console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
        
    }
});

function Check(){
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        const element = snake[i];
        if(snake[i].x===snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}


function display_keys() {
    // FOR DISPLAYING THE EMPTY BOARD(NO NEED WHEN USING BACKGROUND IMAGE)

   /*  boxElement1 = document.createElement('div');
    boxElement1.style.gridRowStart = 1;
    boxElement1.style.gridColumnStart = 1;
    boxElement1.classList.add('item1');
    keys.appendChild(boxElement1); */
    

    /* boxElement1 = document.createElement('div');
    boxElement1.style.gridRowStart = 1;
    boxElement1.style.gridColumnStart = 3;
    boxElement1.classList.add('item1');
    keys.appendChild(boxElement1);
    boxElement1.id = "up_arrow"; */

    // up arrow
    boxElement1 = document.createElement('div');
    boxElement1.style.gridRowStart = 1;
    boxElement1.style.gridColumnStart = 2;
    boxElement1.classList.add('item2');
    keys.appendChild(boxElement1);
    boxElement1.id = "up_arrow";
    boxElement1.onclick=function(){
        direction.x = 0;
        direction.y = -1;
    };
    
    // down arrow
    boxElement2 = document.createElement('div');
    boxElement2.style.gridRowStart = 3;
    boxElement2.style.gridColumnStart = 2;
    boxElement2.classList.add('item2');
    keys.appendChild(boxElement2);
    boxElement2.id = "down_arrow";
    boxElement2.onclick=function(){
        direction.x = 0;
        direction.y = 1;
    };

    //left arrow
    boxElement3 = document.createElement('div');
    boxElement3.style.gridRowStart = 2;
    boxElement3.style.gridColumnStart = 1;
    boxElement3.classList.add('item2');
    keys.appendChild(boxElement3);
    boxElement3.id = "left_arrow";
    boxElement3.onclick=function(){
        direction.x = -1;
        direction.y = 0;
    };

    //right arrow
    boxElement4 = document.createElement('div');
    boxElement4.style.gridRowStart = 2;
    boxElement4.style.gridColumnStart = 3;
    boxElement4.classList.add('item2');
    keys.appendChild(boxElement4);
    boxElement4.id = "right_arrow"; 
    boxElement4.onclick=function(){
        direction.x = 1;
        direction.y = 0;
    }; 

}
display_keys();