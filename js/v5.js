

// GLOBAL VARIABLES
let speed = 200; //for determining movement speed of cursor
let turn = true; //(turn==true)=>green && (turn==false)=>red
let dice_val = 0; //random value generated on dice roll
let space_enabled = true; // if true then the space buttton/roll_dice_button will work
let enter_enabled = false; // if true then the ENTER button will work

var intervalID1 ; // this variables is used to disable the set-interval when 
var intervalID2 ; // the markers have reached their desired locations

// STATING THAT INITIAL TURN WILL BE OF GREEN
document.getElementById('turn').innerHTML = "GREEN";

// INITIALIZING THE CO-ORDINATES OF PLAYERS
player1 = {x:10, y:1, z:1};
player2 = {x:10, y:1, z:1};

// Next two lines are for debugging purposes
//player1 = {x:1, y:5, z:96}; 
//player2 = {x:1, y:5, z:96};


//====================== DISPLAY PLAYER FUNCTION ===========================

function display_players() {
    // display_players() takes the global values of player1 and player2 coordinates,
    // creates a div element with id(pos1 and pos2) and class(position1 and position2)
    // and paints the markers to the screen

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



// ================== X & Y VALUE FINDING FUNCTIONS ======================

function x_val(z) {
    // x_val(z) takes the z co-ordinate as input and returns its corresponding 
    // value of 'x'
    return 10-Math.floor((z-1)/10);
} 


function y_val(z) {
    // y_val(z) takes the z co-ordinate as input and returns its corresponding 
    // value of 'y'
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

// ======================= ROLL DICE EFUNCTION ============================

function rollDice(a,b, turn) { 
    // rollDice simply rolls the dice and updates the dice_val
    if(turn){
        // when turn is true, it makes the green marker blink
        document.getElementById('pos1').classList.add('blinker1');
    }
    else{
        // when turn is false, it makes the green marker blink
        document.getElementById('pos2').classList.add('blinker2');
    }
    dice_val = Math.round(a+(b-a)*Math.random());
    //dice_val = 7;
    //console.log("dice value " +dice_val);
    document.getElementById('dice_val').innerHTML = dice_val ;
    document.getElementById('dice_val_button').innerHTML = dice_val ;

    // condition checking when the marker goes beyond 100
    /* if(turn===true && player1.z +dice_val> 100){
        space_enabled = true;
        enter_enabled = false;
        turn = !turn;
        return dice_val;

    }
    else if(turn===false && player2.z +dice_val> 100){
        console.log("player2 dice value: "+(player2.z +dice_val));
        space_enabled = true;
        enter_enabled = false;
        turn = !turn;
        return dice_val;
    } */
    // gameEngine();
    
    // enabling the Enter in-order to move the markers
    enter_enabled=true; 
    
    document.getElementById('roller').innerHTML = "Press Enter to move the Dice." ;
    return dice_val;
} 






function gameEngine(){
    // gameEngine() takes the dice_val as arguement, checks the turn value, 
    // calls move1/move2 with setInterval respectively to move the makers to their new location
    // after moving it just switches the value of turn variable and gives chance to the other player
    
    console.log("turn "+turn);
    if(turn){
        document.getElementById('turn').innerHTML = "RED";
        if(player1.z+dice_val>100){
            dice_val = 0;
        }
        intervalID1 = setInterval(move1, speed, player1.z+dice_val);

        console.log("player1.x "+player1.x);
        console.log("player1.y "+player1.y);
        console.log("player1.z "+player1.z);
    }
    else{
        if(player2.z+dice_val>100){
            dice_val = 0;
        }
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
    
    turn = !turn;
    // change_colors();
    
}






window.addEventListener('keydown', e => {
    // listens which key is presessed the does the actions
    switch(e.key){
        case " ":
            if(space_enabled){
                space_enabled = false;
                
                console.log("Space");
                rollDice(1,6, turn);
                if(turn){
                    document.getElementById('pos1').onclick=function(){
                        click_div();
                    };
                }
                else{
                    document.getElementById('pos2').onclick=function(){
                        click_div();
                    };
                }
                /* turn = !turn; */
            }
            break;
        case "Enter":
            if(enter_enabled){
                enter_enabled = false;
                console.log("Enter");
                gameEngine();
            }
        default:
            break;
        
    }
});

// ==================ADDING THE ON-CLICK EVENTS======================

function click_div() {
    if(enter_enabled){
        enter_enabled = false;
        console.log("Enter"); 
        gameEngine();
    }
}

document.getElementById('roller').onclick=function(){
    roller_clicked();
}
document.getElementById('roll_button').onclick=function(){
    roller_clicked();
}

function roller_clicked() {
    console.log("roller clicked");
    if(space_enabled){
        space_enabled = false;
        
        console.log("Space");
        rollDice(1,6, turn);
        if(turn){
            document.getElementById('pos1').onclick=function(){
                click_div();
            };
        }
        else{
            document.getElementById('pos2').onclick=function(){
                click_div();
            };
        }
        /* turn = !turn; */
    }
}


// ====================== move functions ==========================


function move1(z=100) {
    if (player1.z === z) {
        window.clearInterval(intervalID1);
        document.getElementById('pos1').classList.remove('blinker1');
        check();
        //change_colors();
        //setTimeout(change_colors, speed);
        return;
    }
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
        //document.getElementById('pos2').classList.add('blinker1');
        if(player1.z===100 ){
            
            setTimeout(() => {
                alert("Game Over. Winner is Green!\nRefresh to start a new game");
            }, speed+100);
            
            
        }
        check();
        //setTimeout(change_colors, speed);
        //change_colors();
    }
}

function move2(z=100) {
    if (player2.z === z) {
        window.clearInterval(intervalID2);
        document.getElementById('pos2').classList.remove('blinker2');
        check();
        setTimeout(change_colors, speed);
        //change_colors();
        return;
    }
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
        //document.getElementById('pos1').classList.add('blinker1');
        if(player2.z===100){
            setTimeout(() => {
                alert("Game Over. Winner is Red!\nRefresh to start a new game");
            }, speed+100);
        
        }
        check();
        //setTimeout(change_colors, speed);
        //change_colors();
    }
}



// ============================= CHECK FUNCTION ==========================

function check() {
    // check() determines if the markers have landed on some snake or ladder,
    // if it lands on such event it updates the position markers and calls
    // the display_players() function to paint the markers to its updated location

    z1 = player1.z;
    z2 = player2.z;
    ind = false;
    
    //======================= PLAYER1 =========================
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
    //======================= PLAYER2 =========================
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
    if(ind){
        // console.log("player1.x "+player1.x);
        // console.log("player1.y "+player1.y);
        // console.log("player1.z "+player1.z);
        setTimeout(function(){   
            document.getElementById('pos1').remove();
            document.getElementById('pos2').remove();
            display_players();
        }, speed+100);
    }
    document.getElementById('dice_val').innerHTML = "..." ;
    document.getElementById('dice_val_button').innerHTML = "..." ;
    document.getElementById('roller').innerHTML = "Press Space to Roll the Dice." ;
    space_enabled = true;
    setTimeout(change_colors, speed);
}


// ================== changing colors ====================

function change_colors() {
    console.log("change-colors function entered");
    if(turn){
        console.log("green");
        document.getElementById('board').style.border="2px solid rgb(11, 236, 67)";
        document.getElementsByClassName('button')[0].style.backgroundColor="#2ea44f";
        document.getElementById('dice_val_button').style.backgroundColor="#2ea44f";
    }
    else{
        console.log("red");
        document.getElementById('board').style.border="2px solid rgb(241, 34, 34)";
        document.getElementsByClassName('button')[0].style.backgroundColor="rgb(241, 34, 34)";
        document.getElementById('dice_val_button').style.backgroundColor="rgb(241, 34, 34)";
    }
}



function display_board() {
    // FOR DISPLAYING THE EMPTY BOARD(NO NEED WHEN USING BACKGROUND IMAGE)
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
    

}//display_board();











// PREVIOUS GAME-ENGINE

/* function    gameEngine(){
    
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