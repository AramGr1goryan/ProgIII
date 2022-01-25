var socket = io();
let side = 10;

function setup() {
    frameRate(30);
    background('#acacac');
    createCanvas(60* side, 60 * side);
}
function painter(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 3) {
                fill('red');
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 4) {
                fill('#00D8FF');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('#900073');
                rect(x * side, y * side, side, side);
            }
            else {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    } 


}

setInterval(
    function(){
        socket.on('send matrix', painter);
    }, 1000
)