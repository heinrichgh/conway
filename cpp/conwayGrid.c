#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <time.h>
#include <emscripten/emscripten.h>

int _height;
int _width;
float _populateChance;

int main(int argc, char ** argv) {
    printf("WebAssembly module loaded 5\n");
}

int EMSCRIPTEN_KEEPALIVE tester() {
    srand ( time(NULL) );
    return rand() % 6 + 1;
}

int EMSCRIPTEN_KEEPALIVE setHeight(int height) {
    printf("Setting Heigth: %d \n", height);
    _height = height;
    return 0;
}

int EMSCRIPTEN_KEEPALIVE setWidth(int width) {
    printf("Setting Width: %d \n", width);
    _width = width;
    return 0;
}

int EMSCRIPTEN_KEEPALIVE setPopulateChance(float populateChance) {
    printf("Setting PopulateChance: %4.4f \n", populateChance);
    _populateChance = populateChance;
    return 0;
}

int EMSCRIPTEN_KEEPALIVE initRandomGrid(uint8_t *grid) {
    printf("Init RandomGrid\n");

    srand ( time(NULL) );
    printf("RR1: %4.8f \n", ((rand() % 100) / 100.0));
    printf("RR2: %4.8f \n", ((rand() % 100) / 100.0));
    printf("RR3: %4.8f \n", ((rand() % 100) / 100.0));
    float ra = ((rand() % 100) / 100.0);
    printf("CC: %4.8f | %d | %4.8f \n", ra,  ra < _populateChance ? 1 : 0, _populateChance);

    int sumation = 0;
    for (int w = 0; w < _width; w++) {
        for (int h = 0; h < _height; h++) {
            grid[h*_width + w] = ((rand() % 100) / 100.0) < _populateChance ? 1 : 0;
            sumation += grid[h*_width + w];
        }
    }
    printf("CC: %d \n", sumation);
    return 0;
}

int EMSCRIPTEN_KEEPALIVE updateGridState(uint8_t *grid) {
    //printf("Updating Grid State\n");

    uint8_t *newGridState = malloc(sizeof(uint8_t) * _width * _height);
    
    int countDead = 0;
    for (int w = 0; w < _width; w++) {
        for (int h = 0; h < _height; h++) {

            int index = h*_width + w;
            int topIndex = (h-1)*_width + w;
            int topLeftIndex = (h-1)*_width + w - 1;
            int topRightIndex = (h-1)*_width + w + 1;

            int bottomIndex = (h+1)*_width + w;
            int bottomLeftIndex = (h+1)*_width + w - 1;
            int bottomRightIndex = (h+1)*_width + w + 1;

            int leftIndex = h*_width + w - 1;
            int rightIndex = h*_width + w + 1;

            // count all living adjacent neighbours
            int neighbourCount = 0;

            if (h-1 >= 0) {
                if (w - 1 >= 0) {
                    neighbourCount += grid[topLeftIndex];
                }
                if (w + 1 < _width) {
                    neighbourCount += grid[topRightIndex];
                }
                neighbourCount += grid[topIndex];
            }
            if (h+1 < _height) {
                if (w - 1 >= 0) {
                    neighbourCount += grid[bottomLeftIndex];
                }
                if (w + 1 < _width) {
                    neighbourCount += grid[bottomRightIndex];
                }
                neighbourCount += grid[bottomIndex];
            }
            
            if (w - 1 >= 0) {
                neighbourCount += grid[leftIndex];
            }
            
            if (w + 1 >= 0) {
                neighbourCount += grid[rightIndex];
            }

            /*
            Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
            Any live cell with two or three live neighbours lives on to the next generation.
            Any live cell with more than three live neighbours dies, as if by overpopulation.
            Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
             */

            if (grid[index] == 1) {
                if (neighbourCount < 2) {
                    newGridState[index] = 0;
                } else if (neighbourCount > 3) {
                    newGridState[index] = 0;
                } else {
                    newGridState[index] = 1;
                }
            } else if (neighbourCount == 3) {
                newGridState[index] = 1;
            } else {
                newGridState[index] = 0;
            }

        }
    }


    for (int w = 0; w < _width; w++) {
        for (int h = 0; h < _height; h++) {
            int index = h*_width + w;
            grid[index] = newGridState[index];
        }
    }

    free(newGridState);

    return 0;
}

int EMSCRIPTEN_KEEPALIVE put_in_buff(uint8_t *buf, int len) {
    uint8_t *item;
    uint8_t *end = buf + len;

    int counter = 100;
    for (item = buf; item<end; item++) {
        *item = counter--;
    }

  return 0;
}