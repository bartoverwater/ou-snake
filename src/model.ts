export interface Model {
  food: Point[];
  snake: Point[];
}

export class Point {
  color: string;
  x: number;
  y: number;

  constructor(x: number, y: number, color: string) {
    this.color = color;
    this.x = x;
    this.y = y;
  }
}

export GameModel implements Model {
  food: Point[] = [];
  snake: Point[];

  constructor() {
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

  createFood(): Point {
    return {
      color: "Olive",
      x: getRandomInt(0 + 10, 360 - 10),
      y: getRandomInt(0 + 10, 360 - 10),
    };
  }

  createStartSnake(): Point[] {
    return [
      //width and R
      { color: "DarkOrange", x: 360 / 2, y: 360 / 2 },
      { color: "DarkRed", x: 360 / 2, y: 360 / 2 + 10 },
      { color: "DarkRed", x: 360 / 2, y: 360 / 2 + 20 },
      { color: "DarkRed", x: 360 / 2, y: 360 / 2 + 30 },
    ];
  }

  pointCollides(other: Point): boolean {
    const collides = (element: Point): boolean =>
      other.x === element.x && other.y === element.y;
    return this.food.some(collides) && this.snake.some(collides);
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
