import { Direction } from "./direction.js";
import settings from "./game-settings.js";

export interface GameModel {
  food: Point[];
  snake: Point[];
}

export interface Point {
  color: string;
  x: number;
  y: number;
}

export let gameModel: GameModel;
export let gameOver = false;

export function newGame(width: number, height: number): void {
  gameModel = new SnakeGameModel(width, height);
}

//todo create move functions
export function changeDirection(newDirection: Direction) {
  //todo implement
}

export function moveSnake(): GameModel {
  //todo implement
  console.log("move called");
  return gameModel;
}

class SnakeGameModel implements GameModel {
  food: Point[] = [];
  snake: Point[];
  direction: Direction = Direction.Up;
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.food = this.createFoods(5);
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
      newFoods.push(this.createFood());
    }
    return [...this.food, ...newFoods];
  }

  //todo Prevent collision with pointCollides function
  createFood(): Point {
    return {
      color: settings.COLORS.FOOD,
      x: getRandomInt(
        settings.ELEMENT_RADIUS,
        this.width - settings.ELEMENT_RADIUS
      ),
      y: getRandomInt(
        settings.ELEMENT_RADIUS,
        this.height - settings.ELEMENT_RADIUS
      ),
    };
  }

  createStartSnake(): Point[] {
    return [
      {
        color: settings.COLORS.SNAKE_BODY,
        x: settings.ELEMENT_RADIUS + this.width / 2,
        y: settings.ELEMENT_RADIUS + this.height / 2,
      },
      {
        color: settings.COLORS.SNAKE_HEAD,
        x: settings.ELEMENT_RADIUS + this.width / 2,
        y: this.height / 2 - settings.ELEMENT_RADIUS,
      },
    ];
  }

  pointCollides(other: Point): boolean {
    const collides = (element: Point): boolean =>
      other.x === element.x && other.y === element.y;
    return this.food.some(collides) || this.snake.some(collides);
  }
}

/**
  @function getRandomInt(min: number, max: number) -> number
  @desc Creeren van random geheel getal in het interval [min, max]
  @param {number} min een geheel getal als onderste grenswaarde
  @param {number} max een geheel getal als bovenste grenswaarde (max > min)
  @return {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
