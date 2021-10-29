// [v1, v2, v3, v4, v5, v6].js are just backup versions of grid.js
// please ignore these files

// GLOBAL VARIABLES
let speed = 100; //for determining movement speed of cursor
let turn = false; //(turn==true)=>green && (turn==false)=>red
let dice_val = 0; //random value generated on dice roll
let space_enabled = true;
let enter_enabled = false;

// STATING THAT INITIAL TURN WILL BE OF GREEN
document.getElementById('turn').innerHTML = "GREEN";

// INITIALIZING THE CO-ORDINATES OF PLAYERS
player1 = {x:10, y:1, z:1};
player2 = {x:10, y:1, z:1};




function display_players() {
    // Display the player1(Green)
    position1 = document.createElement('div');
    position1.id = 'pos1';
    position1.style.gridRowStart = player1.x;
    position1.style.gridColumnStart = player1.y;
    position1.classList.add('position1');
    board.appendChild(position1);

    // Display the player2(Red)
    position2 = document.createElement('div');
    position2.id = 'pos2';
    position2.style.gridRowStart = player2.x;
    position2.style.gridColumnStart = player2.y;
    position2.classList.add('position2');
    board.appendChild(position2);
}
display_players();


function x_val(z) {
    return 10-Math.floor((z-1)/10);
} 
function y_val(z) {
    let temp = Math.floor((z-1)/10);
    if(temp%2===0){
        if(z%10==0)
            return 10;
        return z%10;
    }
    else{
        if(z%10==0)
            return 1;
        return 11-z%10;
    }
} 

function rollDice(a,b, turn) { 
    dice_val = Math.round(a+(b-a)*Math.random());
    //console.log("dice value " +dice_val);
    document.getElementById('dice_val').innerHTML = dice_val ;
    
    if(turn===true && player1.z +dice_val> 100){
        space_enabled = true;
        return dice_val;

    }
    if(turn===false && player2.z +dice_val> 100){
        space_enabled = true;
        return dice_val;
    }
    //gameEngine(dice_val);
    enter_enabled=true;
    document.getElementById('roller').innerHTML = "Press Enter to move the Dice." ;
    return dice_val;
} 

function check() {
    z1 = player1.z;
    z2 = player2.z;
    ind = false;
    
    if(z1===99){
        player1 = {x: x_val(27), y: y_val(27), z:27};ind = true;
    }
    if(z1===95){
        player1 = {x: x_val(76), y: y_val(76), z:76};ind = true;
    }
    if(z1===87){
        player1 = {x: x_val(56), y: y_val(56), z:56};ind = true;
    }
    if(z1===72){
        player1 = {x: x_val(13), y: y_val(13), z:13};ind = true;
    }
    if(z1===47){
        player1 = {x: x_val(16), y: y_val(16), z:16};ind = true;
    }
    if(z1===41){
        player1 = {x: x_val(18), y: y_val(18), z:18};ind = true;
    }
    //LADDERS
    if(z1===73){
        player1 = {x: x_val(94), y: y_val(94), z:94};ind = true;
    }
    if(z1===60){
        player1 = {x: x_val(79), y: y_val(79), z:79};ind = true;
    }
    if(z1===46){
        player1 = {x: x_val(68), y: y_val(68), z:68};ind = true;
    }
    if(z1===19){
        player1 = {x: x_val(39), y: y_val(39), z:39};ind = true;
    }
    if(z1===7){
        player1 = {x: x_val(25), y: y_val(25), z:25};ind = true;
    }
    // PLAYER2
    if(z2===99){
        player2 = {x: x_val(27), y: y_val(27), z:27};ind = true;
    }
    if(z2===95){
        player2 = {x: x_val(76), y: y_val(76), z:76};ind = true;
    }
    if(z2===87){
        player2 = {x: x_val(56), y: y_val(56), z:56};ind = true;
    }
    if(z2===72){
        player2 = {x: x_val(13), y: y_val(13), z:13};ind = true;
    }
    if(z2===47){
        player2 = {x: x_val(16), y: y_val(16), z:16};ind = true;
    }
    if(z2===41){
        player2 = {x: x_val(18), y: y_val(18), z:18};ind = true;
    }
    //LADDERS
    if(z2===73){
        player2 = {x: x_val(94), y: y_val(94), z:94};ind = true;
    }
    if(z2===60){
        player2 = {x: x_val(79), y: y_val(79), z:79};ind = true;
    }
    if(z2===46){
        player2 = {x: x_val(68), y: y_val(68), z:68};ind = true;
    }
    if(z2===19){
        player2 = {x: x_val(39), y: y_val(39), z:39};ind = true;
    }
    if(z2===7){
        player2 = {x: x_val(25), y: y_val(25), z:25};ind = true;
    }
    //setTimeout(display_players(player1, player2),500);
    if(ind){
        /* console.log("player1.x "+player1.x);
        console.log("player1.y "+player1.y);
        console.log("player1.z "+player1.z); */
        setTimeout(function(){   
            document.getElementById('pos1').remove();
            document.getElementById('pos2').remove();
            display_players();
        }, speed );
    }
    document.getElementById('dice_val').innerHTML = "..." ;
    document.getElementById('roller').innerHTML = "Press Space to Roll the Dice." ;
    space_enabled = true;
}

