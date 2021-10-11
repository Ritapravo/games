
let inputDir = {x:0, y:0};
let speed = 1;
let lastPaintTime = 0;
let score = 0;
let turn = false;
let dice_val = 0;

document.getElementById('turn').innerHTML = "GREEN";

// Initializing coordinates of player1
player1 = {x:10, y:1, z:1};
player2 = {x:10, y:1, z:1};

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

}
display_board();

function display_players(player1, player2) {
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
display_players(player1, player2);

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

function rollDice(a,b) {
    dice_val = Math.round(a+(b-a)*Math.random());
    console.log("dice value " +dice_val);
    document.getElementById('dice_val').innerHTML = dice_val ;
    gameEngine(dice_val);
    return dice_val;
}



function gameEngine(dice_val){

    /* let a = 1;
    let b = 6;
    dice_val = Math.round(a+(b-a)*Math.random());
    console.log("dice value " +dice_val);
    document.getElementById('dice_val').innerHTML = dice_val ; */
    
    console.log("turn "+turn);
    if(turn){
        document.getElementById('turn').innerHTML = "RED";
        player1 = {x: x_val(player1.z+dice_val), y: y_val(player1.z+dice_val), z:player1.z+dice_val};
        console.log("player1.x "+player1.x);
        console.log("player1.y "+player1.y);
        console.log("player1.z "+player1.z);
    }
    else{
        document.getElementById('turn').innerHTML = "GREEN";
        player2 = {x: x_val(player2.z+dice_val), y: y_val(player2.z+dice_val), z:player2.z+dice_val};
        console.log("player2.x "+player2.x);
        console.log("player2.y "+player2.y);
        console.log("player2.z "+player2.z);
    }
    
    // Clearing the inputs
    document.getElementById('pos1').remove();
    document.getElementById('pos2').remove();


    //Display the Players
    display_players(player1, player2);

    /* // Display the player1(Green)
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
    board.appendChild(position2); */


}





//window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    switch(e.key){
        case " ":
            turn = !turn;
            console.log("Space");
            rollDice(1,6);
            //gameEngine();
            break;
        default:
            break;
        
    }
});