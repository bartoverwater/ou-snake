import * as model from "../output/model.js";
import { Direction } from "../output/direction.js";
import settings from "../output/game-settings.js";
import QUnit from "qunit";

const WIDTH_HEIGHT = 380;
const MAX_WIDTH_HEIGHT = WIDTH_HEIGHT - settings.STEP;
const MIN_WIDTH_HEIGHT = 0 + settings.ELEMENT_RADIUS;

QUnit.module("Model", {
  beforeEach: function () {
    this.gameModel = model.newModel(WIDTH_HEIGHT, WIDTH_HEIGHT);
    this.startingX = this.gameModel.snake[1].x;
    this.startingY = this.gameModel.snake[1].y;
    this.getHead = () => this.gameModel.snake[this.gameModel.snake.length - 1];
  },
});

QUnit.test("Snake Moves Up", function (assert) {
  this.gameModel.moveSnake(Direction["Up"]);
  assert.equal(this.getHead().x, this.startingX);
  assert.equal(this.getHead().y, this.startingY - settings.STEP);
});

QUnit.test("Snake Moves Left", function (assert) {
  this.gameModel.moveSnake(Direction["Left"]);
  assert.equal(this.getHead().x, this.startingX - settings.STEP);
  assert.equal(this.getHead().y, this.startingY);
});

QUnit.test("Snake Moves Right", function (assert) {
  this.gameModel.moveSnake(Direction["Right"]);
  assert.equal(this.getHead().x, this.startingX + settings.STEP);
  assert.equal(this.getHead().y, this.startingY);
});

QUnit.test("Snake Colliding with itself means gameover", function (assert) {
  this.gameModel.moveSnake(Direction["Down"]);
  assert.true(this.gameModel.gameOver);
});

QUnit.test("The right amount of food gets created", function (assert) {
  assert.equal(this.gameModel.food.length, settings.NUM_FOODS);
});

QUnit.test("Starting food does not collide with anything", function (assert) {
  const anyFoodElementCollides = this.gameModel.food.some((element) => {
    this.gameModel.food.some((secondElement) =>
      element.collidesWith(secondElement)
    );
    this.gameModel.snake.some((snakeElement) =>
      snakeElement.collidesWith(element)
    );
  });
  assert.false(anyFoodElementCollides);
});

QUnit.test("Points on same x and y collide", function (assert) {
  const point1 = new model.Point("", 1, 1);
  const point2 = new model.Point("", 1, 1);
  assert.true(point1.collidesWith(point2));
  assert.true(point2.collidesWith(point1));
});

QUnit.test("Points not on same x and y do not collide", function (assert) {
  const point1 = new model.Point("", 2, 1);
  const point2 = new model.Point("", 1, 2);
  assert.false(point1.collidesWith(point2));
  assert.false(point2.collidesWith(point1));
});

QUnit.test("Food does not get created out of bounds", function (assert) {
  const anyFoodOutsideBounds = this.gameModel.food.some(
    (food) =>
      food.x > MAX_WIDTH_HEIGHT ||
      food.y > MAX_WIDTH_HEIGHT ||
      food.x < MIN_WIDTH_HEIGHT ||
      food.y < MIN_WIDTH_HEIGHT
  );
  assert.false(anyFoodOutsideBounds);
});