var intervalID1 ;
var intervalID2 ;

function gameEngine(dice_val){
    
    console.log("turn "+turn);
    if(turn){
        document.getElementById('turn').innerHTML = "RED";
        intervalID1 = setInterval(move1, speed, player1.z+dice_val);

        console.log("player1.x "+player1.x);
        console.log("player1.y "+player1.y);
        console.log("player1.z "+player1.z);
    }
    else{
        document.getElementById('turn').innerHTML = "GREEN";
        intervalID2 = setInterval(move2, speed, player2.z+dice_val);
        console.log("player2.x "+player2.x);
        console.log("player2.y "+player2.y);
        console.log("player2.z "+player2.z);
    }
    

    // console.log("player1.x "+player1.x);
    // console.log("player1.y "+player1.y);
    // console.log("player1.z "+player1.z);
    // check();

    if(player1.z===100 ){
        alert("Game Over. Winner is Green!\nRefresh to start a new game");
    }
    if(player2.z===100){
        alert("Game Over. Winner is Red!\nRefresh to start a new game ");
    }

}






window.addEventListener('keydown', e => {
    switch(e.key){
        case " ":
            if(space_enabled){
                space_enabled = false;
                turn = !turn;
                console.log("Space");
                rollDice(1,6, turn);
            }
            break;
        case "Enter":
            if(enter_enabled){
                enter_enabled = false;
                console.log("Enter");
                gameEngine(dice_val);
            }
        default:
            break;
        
    }
});

//var intervalID1 = setInterval(move1, 100);
//var intervalID2 = setInterval(move2, 100);

function move1(z=100) {
    let temp = Math.floor((player1.z)/10);
    //console.log(temp);
    document.getElementById('pos1').remove();
    if(player1.z%10 === 0){
        player1.x = player1.x-1; 
        player1.y = player1.y; 
    }
    else if(temp%2===0){
        player1.x = player1.x; 
        player1.y = player1.y+1; 
    }
    else{
        player1.x = player1.x; 
        player1.y = player1.y-1;
    }

    player1.z = player1.z+1;
    position1 = document.createElement('div');
    position1.id = 'pos1';
    position1.style.gridRowStart = player1.x;
    position1.style.gridColumnStart = player1.y;
    position1.classList.add('position1');
    board.appendChild(position1);
    //console.log(player1);
    if (player1.z === z) {
        window.clearInterval(intervalID1);
        if(player1.z===100 ){
            
            setTimeout(() => {
                alert("Game Over. Winner is Green!\nRefresh to start a new game");
            }, speed+100);
            
            
        }
        check();
    }
}

