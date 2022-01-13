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