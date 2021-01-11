/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction } from "./direction.js";
import { GameModel, Point } from "./model.js";
import settings from "./game-settings.js";

const canvas = document.getElementById("mySnakeCanvas")! as HTMLCanvasElement;
const canvasContext = canvas.getContext("2d")!;

export function onStartButtonClicked(
  onStartFunction: (width: number, height: number) => void
): void {
  document
    .getElementById("startSnake")!
    .addEventListener("click", () =>
      onStartFunction(canvas.width, canvas.height)
    );
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
  const circle = new Path2D();
  circle.arc(point.x, point.y, settings.ELEMENT_RADIUS, 0, 2 * Math.PI, false);
  canvasContext.fillStyle = point.color;
  canvasContext.fill(circle);
  canvasContext.stroke(circle);
};
