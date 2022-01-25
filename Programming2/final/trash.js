let LivingCreature = require('./LivingCreature')

module.exports = class trash extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index);
        this.year = 1;

    }

    die() {
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
    }
}