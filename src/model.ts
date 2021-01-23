import { Direction } from "./direction.js";
import settings from "./game-settings.js";

/** @module Model */

/**
 Interface for the class SnakeGameModel to represent the Snake game.
 @interface
*/
export interface GameModel {
  food: Point[];
  snake: Point[];
  gameOver: boolean;
  score: number;
  moveSnake(direction: Direction): void;
}

/**
 A Class used to represent Food or Snakesegments as Points with properties color and coordinates x and y.
 @class
*/
export class Point {
  color: string;
  x: number;
  y: number;

  /**
   @param {string} color - the color of the Point
   @param {number} x     - the x-coordinate of the Point
   @param {number} y     - the y-coordinate of the Point
  */
  constructor(color: string, x: number, y: number) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  /**
   @function collidesWith(other) -> boolean(color, x,y)
   @desc Determines whether this point collides with another Point
   @param {Point} other - the other point
   @return {boolean} - true if there is a collision, false if there is no collision
  */
  collidesWith(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

/**
 @function newModel(width, height) -> GameModel
 @desc  creates a new snake and food within the canvas.
 @param {number} width   - the width of the canvas
 @param {number} height  - the height of the canvas
 @return {GameModel}    - the new snakegamemodel
*/
export function newModel(
  width: number,
  height: number,
  competitiveMode: boolean
): GameModel {
  return new SnakeGameModel(width, height, competitiveMode);
}

/**
 A class used to represent the SnakeGame with a.o. snake and food
 @class
*
*/
class SnakeGameModel implements GameModel {
  food: Point[] = [];
  snake: Point[] = [];
  gameOver = false;
  score: number;
  private maxWidth;
  private maxHeight;
  private width;
  private height;
  private competitiveMode;

  /**
   @desc creates a new SnakeGameModel with a snake and food within the canvas.
   @param {number} width  - the width of the canvas
   @param {number} height - the height of the canvas
  */
  constructor(width: number, height: number, competitiveMode: boolean) {
    this.width = width;
    this.height = height;
    this.maxWidth = width - settings.STEP;
    this.maxHeight = height - settings.STEP;
    this.food = this.createFoods(settings.NUM_FOODS);
    this.snake = this.createStartSnake();
    this.competitiveMode = competitiveMode;
    this.score = 0;
  }

  /**
      @function createFoods(amount) -> Point[]
      @desc creates an array of food particles represented as instances of Point.
      @param {number} amount - the number of food particles to be created
      @memberof SnakeGameModel
      @return {Point[]} newFoods  - an array of 'food particles'
  */
  private createFoods(amount: number): Point[] {
    const newFoods = [];
    for (let i = 0; i < amount; i++) {
      let newFood = this.createFood();
      while (
        this.food.some((food) => food.collidesWith(newFood)) ||
        this.snake.some((snake) => snake.collidesWith(newFood))
      ) {
        newFood = this.createFood();
      }
      newFoods.push(newFood);
    }
    return newFoods;
  }

  /**
  @function createFood() -> Point
  @desc creates a food particle with the set color of Food
        and randomly calculated x- and y-coordinates.
  @memberof SnakeGameModel
  @return {Point} - the new food particle
  */
  private createFood(): Point {
    return new Point(
      settings.COLORS.FOOD,
      roundToNearestGridCell(
        getRandomInt(
          settings.ELEMENT_RADIUS + settings.MIN_WIDTH_HEIGHT,
          this.maxWidth
        )
      ),
      roundToNearestGridCell(
        getRandomInt(
          settings.ELEMENT_RADIUS + settings.MIN_WIDTH_HEIGHT,
          this.maxHeight
        )
      )
    );
  }

  /**
   @function createStartSnake() -> Point[]
   @desc creates the initial snake at the start of the game
         with a body particle and a head particle
   @memberof SnakeGameModel
   @return {Point[]} the snake at the start of the game
  */
  private createStartSnake(): Point[] {
    const startingWidth = settings.ELEMENT_RADIUS + this.width / 2;
    const startingHeight = settings.ELEMENT_RADIUS + this.height / 2;
    return [
      new Point(settings.COLORS.SNAKE_BODY, startingWidth, startingHeight),
      new Point(
        settings.COLORS.SNAKE_HEAD,
        startingWidth,
        this.height / 2 - settings.ELEMENT_RADIUS
      ),
    ];
  }

  /**
  @function moveSnake(direction) -> void
  @desc moves the snake in the given direction
  @param {Direction} direction - the direction of the arrow key pressed down by the player
  @memberof SnakeGameModel
  */
  moveSnake(direction: Direction): void {
    const head = this.snake[this.snake.length - 1];
    let newX = head.x;
    let newY = head.y;
    switch (direction) {
      case Direction.Up:
        newY = head.y - settings.STEP;
        break;
      case Direction.Down:
        newY = head.y + settings.STEP;
        break;
      case Direction.Left:
        newX = head.x - settings.STEP;
        break;
      case Direction.Right:
        newX = head.x + settings.STEP;
        break;
    }

    const newPosition = new Point(head.color, newX, newY);

    if (
      this.snake.some((snakeElement) => snakeElement.collidesWith(newPosition))
    ) {
      this.gameOver = true;
    } else {
      this.move(this.checkOutOfBounds(newPosition), head);
    }
  }

  /**
  @function checkOutOfBounds(point) -> Point
  @desc lets the snake appear on the other side of the canvas
        if the snake reaches the border of the canvas
        by changing the coordinates matching with the other side.
  @memberof SnakeGameModel
  @return {Point} the point with corrected coordinates
  */
  private checkOutOfBounds(point: Point): Point {
    const correctedPoint = new Point(point.color, point.x, point.y);
    if (correctedPoint.x <= 0) {
      correctedPoint.x = this.width - settings.STEP;
    } else if (correctedPoint.x >= this.width) {
      correctedPoint.x = 0 + settings.STEP;
    }
    if (correctedPoint.y < 0 + settings.ELEMENT_RADIUS) {
      correctedPoint.y = this.height - settings.STEP;
    } else if (correctedPoint.y > this.height - settings.ELEMENT_RADIUS) {
      correctedPoint.y = 0 + settings.STEP;
    }
    return correctedPoint;
  }

  /**
  @function move(newElement, oldHead) -> void
  @desc increments the body of the snake if the snake 'eats' a food particle
        and removes the eaten particle from the canvas.
  @memberof SnakeGameModel
  */
  private move(newElement: Point, oldHead: Point) {
    oldHead.color = settings.COLORS.SNAKE_BODY;
    this.snake.push(newElement);
    if (!this.food.some((food) => food.collidesWith(oldHead))) {
      this.snake.shift();
    } else {
      this.food = this.food.filter((element) => !element.collidesWith(oldHead));
      if (this.competitiveMode) {
        this.score += settings.SCORE_PER_FOOD;
        this.food = this.food.concat(this.createFoods(1));
      }
    }
  }
}

/**
  @function getRandomInt(min: number, max: number) -> number
  @desc Creates a random integer within the [min, max] interval
  @param {number} min an integer as the minimum value
  @param {number} max an integer as the maximum value (max > min)
  @return {number} a random integer x (min <= x <= max)
*/
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
@function roundToNearestGridCell(number: number) -> number
@desc rounds a number to match the coordinates of a cell in the canvas
      to make sure the snake can have a perfect collision with the food-particles.
@return {number} the rounded number
*/
function roundToNearestGridCell(number: number): number {
  return Math.ceil(number / settings.STEP) * settings.STEP;
}
