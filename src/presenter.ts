import { Direction } from "./direction.js";
import * as view from "./view.js";
import { GameModel, newModel } from "./model.js";
import settings from "./game-settings.js";
import * as highscore from "./highscore.js";

/** @module Presenter */

let model: GameModel | null;
let timeOut: number | null = null;
let direction: Direction;
let lastDirectionPressed: Direction | null = null;
let stopped = false;
let competitiveMode = false;

/**
 @function init(width, height) -> void
 @desc Remove any previous food- or snake-segments, create a new snake, generate food and draw everything on the canvas.
 @param {number} width - The width of the canvas
 @param {number} height -The height of the canvas
 */
function init(width: number, height: number) {
  if (timeOut != undefined) {
    clearTimeout(timeOut);
  }
  if (stopped) {
    stopped = false;
    eventLoop();
    return;
  }
  lastDirectionPressed = null;
  model = newModel(width, height, competitiveMode);
  direction = Direction.Up;
  eventLoop();
}

/**
 @function eventLoop() -> void
 @desc Starts the event loop unless the game is over or stopped. The timeout number of seconds can be set in the game-settings.
 */
function eventLoop(): void {
  if (model == null || model.gameOver) {
    persistScore(model?.score);
    view.showGameOver();
    return;
  } else if (model.food.length == 0) {
    view.showGameWon();
    return;
  }
  timeOut = setTimeout(
    () => {
      if (lastDirectionPressed != null) {
        direction = lastDirectionPressed;
      }
      model?.moveSnake(direction);
      lastDirectionPressed = null;
      if (model != null) {
        view.drawModelOnCanvas(model);
      }
      eventLoop();
    },
    competitiveMode ? settings.COMPETITIVE_SLEEPTIME : settings.SLEEPTIME
  );
}

/**
 @function changeDirection(newDirection) -> void
 @desc A function to pass the new direction from the view to the model.
 @param {Direction} newDirection - the new direction based on the arrow key pressed by the player
 */
function changeDirection(newDirection: Direction): void {
  if (
    (newDirection === Direction.Left && direction !== Direction.Right) ||
    (newDirection === Direction.Right && direction !== Direction.Left) ||
    (newDirection === Direction.Up && direction !== Direction.Down) ||
    (newDirection === Direction.Down && direction !== Direction.Up)
  ) {
    lastDirectionPressed = newDirection;
  }
}

/**
 @function stop() -> void
 @desc pauses the game when player uses the stop-button
*/
function stop(): void {
  if (timeOut != null) {
    clearTimeout(timeOut);
  }
  if (model?.food.length != 0 && !model?.gameOver) {
    stopped = true;
    view.showGameStopped();
  }
}

/**
@function toggleCompetitiveMode(newValue) -> void
@desc When newValue is true: This function will put the game in competitive mode, retrieve highscores from the database 
      and calls the view to show the highscores on the page.
      When newValue is false: This function will disable competitive mode and call the view to hide all competitive mode elements.
@param {boolean} newValue true when player chooses competitive mode, false otherwise.
*/
function toggleCompetitiveMode(newValue: boolean) {
  competitiveMode = newValue;
  if (competitiveMode) {
    const highscores = highscore.getHighscoreList();
    view.fillHighScoreList(highscores);
  }
}

/**
@function persistScore(score) -> void
@desc adds a player's name and score to the list of highscores
      if competitive mode is chosen ánd his score is higher than previous scores.
@param {number | undefined} score the endscore (when competitive mode is chosen,
        otherwise undefined)
*/
function persistScore(score: number | undefined) {
  if (score && competitiveMode) {
    highscore.insertScore(
      {
        _id: null,
        name: view.getPlayerName(),
        score: score,
      },
      () => view.fillHighScoreList(highscore.getHighscoreList())
    );
  }
}

/**
 Main presenter class, used to initialize the code.
 @class Presenter
 */
export class Presenter {
  /**
   @function load() -> void
   @desc Initializes the code. This does not automatically start the game.
   @memberof Presenter
   */
  load(): void {
    view.onStartButtonClicked(init);
    view.onStopButtonClicked(stop);
    view.onDirectionChanged(changeDirection);
    view.onCompetitiveModeClicked(toggleCompetitiveMode);
  }
}
