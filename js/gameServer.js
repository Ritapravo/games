const http = require('http');
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const app = express();
const server = http.createServer();
const io = socket(server, {cors: {origin:"*"}});
//const port = process.env.PORT || 3000;
const port =3001;

app.use(express.static(path.join(__dirname,"public")));

var rooms=[];
var players=[];
var totalRooms=0;
var totalPlayers=0;

function makeid(length)
{
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let  i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createRoom(socket)
{
    let id=makeid(5);
    let room={};
    room["id"]=id;
    room["p1"]=socket;
    room["status"]=0;
    room["turn"]=1;
    room["full"]=0;
    rooms[totalRooms]=room;
    totalRooms+=1;
    socket.emit('id',""+id);
    console.log("Room created");
    console.log("No of players:",totalPlayers);
    console.log("No of rooms:",totalRooms);
}

function joinRoom(socket, roomid)
{
    var i;
    var sta=0;
    for(i=0; i<totalRooms; i++)
    {
        if(rooms[i]["id"]==roomid)
        {
            sta=1;
            if(rooms[i]["full"]==0)
            {
                if(rooms[i]["p1"].id != socket.id)
                {
                    rooms[i]["p2"]=socket;
                    rooms[i]["status"]=1;
                    rooms[i]["full"]=1;
                    rooms[i]["p1"].emit('move');
                    rooms[i]["p2"].emit('joined');
                    rooms[i]["p1"].emit('gameStarted');
                    rooms[i]["p2"].emit('gameStarted');
                    console.log("Player joined a room");
                    break;
                }
                else
                {
                    rooms[i]["p1"].emit('err','You are already in the room.')
                }
            }
            else
                socket.emit('err','Room Full! Create another room');
        }
    }
    if(sta==0)
    {
        socket.emit('err','Invalid roomid');
    }
}

function makeAck(socket)
{
    var i;
    for (i=0; i<totalRooms; i++)
    {
        if(rooms[i]["p1"].id==socket.id)
        {
            rooms[i]["p1"].emit('move');
            break;
        }
        if (rooms[i]["p2"].id==socket.id)
        {
            rooms[i]["p2"].emit('move');
            break;
        }
    }
    console.log("player made an ack")
}

function madeMove(socket,msg)
{
    var i;
    for (i=0; i<totalRooms; i++)
    {
        if(rooms[i]["p1"].id == socket.id)
        {
            rooms[i]["p2"].emit('reflect',msg)
        }
        if(rooms[i]["p2"].id == socket.id)
        {
            rooms[i]["p1"].emit('reflect',msg)
        }
    }
    console.log("Player made a move");
}

function disconnected(socket)
{
    var i;
    var sta=0;
    for (i=0; i<totalRooms; i++)
    {
        if(rooms[i]["p1"].id == socket.id)
        {
            rooms[i]["p2"].emit('err','Opponent Disconnected! Close the game');
            rooms.splice(i,1);
            totalRooms-=1;
            totalPlayers-=2;
            sta=1;
            break;
        }
        if(rooms[i]["p2"].id == socket.id)
        {
            rooms[i]["p1"].emit('err','Opponent Disconnected! Close the game');
            rooms.splice(i,1);
            totalRooms-=1;
            totalPlayers-=2;
            sta=1;
            break;
        }
    }
    if(sta==0)
        totalPlayers-=1;
    console.log("No of players:",totalPlayers);
    console.log("No of rooms:",totalRooms);
}

io.on('connection', (socket) => {
    players[totalPlayers]=socket;
    console.log("New player connected");
    socket.on('message', (msg) => {
        console.log(msg);
        //hangleMsg(socket, msg);
    });
    socket.on('disconnect',function(){
        console.log("Client disconnected");
        disconnected(socket);
    });

    socket.on('createRoom',()=> {
        createRoom(socket);
    });

    socket.on('joinRoom',(roomid) => {
        joinRoom(socket,roomid);
    });

    socket.on('dieValue',(msg) => {
        madeMove(socket,msg);
    });

    socket.on('ack',() => {
        makeAck(socket);
    })

    totalPlayers+=1;
});

server.listen(port, () => console.log("listening on port:",port));