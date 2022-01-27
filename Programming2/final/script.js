var socket = io();
let side = 15;
let weather1= 'winter';
function setup() {
    // frameRate(30);
    background('#acacac');
    createCanvas(50 * side, 50 * side);
}

    socket.on ('weather', function(data){
        weather1 = data;
    })
    
weathSwitcher = {
    winter: "white",
    spring: "#62D319",
    summer: "green",
    autumn: "#C75520"
}

console.log();
// console.log(weather1);


function painter(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            
        
            if (matrix[y][x] == 1) {
            
                fill(weathSwitcher[weather1]);
                console.log(weathSwitcher[weather1])
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
            }

            else if (matrix[y][x] == 3) {
                fill('red');

            }
            else if (matrix[y][x] == 4) {
                fill('#00D8FF');
            }
            else if (matrix[y][x] == 5) {
                fill('#900073');
            }
            else {
                fill('gray');
            }
            // square(x*side, y*side, 10, 10);
            // circle(x*side, y*side, 10);
            rect(x * side, y * side, side, side);
            // triangle(3, 7, 5, 2, 8, 7)
        }
    }


}
socket.on('send matrix', painter);
