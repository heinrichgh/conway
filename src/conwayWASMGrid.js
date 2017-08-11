const populateChanceDefault = 0.04;

class ConwayGrid {
    constructor(width, height, populateChance, ticksPerSecond) {
        this.height = height;
        this.width = width;
        this.populateChance = populateChance || populateChanceDefault;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    setGrid(grid) {
        this.grid = grid;
    }

    initRandomGrid() {
        this.grid = [];
        for (var w = 0; w < this.width; w++) {
            this.grid[w] = [];
            for (var h = 0; h < this.height; h++) {
                this.grid[w][h] = this.getRandomLivingVal();
            }
        }
    }

    getRandomLivingVal() {
        return Math.random() < this.populateChance ? 1 : 0;
    }

    getNextGridState() {
        let newGridState = [];
        let countDead = 0;
        for (var w = 0; w < this.width; w++) {
            newGridState[w] = [];
            for (var h = 0; h < this.height; h++) {
                // count all living adjacent neighbours
                var neighbourCount = 0;
                neighbourCount += this.grid[w][h-1] || 0;
                neighbourCount += this.grid[w][h+1] || 0;
                if (this.grid[w-1]) {
                    neighbourCount += this.grid[w-1][h-1] || 0;
                    neighbourCount += this.grid[w-1][h] || 0;
                    neighbourCount += this.grid[w-1][h+1] || 0;
                }
                if (this.grid[w+1]) {
                    neighbourCount += this.grid[w+1][h-1] || 0;
                    neighbourCount += this.grid[w+1][h] || 0;
                    neighbourCount += this.grid[w+1][h+1] || 0;
                }

                /*
                Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
                Any live cell with two or three live neighbours lives on to the next generation.
                Any live cell with more than three live neighbours dies, as if by overpopulation.
                Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                 */

                if (this.grid[w][h] === 1) {
                    if (neighbourCount < 2) {
                        newGridState[w][h] = 0;
                    } else if (neighbourCount > 3) {
                        newGridState[w][h] = 0;
                    } else {
                        newGridState[w][h] = 1;
                    }
                } else if (neighbourCount === 3) {
                    newGridState[w][h] = 1;
                } else {
                    newGridState[w][h] = 0;
                }

                if (newGridState[w][h] === 0) {
                    countDead++;
                }
            }
        }
        this.setGrid(newGridState);
        
        return this.grid;
    }
}

export default ConwayGrid;