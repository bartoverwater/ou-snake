import { Direction } from "./direction.js";
import * as view from "./view.js";
import * as model from "./model.js";
import settings from "./game-settings.js";

// let snake: Snake;
// const foods: Food[] = []; // voedsel voor de slang
// let width: number; // breedte van het tekenveld
// let height: number; // hoogte van het tekenveld
// let xMax: number; // maximale waarde van x = width - R
// let yMax: number; // maximale waarde van y = height - R
// let direction = Direction.Up;

/**
  @function init() -> void
  @desc Haal eventueel bestaand voedsel en een bestaande slang weg, cre\"eer een slang, genereer voedsel, en teken alles
*/
const init = () => {
  model.newGame();
  view.onDirectionChanged(changeDirection);
  eventLoop();
};

const eventLoop = () => {
  if (model.gameOver) {
    return;
  }
  setTimeout(() => {
    model.moveSnake();
    view.drawModelOnCanvas(model.gameModel);
    eventLoop();
  }, settings.SLEEPTIME);
};

const changeDirection = (newDirection: Direction) => {
  model.changeDirection(newDirection);
};

export class Presenter {
  load(): void {
    view.onStartButtonClicked(init);
  }
}

// /**
//   @function move(direction) -> void
//   @desc Beweeg slang in aangegeven richting
//         tenzij slang uit canvas zou verdwijnen
//   @param   {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
// */
// function move(direction: Direction) {
//   if (snake.canMove(direction)) {
//     snake.doMove(direction);
//     draw();
//   } else {
//     console.log("snake cannot move " + direction);
//   }
// }

// /**
//   @function draw() -> void
//   @desc Teken de slang en het voedsel
// */
// function draw() {
//   const canvas = $("#mySnakeCanvas");
//   /* in te vullen */
// }
// /***************************************************************************
//  **                 Constructors                                          **
//  ***************************************************************************/
// /**
//    @constructor Snake
//    @param {[Element] segments een array met aaneengesloten slangsegmenten
//                    Het laatste element van segments wordt de kop van de slang
// */
// function SnakeOud(segments) {
//   /* in te vullen */
// }
// /**
//    @constructor Element
//    @param radius straal
//    @param {number} x x-coordinaat middelpunt
//    @param {number} y y-coordinaat middelpunt
//    @param {string} color kleur van het element
// */
// function Element(radius, x, y, color) {
//   /* in te vullen */
// }
// /***************************************************************************
//  **                 Hulpfuncties                                          **
//  ***************************************************************************/

// /**
//   @function createStartSnake() -> Snake
//   @desc Slang creëren, bestaande uit  twee segmenten,
//         in het midden van het veld
//   @return: slang volgens specificaties
// */
// function createStartSnake() {
//   const segments: number[] = [
//     createSegment(R + width / 2, R + height / 2),
//     createSegment(R + width / 2, height / 2 - R),
//   ];
//   snake = new Snake(segments);
// }
// /**
//   @function createSegment(x,y) -> Element
//   @desc Slangsegment creeren op een bepaalde plaats
//   @param {number} x x-coordinaat middelpunt
//   @param {number} y y-coordinaart middelpunt
//   @return: {Element} met straal R en color SNAKE
// */
// function createSegment(x, y) {
//   return new Element(R, x, y, SNAKE);
// }
// /**
//   @function createFood(x,y) -> Element
//   @desc Voedselelement creeren op een bepaalde plaats
//   @param {number} x x-coordinaat middelpunt
//   @param {number} y y-coordinaart middelpunt
//   @return: {Element} met straal R en color FOOD
// */
// function createFood(x, y) {
//   return new Element(R, x, y, FOOD);
// }
// /**
//   @function drawElement(element, canvas) -> void
//   @desc Een element tekenen
//   @param {Element} element een Element object
//   @param  {dom object} canvas het tekenveld
// */
// function drawElement(element, canvas) {
//   canvas.drawArc({
//     draggable: false,
//     fillStyle: element.color,
//     x: element.x,
//     y: element.y,
//     radius: element.radius,
//   });
// }

// /**
//   @function getRandomInt(min: number, max: number) -> number
//   @desc Creeren van random geheel getal in het interval [min, max]
//   @param {number} min een geheel getal als onderste grenswaarde
//   @param {number} max een geheel getal als bovenste grenswaarde (max > min)
//   @return {number} een random geheel getal x waarvoor geldt: min <= x <= max
// */
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// /**
//   @function createFoods() -> array met food
//   @desc [Element] array van random verdeelde voedselpartikelen
//   @return [Element] array met food
// */
// function createFoods() {
//   var i = 0,
//     food;
//   //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
//   while (i < NUMFOODS) {
//     food = createFood(
//       XMIN + getRandomInt(0, xMax),
//       YMIN + getRandomInt(0, yMax)
//     );
//     if (
//       !food.collidesWithOneOf(snake.segment) &&
//       !food.collidesWithOneOf(foods)
//     ) {
//       foods.push(food);
//       i++;
//     }
//   }
// }
