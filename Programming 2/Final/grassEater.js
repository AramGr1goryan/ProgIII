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