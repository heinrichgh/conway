import Canvas from './canvas';
import ConwayGrid from './conwayGrid';
import ConwayRunner from './runner';
import './style.css';

const canvasWidth = document.body.clientWidth - 4;
const canvasHeight = document.body.clientHeight - 4;

const ZOOM_FACTOR = 4;
const POPULATE_CHANCE = 0.1;
const TICKS_PER_SECOND = 60;

const grid =  new ConwayGrid(canvasWidth / ZOOM_FACTOR, canvasHeight / ZOOM_FACTOR, POPULATE_CHANCE);
const canvas = new Canvas(canvasWidth, canvasHeight);
const runner = new ConwayRunner(grid, canvas, TICKS_PER_SECOND)
canvas.attachToDOM(document.body);

runner.start();