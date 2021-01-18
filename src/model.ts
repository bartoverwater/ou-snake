import { Direction } from "./direction.js";
import settings from "./game-settings.js";

export interface GameModel {
  food: Point[];
  snake: Point[];
}

export class Point {
  color: string;
  x: number;
  y: number;

  constructor(color: string, x: number, y: number) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  collidesWith(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}

export let gameModel: SnakeGameModel;
export let gameOver = false;

export function setGameOver(isGameOver: boolean): void {
  gameOver = isGameOver;
}

export function newGame(width: number, height: number): void {
  gameOver = false;
  gameModel = new SnakeGameModel(width, height);
}

export function moveSnake(direction: Direction): GameModel {
  const head = gameModel.snake[gameModel.snake.length - 1];
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
    gameModel.snake.some((snakeElement) =>
      snakeElement.collidesWith(newPosition)
    )
  ) {
    gameOver = true;
  } else {
    move(checkOutOfBounds(newPosition), head);
  }
  return gameModel;
}

function checkOutOfBounds(point: Point): Point {
  const correctedPoint = new Point(point.color, point.x, point.y);
  if (correctedPoint.x <= 0) {
    correctedPoint.x = gameModel.width - settings.STEP;
  } else if (correctedPoint.x >= gameModel.width) {
    correctedPoint.x = 0 + settings.STEP;
  }
  if (correctedPoint.y < 0 + settings.ELEMENT_RADIUS) {
    correctedPoint.y = gameModel.height - settings.STEP;
  } else if (correctedPoint.y > gameModel.height - settings.ELEMENT_RADIUS) {
    correctedPoint.y = 0 + settings.STEP;
  }
  console.log(correctedPoint);
  return correctedPoint;
}

function move(newElement: Point, oldHead: Point) {
  oldHead.color = settings.COLORS.SNAKE_BODY;
  gameModel.snake.push(newElement);
  if (!gameModel.food.some((food) => food.collidesWith(oldHead))) {
    gameModel.snake.shift();
  } else {
    gameModel.food = gameModel.food.filter(
      (element) => !element.collidesWith(oldHead)
    );
  }
}

class SnakeGameModel implements GameModel {
  food: Point[] = [];
  snake: Point[] = [];
  maxWidth;
  maxHeight;
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.maxWidth = width - settings.STEP;
    this.maxHeight = height - settings.STEP;
    this.food = this.createFoods(settings.NUM_FOODS);
    this.snake = this.createStartSnake();
  }

  /**
      @function createFoods() -> array met food
      @desc [Element] array van random verdeelde voedselpartikelen
      @return [Element] array met food
    */
  createFoods(amount: number): Point[] {
    const newFoods = [];
    for (let i = 0; i < amount; i++) {
      let newFood = this.createFood();
      while (
        this.food.some((food) => food.collidesWith(newFood)) ||
        this.snake.some((snake) => snake.collidesWith(newFood))
      ) {
        newFood = this.createFood();
      }
      console.log(newFood);
      newFoods.push(newFood);
    }
    return newFoods;
  }

  //todo Prevent collision with pointCollides function
  createFood(): Point {
    return new Point(
      settings.COLORS.FOOD,
      roundToNearestGridCell(
        getRandomInt(10 + settings.MIN_WIDTH_HEIGHT, this.maxWidth)
      ),
      roundToNearestGridCell(
        getRandomInt(10 + settings.MIN_WIDTH_HEIGHT, this.maxHeight)
      )
    );
  }

  createStartSnake(): Point[] {
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
}

/**
  @function getRandomInt(min: number, max: number) -> number
  @desc Creeren van random geheel getal in het interval [min, max]
  @param {number} min een geheel getal als onderste grenswaarde
  @param {number} max een geheel getal als bovenste grenswaarde (max > min)
  @return {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundToNearestGridCell(number: number): number {
  return Math.ceil(number / settings.STEP) * settings.STEP;
}
