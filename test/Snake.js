import * as model from "../output/model.js";
import { Direction } from "../output/direction.js";
import settings from "../output/game-settings.js";
import QUnit from "qunit";

QUnit.module("Snake", {
  beforeEach: function () {
    this.gameModel = model.newModel(380, 380);
    this.startingX = this.gameModel.snake[1].x;
    this.startingY = this.gameModel.snake[1].y;
  },
});

QUnit.test("Snake Moves Up", function (assert) {
  this.gameModel.moveSnake(Direction["Up"]);
  assert.equal(this.gameModel.snake[1].x, this.startingX);
  assert.equal(this.gameModel.snake[1].y, this.startingY - settings.STEP);
});

QUnit.test("Snake Moves Left", function (assert) {
  this.gameModel.moveSnake(Direction["Left"]);
  assert.equal(this.gameModel.snake[1].x, this.startingX - settings.STEP);
  assert.equal(this.gameModel.snake[1].y, this.startingY);
});

QUnit.test("Snake Moves Right", function (assert) {
  this.gameModel.moveSnake(Direction["Right"]);
  assert.equal(this.gameModel.snake[1].x, this.startingX + settings.STEP);
  assert.equal(this.gameModel.snake[1].y, this.startingY);
});

QUnit.test("Snake Colliding with itself means gameover", function (assert) {
  this.gameModel.moveSnake(Direction["Down"]);
  assert.true(this.gameModel.gameOver);
});
