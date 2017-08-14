const populateChanceDefault = 0.04;

class ConwayWASMGrid {
    constructor(width, height, populateChance, ticksPerSecond) {
        this.height = height;
        this.width = width;
        this.populateChance = populateChance || populateChanceDefault;

        Module.ccall(
            'setHeight', // name of C function
            'undefined',    // return type
            ['number'],     // argument types
            [this.height]      // arguments
        );
        
        Module.ccall(
            'setWidth', // name of C function
            'undefined',    // return type
            ['number'],     // argument types
            [this.width]      // arguments
        );

        Module.ccall(
            'setPopulateChance', // name of C function
            'undefined',    // return type
            ['number'],     // argument types
            [this.populateChance]      // arguments
        );

        this.gridBuffer = Module._malloc(this.width * this.height);
    }

    

    getGrid() {
        return {
            getCell: (w,h) => {
                var index = h*this.width + w;
                return Module.HEAPU8.subarray(this.gridBuffer, this.gridBuffer+index + 1) // +1 because of the way HEAPU8.subarray works
            }
            , getWidth: () => this.width
            , getHeight: () => this.height
        }
    }

    initRandomGrid() {        
        Module.ccall(
            'initRandomGrid', // name of C function
            'undefined',    // return type
            ['number'],     // argument types
            [this.gridBuffer]      // arguments
        );
    }

    updateGridState() {
        Module.ccall(
            'updateGridState', // name of C function
            'undefined',    // return type
            ['number'],     // argument types
            [this.gridBuffer]      // arguments
        );
    }
}

export default ConwayWASMGrid;