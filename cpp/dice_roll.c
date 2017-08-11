#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <time.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
    printf("WebAssembly module loaded 5\n");
}

int EMSCRIPTEN_KEEPALIVE rolling() {
    srand ( time(NULL) );
    return rand() % 6 + 1;
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