import Canvas from './canvas';
import ConwayGrid from './conwayWASMGrid';
import ConwayRunner from './runner';
import './style.css';
import roller from '../cpp/conwayWASMGrid.exec.js'

const canvasWidth = document.body.clientWidth - 4;
const canvasHeight = document.body.clientHeight - 4;

const ZOOM_FACTOR = 4;
const POPULATE_CHANCE = 0.1;
const TICKS_PER_SECOND = 300;

setTimeout(() => {

const grid =  new ConwayGrid(Math.floor(canvasWidth / ZOOM_FACTOR), Math.floor(canvasHeight / ZOOM_FACTOR), POPULATE_CHANCE);
const canvas = new Canvas(canvasWidth, canvasHeight);
const runner = new ConwayRunner(grid, canvas, TICKS_PER_SECOND)

runner.start();

}, 1000);




/*
setTimeout(() => {

console.log(Module.ccall(
    'tester',     // name of C function
    'number',       // return type
    [],     // argument types
    []));



    const buffer = Module._malloc(10);

    Module.ccall(
        'put_in_buff',     // name of C function
        'number',       // return type
        ['number', 'number'],     // argument types
        [buffer, 10])

    
    console.log(Module.HEAPU8.subarray(buffer, buffer+1));
console.log(buffer);

    Module._free(buffer);




}, 1000);*/

