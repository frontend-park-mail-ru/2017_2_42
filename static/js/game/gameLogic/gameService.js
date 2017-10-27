'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
require('fabric');
const Box2D_1 = require('../Box2D/Box2D');
const board_1 = require('../board');
const body_1 = require('../body');

class GameService {
  static loadBoards(canvases) {
    let canvas = new fabric.Canvas(canvases[0]);
    let groundDown = new body_1.RectBody(new Box2D_1.b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 5), 0, new Box2D_1.b2Vec2(canvas.getWidth(), 10), {}, 0 /* b2_staticBody */);
    let groundRight = new body_1.RectBody(new Box2D_1.b2Vec2(canvas.getWidth() - 5, canvas.getHeight() / 2), 0, new Box2D_1.b2Vec2(10, canvas.getHeight()), {}, 0 /* b2_staticBody */);
    let groundLeft = new body_1.RectBody(new Box2D_1.b2Vec2(5, canvas.getHeight() / 2), 0, new Box2D_1.b2Vec2(10, canvas.getHeight()), {}, 0 /* b2_staticBody */);
    // let groundDown = new RectBody(new b2Vec2(500, 700), 0, new b2Vec2(1200, 10), {}, b2BodyType.b2_staticBody);
    let circle = new body_1.CircleBody(new Box2D_1.b2Vec2(550, 100), 20, {
      restitution: 0.5,
      collision: true,
    });
    let leftRect = new body_1.RectBody(new Box2D_1.b2Vec2(500, 400), 30, new Box2D_1.b2Vec2(200, 20), {
      restitution: 0.5,
      color: 'green',
      opacity: 0.5,
      collision: false,
      selectable: true,
    }, 0 /* b2_staticBody */);
    let rightRect = new body_1.RectBody(new Box2D_1.b2Vec2(canvas.getWidth() - 500, 400), -30, new Box2D_1.b2Vec2(200, 20), {
      restitution: 0.5,
      color: 'green',
      opacity: 0.5,
      collision: false,
      selectable: true,
    }, 0 /* b2_staticBody */);
    let bucket = new body_1.BucketBody(new Box2D_1.b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 60), {color: 'green'}, 2 /* b2_dynamicBody */);
    let square = new body_1.RectBody(new Box2D_1.b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 35), 0, new Box2D_1.b2Vec2(50, 50), {
      sensor: true,
      collision: true,
      color: 'blue',
      selectable: false,
    }, 0 /* b2_staticBody */);
    let board = new board_1.Board([groundLeft, groundRight, groundDown, circle, leftRect, rightRect, square, bucket], canvas);
    return Promise.resolve([board]);
  }
}

exports.GameService = GameService;
//# sourceMappingURL=gameService.js.map