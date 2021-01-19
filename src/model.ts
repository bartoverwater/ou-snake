import { Direction } from "./direction.js";
import settings from "./game-settings.js";

export interface GameModel {
  food: Point[];
  snake: Point[];
  gameOver: boolean;
  setGameOver(bool: boolean): void;
  moveSnake(direction: Direction): void;
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

export function newModel(width: number, height: number): GameModel {
  return new SnakeGameModel(width, height);
}

class SnakeGameModel implements GameModel {
  food: Point[] = [];
  snake: Point[] = [];
  gameOver = false;
  private maxWidth;
  private maxHeight;
  private width;
  private height;

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

  private createFood(): Point {
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

  setGameOver(isGameOver: boolean): void {
    this.gameOver = isGameOver;
  }

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

  private move(newElement: Point, oldHead: Point) {
    oldHead.color = settings.COLORS.SNAKE_BODY;
    this.snake.push(newElement);
    if (!this.food.some((food) => food.collidesWith(oldHead))) {
      this.snake.shift();
    } else {
      this.food = this.food.filter((element) => !element.collidesWith(oldHead));
    }
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
