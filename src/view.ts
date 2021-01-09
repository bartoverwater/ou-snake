/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction } from "./direction.js";
import { GameModel, Point } from "./model.js";

const canvas = document.getElementById("mySnakeCanvas")! as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d")!;

export function onStartButtonClicked(onStartFunction: () => void): void {
  document
    .getElementById("startSnake")!
    .addEventListener("click", () => onStartFunction());
}

export function drawModelOnCanvas(model: GameModel): void {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  model.snake.forEach(drawPoint);
  model.food.forEach(drawPoint);
}

export function onDirectionChanged(
  changeDirFunction: (newDirection: Direction) => void
): void {
  document.addEventListener("keydown", (event) => {
    changeDirFunction(<Direction>event.key);
  });
}

const drawPoint = (point: Point): void => {
  canvasContext.fillStyle = point.color;
  canvasContext.fillRect(point.x, point.y, 10, 10);
};
