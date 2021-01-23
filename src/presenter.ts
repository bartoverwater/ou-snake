import { Direction } from "./direction.js";
import * as view from "./view.js";
import { GameModel, newModel } from "./model.js";
import settings from "./game-settings.js";

/** @module Presenter */

let model: GameModel | null;
let timeOut: number | null = null;
let direction: Direction;
let lastDirectionPressed: Direction | null = null;
let stopped = false;

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
  model = newModel(width, height);
  direction = Direction.Up;
  eventLoop();
}

/**
 @function eventLoop() -> void
 @desc Starts the event loop unless the game is over or stopped. The timeout number of seconds can be set in the game-settings.
 */
function eventLoop(): void {
  if (model == null || model.gameOver) {
    view.showGameOver();
    return;
  } else if (model.food.length == 0) {
    view.showGameWon();
    return;
  }
  timeOut = setTimeout(() => {
    if (lastDirectionPressed != null) {
      direction = lastDirectionPressed;
    }
    model?.moveSnake(direction);
    lastDirectionPressed = null;
    if (model != null) {
      view.drawModelOnCanvas(model);
    }
    eventLoop();
  }, settings.SLEEPTIME);
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
  }
}
