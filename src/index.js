import Canvas from './canvas';
import ConwayGrid from './conwayGrid';
import './style.css';

const canvasWidth = document.body.clientWidth - 4;
const canvasHeight = document.body.clientHeight - 4;

const zoomFactor = 4;

const conway =  new ConwayGrid(canvasWidth / zoomFactor, canvasHeight / zoomFactor, 0.1, 50);
const canvas = new Canvas(canvasWidth, canvasHeight);
canvas.attachToDOM(document.body);

conway.setCanvas(canvas);

conway.initRandomGrid();
conway.start();