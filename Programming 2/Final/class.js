class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];


    }
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
        this.directions = [];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(character) {
        // this.energy--;
        let found = [];
        this.getNewCoordinates();
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    move() {
        let newCell = random(this.chooseCell(0));

        if (newCell) {
            this.energy--;
            let newX = newCell[0];
            let newY = newCell[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;


            this.y = newY;
            this.x = newX;
        }
        this.die();


    }
    mul() {
        let newCell = random(this.chooseCell(0));
        if (this.energy >= 8 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
        }
    }


    eat() {
        let newCell1 = random(this.chooseCell(1));

        if (newCell1) {
            let newX = newCell1[0];
            let newY = newCell1[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            for (let i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
            this.mul();    
        }
        else{
            this.move();
        }
            }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 4;
            for (let i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    trashArr.push(new trash(this.x, this.y, 4))
                    break;
                }
            }

        }
    }
}
class GrassEaterEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 9;
        this.directions = [];

    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell(character) {
        var found = [];
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var newCell = random(this.chooseCell(1));
        var dCell = random(this.chooseCell(0));
        if (newCell) {
            this.energy -= 2;
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.y = newY;
            this.x = newX;
            // console.log(this.energy);
        }

        else if (dCell) {
            this.energy--;
            var newX1 = dCell[0];
            var newY1 = dCell[1];


            matrix[newY1][newX1] = this.index;
            matrix[this.y][this.x] = 0;


            this.y = newY1;
            this.x = newX1;
        }
        
        else{
            return
        }
        this.die();

    }




    eat() {
        var great = random(this.chooseCell(2));
        if (great) {
            var newX = great[0];
            var newY = great[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
this.mul();
        }
        else{
            this.move();
        }
    }
    mul() {
        var newCell = random(this.chooseCell(2));
        if (this.energy >= 15 && newCell) {
            var newgrasseatereater = new GrassEaterEater(newCell[0], newCell[1], this.index);
            grassEaterEaterArr.push(newgrasseatereater);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 5;
            console.log(this.energy);
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 2;
            for (var i in grassEaterEaterArr) {
                if (this.x == grassEaterEaterArr[i].x && this.y == grassEaterEaterArr[i].y) {
                    grassEaterArr.push(new GrassEater(this.x, this.y, 2));
                    break;
                }
            }

        }
    }
}


class trash{
    consturctor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.year = 1;
    }

    die() {
        // this.year++;
        // console.log(this.year);
        if (this.year >= 1000) {
            matrix[this.y][this.x] = 1;


            for (var i in trasharr) {
                if (this.x == trasharr[i].x && this.y == trasharr[i].y) {
                    trasharr.splice(i, 1);
                    break;
                }
            }
        }
    }
    energyst() {
        this.year++;
        // console.log(this.year);
    }
}


class trasher {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.diesel = 200;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell(character) {
        var found = [];
        this.getNewCoordinates();
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var newCell = random(this.chooseCell(0))
        var xCell = random(this.chooseCell(1))
        if (newCell) {
            this.diesel--;
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.y = newY;
            this.x = newX;
        }
        else if (xCell) {
            this.diesel -= 2;
            var newX = xCell[0];
            var newY = xCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.y = newY;
            this.x = newX;
        }
        
    }
    eat() {
        var trash = random(this.chooseCell(4));
       
        if (trash) {
            var newX = trash[0];
            var newY = trash[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            for (var i in trashArr) {
                if (newX == trashArr[i].x && newY == trashArr[i].y) {
                    trashArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.diesel++;

        }
        

    }

    die() {
        if (this.diesel <= 0) {
            matrix[this.y][this.x] = 3;
            for (var i in trasherArr) {
                if (this.x == trasherArr[i].x && this.y == trasherArr[i].y) {
                    grassEaterEaterArr.push(new GrassEaterEater(this.x,this.y,3));
                    break;
                }
            }
        }
    }
}