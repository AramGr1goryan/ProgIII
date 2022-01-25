var express = require('express');
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server);
let http = require('http')
var fs = require("fs");

let n = 80;
let m = 80;

let matrix = [];

const Grass = require('./grass');
const GrassEater = require('./grassEater')
const GrassEaterEater = require('./grassEaterEater')
const trash = require('./trash')
const trasher = require('./trasher')


app.use(express.static("."));


app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("runed on port:3000");
});

for (let y = 0; y < n; y++) {
    matrix[y] = [];

    for (let x = 0; x < m; x++) {
        matrix[y][x] = Math.floor(Math.random() * [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 3, 5, 2, 2, 2, 2, 2].length);
    }
}

io.sockets.emit("send matrix", matrix);

let grassArr = [];
let grassEaterArr = [];
let grassEaterEaterArr = [];
let trashArr = [];
let trasherArr = [];



function ObjectCreator(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            for (let y = 0; y < matrix.length; ++y) {
                for (let x = 0; x < matrix[y].length; ++x) {
                    if (matrix[y][x] == 1) {
                        let gr = new Grass(x, y, 1);
                        grassArr.push(gr);
                    }
                    else if (matrix[y][x] == 2) {
                        let great = new GrassEater(x, y, 2);
                        grassEaterArr.push(great);
                    }
                    else if (matrix[y][x] == 3) {
                        let greateat = new GrassEaterEater(x, y, 3);
                        grassEaterEaterArr.push(greateat);
                    }
                    else if (matrix[y][x] == 4) {
                        let tr = new trash(x, y, 4);
                        trashArr.push(tr);
                    }
                    else if (matrix[y][x] == 5) {
                        let trer = new trasher(x, y, 5);
                        trasherArr.push(trer);
                    }
                }
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

setInterval(gameScripter, 1000);

io.on('connection', function(socket){
    ObjectCreator(matrix);
})