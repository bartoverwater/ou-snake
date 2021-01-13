/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction } from "./direction.js";
import { GameModel, Point } from "./model.js";
import settings from "./game-settings.js";
/** @module View */
/**
 * The Html Canvas Element
 * @type {HTMLCanvasElement} */
const canvas: HTMLCanvasElement = document.getElementById(
  "mySnakeCanvas"
)! as HTMLCanvasElement;
/**
 * The 2d rendering context of the canvas.
 * @type {CanvasRenderingContext2D}  */
const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d")!;

/**
 * Gets the startSnake button from the DOM and adds onStartFunction to the Click Event Listener.
 *
 * @export
 * @param {function(number, number): void} onStartFunction The function to call when the start button is clicked.
 */
export function onStartButtonClicked(
  onStartFunction: (width: number, height: number) => void
): void {
  document
    .getElementById("startSnake")!
    .addEventListener("click", () =>
      onStartFunction(canvas.width, canvas.height)
    );
}

/**
 * Gets the stopSnake button from the DOM and adds the onStopFunction to the Click Event Listener.
 *
 * @export
 * @param {function(): void} onStopFunction The stop function to call when the stop button is clicked.
 */
export function onStopButtonClicked(onStopFunction: () => void): void {
  document
    .getElementById("stopSnake")!
    .addEventListener("click", onStopFunction);
}

/**
 * Clears the canvas and then draws the snake and food arrays from the model on the canvas.
 *
 * @export
 * @param {GameModel} model A model to draw on the canvas.
 */
export function drawModelOnCanvas(model: GameModel): void {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  model.snake.forEach(drawPoint);
  model.food.forEach(drawPoint);
}

/**
 * Adds the given changeDirFunction to the document "keydown" event listener.
 *
 * @export
 * @param  {function(Direction): void} changeDirFunction
 */
export function onDirectionChanged(
  changeDirFunction: (newDirection: Direction) => void
): void {
  document.addEventListener("keydown", (event) => {
    changeDirFunction(<Direction>event.key);
  });
}

/**
 * Draws the given point on the canvas.
 *
 * @param {Point} point Point to draw on the canvas.
 */
const drawPoint = (point: Point): void => {
  const circle = new Path2D();
  circle.arc(point.x, point.y, settings.ELEMENT_RADIUS, 0, 2 * Math.PI, false);
  canvasContext.fillStyle = point.color;
  canvasContext.fill(circle);
  canvasContext.stroke(circle);
};
