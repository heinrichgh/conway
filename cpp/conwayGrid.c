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

    for (var w = 0; w < _width; w++) {
        for (var h = 0; h < _height; h++) {
            grid[h*_width + h] = rand() % 2;
        }
    }
    return 0;
}

int EMSCRIPTEN_KEEPALIVE updateGridState() {
    printf("Updating Grid State\n");

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