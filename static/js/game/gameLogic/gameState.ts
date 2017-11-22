import {Board} from '../board';
// import b2Listener, {default as MyListener} from "../contactListener";
import MyListener from '../contactListener';
import eventBus from '../../modules/eventBus';
import {Game} from './game';
import {GameService} from './gameService';


export abstract class GameState {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  onInit(): void {
    throw Error('method not implemented');
  }

  onPrepare(): void {
    throw Error('method not implemented');
  }

  onLoad(canvases: HTMLCanvasElement | string): Promise<any> {
    throw Error('method not implemented');
  }

  onRun(): void {
    throw Error('method not implemented');
  }

  onPause(): void {
    throw Error('method not implemented');
  }

  onSuccessFinish(): void {
    throw Error('method not implemented');
  }

  onFailedFinish(): void {
    throw Error('method not implemented');
  }
}

export class PrepareState extends GameState {

  onInit(): void {

  }

  onPrepare(): void {
    this.game.boards.forEach((board) => {
      board.prepare();
    });
  }

  onLoad(canvases: HTMLCanvasElement | string): Promise<any> {
    return Promise.reject('Method not implemented.');
  }

  onRun(): void {
    this.game.changeState(new RunningState(this.game));
    this.game.getState().onRun();
  }

  onPause(): void {
    throw new Error('Method not implemented.');
  }

  onSuccessFinish(): void {
    throw new Error('Method not implemented.');
  }

  onFailedFinish(): void {
    throw new Error('Method not implemented.');
  }
}

export class LoadState extends GameState {

  onInit(): void {

  }

  onPrepare(): void {
    throw new Error('Method not implemented.');
  }

  onLoad(canvas: HTMLCanvasElement | string): Promise<any> {
    return GameService.loadBoards(canvas)
      .then(boards => {
        this.game.boards = boards as Board[];
        this.game.changeState(new PrepareState(this.game));
        eventBus.emit('game', 'endLoadBoards', {});
        this.game.prepare();
      });
  }

  onRun(): void {
    throw new Error('Method not implemented.');
  }

  onPause(): void {
    throw new Error('Method not implemented.');
  }

  onSuccessFinish(): void {
    throw new Error('Method not implemented.');
  }

  onFailedFinish(): void {
    throw new Error('Method not implemented.');
  }

}

export class RunningState extends GameState {
  onInit(): void {
  }

  onPrepare(): void {
    this.game.changeState(new PrepareState(this.game));
    this.game.prepare();
  }

  onLoad(): Promise<any> {
    return Promise.reject('');
  }

  onRun(): void {
    // this.game.changeState(new RunningState(this.game));
    eventBus.on('game', 'finish', () => {
      eventBus.emit('game', 'win', {});
    });

    this.game.boards.forEach((board) => {
      board.create(this.game._world);
    });

    this.game._world.SetContactListener(MyListener);

    // setTimeout(()=>{eventBus.emit('game', 'lose', {})}, this.game.info.timer);

    // this.game.timer.addEventListener(<any>'targetAchieved', () => {
    //   eventBus.emit('game', 'lose', {});
    //   this.game.prepare();
    // });

    this.game.run();
  }

  onPause(): void {

  }

  onSuccessFinish(): void {

  }

  onFailedFinish(): void {
  }

}

export class InitState extends GameState {
  onInit(): void {
    throw new Error('Method not implemented.');
  }

  onPrepare(): void {
    throw new Error('Method not implemented.');
  }

  onLoad(canvas: HTMLCanvasElement | string): Promise<any> {
    this.game.changeState(new LoadState(this.game));
    return this.game.load(canvas);
    // throw new Error('Method not implemented.');
  }

  onRun(): void {
    throw new Error('Method not implemented.');
  }

  onPause(): void {
    throw new Error('Method not implemented.');
  }

  onSuccessFinish(): void {
    throw new Error('Method not implemented.');
  }

  onFailedFinish(): void {
    throw new Error('Method not implemented.');
  }


}