function move2(z=100) {
    let temp = Math.floor((player2.z)/10);
    //console.log(temp);
    document.getElementById('pos2').remove();
    if(player2.z%10 === 0){
        player2.x = player2.x-1; 
        player2.y = player2.y; 
    }
    else if(temp%2===0){
        player2.x = player2.x; 
        player2.y = player2.y+1; 
    }
    else{
        player2.x = player2.x; 
        player2.y = player2.y-1;
    }

    player2.z = player2.z+1;
    position2 = document.createElement('div');
    position2.id = 'pos2';
    position2.style.gridRowStart = player2.x;
    position2.style.gridColumnStart = player2.y;
    position2.classList.add('position2');
    board.appendChild(position2);
    //console.log(player2);
    if (player2.z === z) {
        window.clearInterval(intervalID2);
        if(player2.z===100){
            setTimeout(() => {
                alert("Game Over. Winner is Green!\nRefresh to start a new game");
            }, speed+100);
        
        }
        check();
    }
}

// var intervalID1 = setInterval(move1, speed);
// var intervalID2 = setInterval(move2, speed);




// FOR DISPLAYING THE EMPTY BOARD(NO NEED WHEN USING BACKGROUND IMAGE)
function display_board() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            if((i+j)%2==0){
                boxElement1 = document.createElement('div');
                boxElement1.style.gridRowStart = i;
                boxElement1.style.gridColumnStart = j;
                boxElement1.classList.add('item1');
                if(i%2==1){
                    boxElement1.innerHTML = 101-((i-1)*10 +j);
                }
                else{
                    boxElement1.innerHTML = 101-((i-1)*10 +11-j);
                }
                board.appendChild(boxElement1);
            }
            else{
                boxElement2 = document.createElement('div');
                boxElement2.style.gridRowStart = i;
                boxElement2.style.gridColumnStart = j;
                boxElement2.classList.add('item2');
                if(i%2==1){
                    boxElement2.innerHTML = 101-((i-1)*10 +j);
                }
                else{
                    boxElement2.innerHTML = 101-((i-1)*10 +11-j);
                }
                board.appendChild(boxElement2);
            }
        } 
    }
    // Code for inserting snake
    /* img = document.createElement('img');
    img.src = "img/b2.png";
    img.style.gridRowStart = 10;
    img.style.gridColumnStart = 1;
    img.classList.add('grid_image');
    board_container = document.getElementById('board_container');
    board.appendChild(img); */

}//display_board();











// PREVIOUS GAME-ENGINE

/* function gameEngine(dice_val){
    
    console.log("turn "+turn);
    if(turn){
        document.getElementById('turn').innerHTML = "RED";
        player1 = {x: x_val(player1.z+dice_val), y: y_val(player1.z+dice_val), z:player1.z+dice_val};
        //console.log("player1.x "+player1.x);
        //console.log("player1.y "+player1.y);
        console.log("player1.z "+player1.z);
    }
    else{
        document.getElementById('turn').innerHTML = "GREEN";
        player2 = {x: x_val(player2.z+dice_val), y: y_val(player2.z+dice_val), z:player2.z+dice_val};
        //console.log("player2.x "+player2.x);
        //console.log("player2.y "+player2.y);
        console.log("player2.z "+player2.z);
    }
    
    // Clearing the inputs
    document.getElementById('pos1').remove();
    document.getElementById('pos2').remove();

    console.log("player1.x "+player1.x);
    console.log("player1.y "+player1.y);
    console.log("player1.z "+player1.z);
    //Display the Players
    display_players(player1, player2);

    check();

    if(player1.z===100 ){
        alert("Game space_enabled. Winner is Green! ");
    }
    if(player2.z===100){
        alert("Game space_enabled. Winner is Red! ");
    }

} */