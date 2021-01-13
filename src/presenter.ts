import { Direction } from "./direction.js";
import * as view from "./view.js";
import * as model from "./model.js";
import settings from "./game-settings.js";

/**
 * @module Presenter
 */

/**
 * Haal eventueel bestaand voedsel en een bestaande slang weg, cre\"eer een slang, genereer voedsel, en teken alles.
 *
 * @param {number} width De width van het speelveld
 * @param {number} height De height van het speelveld
 */
const init = (width: number, height: number) => {
  model.newGame(width, height);
  view.onDirectionChanged(changeDirection);
  eventLoop();
};

/**
 * Starts the event loop. The timeout number of seconds can be set in the game-settings.
 */
const eventLoop = (): void => {
  if (model.gameOver) {
    return;
  }
  setTimeout(() => {
    model.moveSnake();
    view.drawModelOnCanvas(model.gameModel);
    eventLoop();
  }, settings.SLEEPTIME);
};

/**
 * A function to pass the new direction from the view to the model.
 *
 * @param {Direction} newDirection
 */
const changeDirection = (newDirection: Direction) => {
  model.changeDirection(newDirection);
};

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
  }
}
