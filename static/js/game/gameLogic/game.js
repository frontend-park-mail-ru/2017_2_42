'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const easytimer_js_1 = require('easytimer.js');
const b2Math_1 = require('../Box2D/Common/b2Math');
const b2World_1 = require('../Box2D/Dynamics/b2World');
const gameService_1 = require('./gameService');
const gameState_1 = require('./gameState');

class Game {
  constructor() {
    this.timer = new easytimer_js_1.default;
    this._world = new b2World_1.b2World(new b2Math_1.b2Vec2(0, 10));
    this.gameService = new gameService_1.GameService();
    this.state = new gameState_1.InitState(this);
  }

  changeState(state) {
    this.state = state;
  }

  load(mapMeta, canvas) {
    this.info = mapMeta;
    return this.state.onLoad(canvas);
  }

  prepare() {
    this.state.onPrepare();
  }

  start() {
    this.state.onRun();
  }

  getState() {
    return this.state;
  }

  run() {
    if (this.state instanceof gameState_1.RunningState) {
      for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
        let b = body.GetUserData();
        if (b.isDeleted) {
          this._world.DestroyBody(body);
          this.boards.forEach((board) => {
            board._canvas.remove(b.shapes);
          });
        }
        else {
          b.step();
        }
        this.boards.forEach((board) => {
          board._canvas.renderAll(false);
        });
      }
      this._world.Step(1 / 60, 10, 10);
      this._world.ClearForces();
      requestAnimationFrame(this.run.bind(this));
    }
    else {
      for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
        this._world.DestroyBody(body);
      }
    }
  }
}

exports.Game = Game;
//# sourceMappingURL=game.js.map