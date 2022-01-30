let LivingCreature = require('./LivingCreature')
const Grass = require('./grass')
module.exports = class trash extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index);
        this.year = 1;

    }

    die() {
        this.year++;
        if (this.year >= 100) {

            matrix[this.y][this.x] = 1;
            for (var i in trashArr) {
                
                if (this.x == trashArr[i].x && this.y == trashArr[i].y) {
                    // trashArr.push(new trash(this.x, this.y, 4));
                    grassArr.push(new Grass(this.x, this.y, 1))
                    trashArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}