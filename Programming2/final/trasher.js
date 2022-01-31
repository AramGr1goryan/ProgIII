const GrassEaterEater = require('./GrassEaterEater');
let LivingCreature = require('./LivingCreature');
const trash = require('./trash');

module.exports = class trasher extends LivingCreature {

constructor(x,y,index){
    super(x,y, index);
    this.diesel = 200;
}

     
    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var empty = this.chooseCell(0);
        var grC = this.chooseCell(1);
        var newCell = empty[Math.floor(Math.random() * empty.length)]
        var xCell = grC[Math.floor(Math.random() * grC.length)]
      
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
        var grfourC = this.chooseCell(4);
        var trash = grfourC[Math.floor(Math.random() * grfourC.length)]
        
       
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
           }
        

    }

    die() {
        if (this.diesel <= 0) {
            matrix[this.y][this.x] = 4;
            for (var i in trasherArr) {
                if (this.x == trasherArr[i].x && this.y == trasherArr[i].y) {
                    trasherArr.splice(i,1);
                    trashArr.push(new trash(this.x, this.y,4));
                    break;
                }
            }
        }
    }
}