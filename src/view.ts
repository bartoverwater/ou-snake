import { Direction } from "./direction.js";
import { GameModel, Point } from "./model.js";
import settings from "./game-settings.js";
import { HighscoreEntry } from "./highscore.js";

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
  document.getElementById("startSnake")!.addEventListener("click", () => {
    onStartFunction(canvas.width, canvas.height);
  });
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

let scoreDiv: HTMLElement;

/**
 @function drawModelOnCanvas(model) -> void
 @desc Clears the canvas and then draws the snake and food arrays from the model on the canvas.
 @param {GameModel} model A model to draw on the canvas.
 */
export function drawModelOnCanvas(model: GameModel): void {
  scoreDiv.textContent = model.score?.toString();
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

/**
@function onCompetitiveModeClicked(func: (bool) -> void) -> void
@desc adds an element to the page to keep track of the score during the game
      when competitive mode is chosen.
@param {function(bool):void} func the function to hide or display the scoreboard.
*/
export function onCompetitiveModeClicked(func: (bool: boolean) => void): void {
  const checkBox = <HTMLInputElement>(
    document.getElementById("comp-mode-checkbox")!
  );
  scoreDiv = document.getElementById("score")!;
  const compModeFields = document.getElementById("comp-mode-input-table")!;
  checkBox.addEventListener("change", function () {
    func(checkBox.checked);
    if (checkBox.checked) {
      compModeFields.classList.remove("hidden");
      scoreDiv.classList.remove("hidden");
    } else {
      compModeFields.classList.add("hidden");
      scoreDiv.classList.add("hidden");
    }
  });
}

/**
@function getPlayerName() -> string
@desc retrieves the name the player enters in the input-field.
@return {string}  - the name of the player
*/
export function getPlayerName(): string {
  return (<HTMLInputElement>document.getElementById("playername"))?.value;
}

/**
@function fillHighScoreList(scores) -> void
@desc creates a scoreboard and fills it with stored high scores
@param {Promise<HighscoreEntry[]>} scores - the list of stored high scores
*/
export function fillHighScoreList(scores: Promise<HighscoreEntry[]>): void {
  scores.then((data) => fillHtmlTable(data)).catch((err) => console.log(err));
}

/**
@function fillHtmlTable(data) -> void
@desc creates a table element on the page to display player names and their
      high scores
@param {HighscoreEntry[]} data the stored player names and their scores.
*/
function fillHtmlTable(data: HighscoreEntry[]) {
  const tableBody = document.getElementById("table-body");
  tableBody!.innerHTML = "";
  data.forEach((scoreEntry) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.textContent = scoreEntry.name;
    tr.appendChild(tdName);
    const tdScore = document.createElement("td");
    tdScore.textContent = scoreEntry.score.toString();
    tr.appendChild(tdScore);
    tableBody?.appendChild(tr);
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
