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