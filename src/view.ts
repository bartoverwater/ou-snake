/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GameModel, Point } from "./model.js";

const canvas = document.getElementById("mySnakeCanvas")! as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d")!;

export function onStartButtonClicked(onStartFunction: () => void): void {
  document
    .getElementById("startSnake")!
    .addEventListener("click", () => onStartFunction());
}

const drawPoint = (point: Point): void => {
  canvasContext.fillStyle = point.color;
  canvasContext.fillRect(point.x, point.y, 10, 10);
};

export function drawModelOnCanvas(model: GameModel): void {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  model.snake.forEach(drawPoint);
  model.food.forEach(drawPoint);
}
