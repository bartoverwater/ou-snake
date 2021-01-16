/* eslint-disable no-case-declarations */
import { Direction } from "./direction.js";
import gameSettings from "./game-settings.js";
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

export let gameModel: SnakeGameModel;
export let gameOver = false;

export function newGame(width: number, height: number): void {
  gameModel = new SnakeGameModel(width, height);
}

//todo create move functions
export function changeDirection(newDirection: Direction): void {
  if (
    (newDirection === Direction.Left &&
      gameModel.direction !== Direction.Right) ||
    (newDirection === Direction.Right &&
      gameModel.direction !== Direction.Left) ||
    (newDirection === Direction.Up && gameModel.direction !== Direction.Down) ||
    (newDirection === Direction.Down && gameModel.direction !== Direction.Up)
  ) {
    gameModel.direction = newDirection;
  }
}

export function moveSnake(): GameModel {
  const lastElement = gameModel.snake[gameModel.snake.length - 1];
  const newElement = {
    color: settings.COLORS.SNAKE_HEAD,
    x: lastElement.x,
    y: lastElement.y,
  };

  switch (gameModel.direction) {
    case Direction.Up:
      let newY = lastElement.y;
      newY = lastElement.y - settings.ELEMENT_RADIUS * 2;
      if (newY <= 0) {
        newY = gameModel.height;
      }
      move({ ...newElement, y: newY }, lastElement);
      break;
    case Direction.Down:
      let newY2 = lastElement.y + settings.ELEMENT_RADIUS * 2;
      if (newY2 >= gameModel.height) {
        newY2 = 0;
      }
      move({ ...newElement, y: newY2 }, lastElement);
      break;
    case Direction.Left:
      let newX = lastElement.x - settings.ELEMENT_RADIUS * 2;
      if (newX <= 0) {
        newX = gameModel.width;
      }
      move({ ...newElement, x: newX }, lastElement);
      break;
    case Direction.Right:
      let newX2 = lastElement.x + settings.ELEMENT_RADIUS * 2;
      if (newX2 >= gameModel.width) {
        newX2 = 0;
      }
      move({ ...newElement, x: newX2 }, lastElement);
      break;
  }
  return gameModel;
}

function move(newElement: Point, lastElement: Point) {
  lastElement.color = settings.COLORS.SNAKE_BODY;
  gameModel.snake.push(newElement);
  if (!pointCollides(lastElement, gameModel.food)) {
    gameModel.snake.shift();
  } else {
    gameModel.food = gameModel.food.filter(
      (element) => !collides(lastElement, element)
    );
  }
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
      x: roundToNearest(
        getRandomInt(
          settings.ELEMENT_RADIUS,
          this.width - settings.ELEMENT_RADIUS
        )
      ),
      y: roundToNearest(
        getRandomInt(
          settings.ELEMENT_RADIUS,
          this.height - settings.ELEMENT_RADIUS
        )
      ),
    };
  }

  createStartSnake(): Point[] {
    return [
      {
        color: settings.COLORS.SNAKE_BODY,
        x: 170,
        y: 170,
      },
      {
        color: settings.COLORS.SNAKE_HEAD,
        x: 170,
        y: 190,
      },
    ];
  }
}

function collides(element: Point, other: Point): boolean {
  return (
    (other.x > element.x - settings.ELEMENT_RADIUS ||
      other.x < element.x + settings.ELEMENT_RADIUS) &&
    (other.y > element.y - settings.ELEMENT_RADIUS ||
      other.y < element.y + settings.ELEMENT_RADIUS)
  );
}

//botsing met rand?
function pointCollides(pointToCompare: Point, elements: Point[]): boolean {
  return elements.some((element) => collides(element, pointToCompare));
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

function roundToNearest(number: number): number {
  return Math.floor(number / settings.ELEMENT_RADIUS) * settings.ELEMENT_RADIUS;
}
