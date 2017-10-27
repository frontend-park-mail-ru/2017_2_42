'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
// import b2Listener, {default as MyListener} from "../contactListener";
const contactListener_1 = require('../contactListener');
const eventBus_1 = require('../eventBus');
const gameService_1 = require('./gameService');

class GameState {
  constructor(game) {
    this.game = game;
  }

  onInit(canvases) {
    throw Error('method not implemented');
  }

  onPrepare() {
    throw Error('method not implemented');
  }

  onLoad(canvases) {
    throw Error('method not implemented');
  }

  onRun() {
    throw Error('method not implemented');
  }

  onPause() {
    throw Error('method not implemented');
  }

  onSuccessFinish() {
    throw Error('method not implemented');
  }

  onFailedFinish() {
    throw Error('method not implemented');
  }
}

exports.GameState = GameState;

class PrepareState extends GameState {
  onInit(canvases) {
  }

  onPrepare() {
    this.game.boards.forEach((board) => {
      board.prepare();
    });
  }

  onLoad(canvases) {
    return Promise.reject('Method not implemented.');
  }

  onRun() {
    this.game.changeState(new RunningState(this.game));
    this.game.getState().onRun();
  }

  onPause() {
    throw new Error('Method not implemented.');
  }

  onSuccessFinish() {
    throw new Error('Method not implemented.');
  }

  onFailedFinish() {
    throw new Error('Method not implemented.');
  }
}

exports.PrepareState = PrepareState;

class LoadState extends GameState {
  onInit() {
  }

  onPrepare() {
    throw new Error('Method not implemented.');
  }

  onLoad(canvas) {
    return gameService_1.GameService.loadBoards(canvas)
      .then(boards => {
        this.game.boards = boards;
        this.game.changeState(new PrepareState(this.game));
        eventBus_1.default.emit('game', 'endLoadBoards', {});
        this.game.prepare();
      });
  }

  onRun() {
    throw new Error('Method not implemented.');
  }

  onPause() {
    throw new Error('Method not implemented.');
  }

  onSuccessFinish() {
    throw new Error('Method not implemented.');
  }

  onFailedFinish() {
    throw new Error('Method not implemented.');
  }
}

exports.LoadState = LoadState;

class RunningState extends GameState {
  onInit(canvases) {
  }

  onPrepare() {
    this.game.changeState(new PrepareState(this.game));
    this.game.prepare();
  }

  onLoad() {
    return Promise.reject('');
  }

  onRun() {
    // this.game.changeState(new RunningState(this.game));
    eventBus_1.default.on('game', 'finish', () => {
      this.game.timer.stop();
      eventBus_1.default.emit('game', 'win', {time: this.game.timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])});
    });
    this.game.boards.forEach((board) => {
      board.create(this.game._world);
    });
    this.game._world.SetContactListener(contactListener_1.default);
    this.game.timer.start({
      startValues: {seconds: 5, precision: 'secondTenths'},
      countdown: true,
    });
    this.game.timer.addEventListener('secondTenthsUpdated', () => {
      console.log(this.game.timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']) + '\n');
    });
    this.game.timer.addEventListener('targetAchieved', () => {
      eventBus_1.default.emit('game', 'lose', {});
      this.game.prepare();
    });
    this.game.run();
  }

  onPause() {
  }

  onSuccessFinish() {
  }

  onFailedFinish() {
  }
}

exports.RunningState = RunningState;

class InitState extends GameState {
  onInit(canvases) {
    throw new Error('Method not implemented.');
  }

  onPrepare() {
    throw new Error('Method not implemented.');
  }

  onLoad(canvas) {
    this.game.changeState(new LoadState(this.game));
    return this.game.load(canvas);
    // throw new Error('Method not implemented.');
  }

  onRun() {
    throw new Error('Method not implemented.');
  }

  onPause() {
    throw new Error('Method not implemented.');
  }

  onSuccessFinish() {
    throw new Error('Method not implemented.');
  }

  onFailedFinish() {
    throw new Error('Method not implemented.');
  }
}

exports.InitState = InitState;
//# sourceMappingURL=gameState.js.map