const defaultTicksPerSecond = 2;

class ConwayRunner {

    constructor(grid, canvas, ticksPerSecond) {
        this.grid = grid;
        this.canvas = canvas;
        this.ticksPerSecond = ticksPerSecond || defaultTicksPerSecond;
    }

    start() {        
        this.canvas.attachToDOM(document.body);
        this.grid.initRandomGrid();
        this.canvas.setGrid(this.grid.getGrid());
        this.timer = setInterval(() =>
            this.tick()
        , 1000.0 / this.ticksPerSecond);
    }

    stop() {
        clearInterval(this.timer);
    }

    tick() {        
        this.grid.getNextGridState();
        this.canvas.drawGrid();
        //this.grid.getNextGridState();
        //this.canvas.drawGrid(this.grid.getNextGridState());
    }
}

export default ConwayRunner;