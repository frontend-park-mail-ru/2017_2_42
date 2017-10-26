import Timer from 'easytimer.js';
import {b2Vec2} from '../Box2D/Common/b2Math';
import {b2World} from '../Box2D/Dynamics/b2World';
import {Board} from '../board';
// import EventBus, {default as eventBus} from "./eventBus";
import eventBus from '../../modules/eventBus';
import {GameService} from './gameService';
import {GameState, InitState, LoadState, PrepareState, RunningState} from './gameState';


interface MapMeta {
  id: number;
  name: string;
  level: number;
  timer: number;
  rating: number;
  created: string;
  preview: string;
  players: number;
  playedTimes: number;
}

export type States = 'loadBoards' | 'run' | 'pause' | 'successfulFinish' | 'failedFinish';

export class Game {
  public boards: Board[];
  public info: MapMeta;
  public _world: b2World;
  public timer: Timer;
  public gameService: GameService;
  private state: GameState;
  private canvas: HTMLElement;

  constructor(mapMeta: MapMeta) {
    this.timer = new Timer;
    this.info = mapMeta;
    this._world = new b2World(new b2Vec2(0, 10));
    this.gameService = new GameService();
    this.state = new InitState(this);
  }

  public changeState(state: GameState) {
    this.state = state;
  }

  public load(canvas: HTMLCanvasElement | string): Promise<any> {
    return this.state.onLoad(canvas);
  }

  public prepare(): void {
    this.state.onPrepare();
  }

  public start(): void {
    this.state.onRun();
  }

  getState() {
    return this.state;
  }

  public run(): void {
    if (this.state instanceof RunningState) {
      for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
        let b = body.GetUserData();
        if (b.isDeleted) {
          this._world.DestroyBody(body);
          this.boards.forEach((board) => {
            board._canvas.remove(b.shapes);
          });

        } else {
          b.step();
        }

        this.boards.forEach((board) => {
          board._canvas.renderAll(false);
        });
      }
      this._world.Step(1 / 60, 10, 10);
      this._world.ClearForces();
      requestAnimationFrame(this.run.bind(this));
    } else {
      for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
        this._world.DestroyBody(body);
      }
    }
  }

}
