class Canvas {
    constructor(width, height) {
        this.height = height;
        this.width = width;
    }

    setGrid(grid) {
        this.grid = grid;
    }

    attachToDOM(element, colour) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        // dimensions
        this.canvas.setAttribute("height", this.height);
        this.canvas.setAttribute("width", this.width);
        // colour
        this.context.fillStyle = colour;
        this.context.fillRect(0, 0, this.width, this.height);

        element.appendChild(this.canvas);
    }

    drawGrid() {
        const cellWidth = this.width / this.grid.getWidth();
        const cellHeight = this.height / this.grid.getHeight();
        // clear grid
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.width, this.height);
        // draw
        this.context.fillStyle = "green";
        for (var w = 0; w < this.grid.getWidth(); w++) {
            for (var h = 0; h < this.grid.getHeight(); h++) {
                if (this.grid.getCell(w, h) === 1) {
                    this.context.fillRect(w*cellWidth, h*cellHeight, cellWidth, cellHeight);
                }
            }
        }
    }
}

export default Canvas;