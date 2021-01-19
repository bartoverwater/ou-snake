import { Direction } from "./direction.js";
import * as view from "./view.js";
import { GameModel, newModel } from "./model.js";
import settings from "./game-settings.js";

/**
 * @module Presenter
 */
let model: GameModel | null;
/**
 * Haal eventueel bestaand voedsel en een bestaande slang weg, cre\"eer een slang, genereer voedsel, en teken alles.
 *
 * @param {number} width De width van het speelveld
 * @param {number} height De height van het speelveld
 */
function init(width: number, height: number) {
  if (timeOut != undefined) {
    clearTimeout(timeOut);
  }
  view.showGameOver(false);
  model = newModel(width, height);
  view.onDirectionChanged(changeDirection);
  direction = Direction.Up;
  eventLoop();
}

let timeOut: number | null = null;
let direction: Direction;
let lastDirectionPressed: Direction | null = null;

/**
 * Starts the event loop. The timeout number of seconds can be set in the game-settings.
 */
function eventLoop(): void {
  if (model == null || model.gameOver) {
    view.showGameOver(true);
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
 * A function to pass the new direction from the view to the model.
 *
 * @param {Direction} newDirection
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
@desc Laat slang en voedsel verdwijnen, en teken leeg veld
*/
function stop(width: number, height: number): void {
  model?.setGameOver(true);
  view.drawEmptyCanvas(model);
}

/**
 * Main presenter class, used to initialize the code.
 *
 * @export
 * @class Presenter
 */
export class Presenter {
  /**
   * Initializes the code. This does not start the game.
   *
   * @memberof Presenter
   */
  load(): void {
    view.onStartButtonClicked(init);
    view.onStopButtonClicked(stop);
  }
}
