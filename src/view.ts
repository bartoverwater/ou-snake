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
 @function onStartButtonClicked(onStartFunction) -> void
 @desc Gets the startSnake button from the DOM and adds onStartFunction to the Click Event Listener.
 @param {function(number, number): void} onStartFunction The function to call when the start button is clicked.
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
 @function showGameWon() -> void
 @desc presents the user with the banner 'You Win!' when the snake has eaten all food and the game is won.
*/
export function showGameWon(): void {
  banner("YOU WIN!");
}

/**
 @function showGameStopped() -> void
 @desc presents the user with a banner 'Spel gestopt' when user clicks on the stop-button.
*/
export function showGameStopped(): void {
  banner("Spel gestopt");
}

/**
 @function showGameOver() -> void
 @desc presents the user with a banner 'Game Over' when the snake hits a part of itself
*/
export function showGameOver(): void {
  banner("Game Over");
}

/**
 @function banner(tekst) -> void
 @desc creates a banner in the canvas to present to the user a string with the result of the game
 @param {string} tekst - the text to be shown in the banner
*/
function banner(tekst: string): void {
  canvasContext.font = "bold 50px Arial";
  canvasContext.fillStyle = "purple";
  canvasContext.textAlign = "center";
  canvasContext.fillText(tekst, canvas.width / 2, canvas.height / 2);
}

/**
 @function onStopButtonClicked(onStopFunction) -> void
 @desc Gets the stopSnake button from the DOM and adds the onStopFunction to the Click Event Listener.
 @param {function(): void} onStopFunction The stop function to call when the stop button is clicked.
*/
export function onStopButtonClicked(
  onStopFunction: (width: number, height: number) => void
): void {
  document.getElementById("stopSnake")!.addEventListener("click", () => {
    onStopFunction(canvas.width, canvas.height);
  });
}

/**
 @function drawModelOnCanvas(model) -> void
 @desc Clears the canvas and then draws the snake and food arrays from the model on the canvas.
 @param {GameModel} model A model to draw on the canvas.
 */
export function drawModelOnCanvas(model: GameModel): void {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  model.food.forEach(drawPoint);
  model.snake.forEach(drawPoint);
}

/**
 @function onDirectionChanged(changeDirFunction) -> void
 @desc Adds the given changeDirFunction to the document "keydown" event listener.
 @param  {function(Direction): void} changeDirFunction
 */
export function onDirectionChanged(
  changeDirFunction: (newDirection: Direction) => void
): void {
  document.addEventListener("keydown", (event) => {
    let dir;
    switch (event.key) {
      case "ArrowDown":
        dir = Direction.Down;
        break;
      case "ArrowUp":
        dir = Direction.Up;
        break;
      case "ArrowLeft":
        dir = Direction.Left;
        break;
      case "ArrowRight":
        dir = Direction.Right;
        break;
      default:
        return;
    }
    event.preventDefault();
    changeDirFunction(dir);
  });
}

export function onCompetitiveModeClicked(func: (bool: boolean) => void): void {
  const checkBox = <HTMLInputElement>(
    document.getElementById("comp-mode-checkbox")!
  );
  const highscoreTable = document.getElementById("highscore-table")!;
  checkBox.addEventListener("change", function () {
    func(checkBox.checked);
    if (checkBox.checked) {
      highscoreTable.className = "";
    } else {
      highscoreTable.className = "hidden";
    }
  });
}

/**
 @function drawPoint(point) -> void
 @desc Draws the given point on the canvas.
 @param {Point} point Point to draw on the canvas.
 */
const drawPoint = (point: Point): void => {
  const circle = new Path2D();
  circle.arc(point.x, point.y, settings.ELEMENT_RADIUS, 0, 2 * Math.PI, false);
  canvasContext.fillStyle = point.color;
  canvasContext.fill(circle);
  canvasContext.stroke(circle);
};
