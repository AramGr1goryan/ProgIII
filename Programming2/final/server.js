var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
        console.log("runed on port:3000");
});
grassArr = [];
grassEaterArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
trashArr = [];
trasherArr = [];
matrix = [];

var n = 50;
const Grass = require("./Grass")
const GrassEater = require("./GrassEater")
const GrassEaterEater = require('./GrassEaterEater')
const trash = require('./trash')
const trasher = require('./trasher')


let weathers = ["winter", "spring", "summer", "autumn"];


function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))
        
    }  
}

io.sockets.emit("send matrix", matrix);




function ObjectCreator(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
                    if (matrix[y][x] == 1) {
                        matrix[y][x] = 1;
                        let gr = new Grass(x, y, 1);
                        grassArr.push(gr);
                    }
                    else if (matrix[y][x] == 2) {
                        matrix[y][x] = 2;
                        let great = new GrassEater(x, y, 2);
                        grassEaterArr.push(great);
                    }
                    else if (matrix[y][x] == 3) {
                        matrix[y][x] = 3;
                        let greateat = new GrassEaterEater(x, y, 3);
                        grassEaterEaterArr.push(greateat);
                    }
                    else if (matrix[y][x] == 4) {
                        matrix[y][x] = 4;
                        let tr = new trash(x, y, 4);
                        trashArr.push(tr);
                    }
                    else if (matrix[y][x] == 5) {
                        matrix[y][x] = 5;
                        let trer = new trasher(x, y, 5);
                        trasherArr.push(trer);
                    }
                }
    }
    io.sockets.emit('send matrix', matrix);
}

function gameScripter() {
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in grassEaterEaterArr) {
        grassEaterEaterArr[i].eat();
    }
    for (let i in trashArr) {
        trashArr[i].die();
        trashArr[i].energyst();
    }
    for (let i in trasherArr) {
        trasherArr[i].move();
        trasherArr[i].eat();
        trasherArr[i].die();
    }
    io.sockets.emit('send matrix', matrix);
}

let i = weathers.length;

function weat(){

    let weather;
    weather = weathers[i--];
    if(i<0){i=3}  
    io.sockets.emit('weather', weather);
}
setInterval(weat, 1000);

setInterval(gameScripter, 1000);

io.on('connection', function(socket){
    ObjectCreator(matrix);
})