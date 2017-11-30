///<reference path="../../../../node_modules/@types/fabric/index.d.ts"/>
import {b2Vec2} from 'box2d.ts/Box2D/Box2D/Common/b2Math';
import {b2World} from 'box2d.ts/Box2D/Box2D/Dynamics/b2World';
import {Board} from '../board';
import {Body} from '../body';
// import EventBus, {default as eventBus} from "./eventBus";
import {GameService} from './gameService';
import {GameState, InitState, LoadState, PrepareState, RunningState} from './gameState';
import {Message, SnapMessage} from './Message';
import {b2BodyType} from 'box2d.ts/Box2D/Box2D/Dynamics/b2Body';

declare const fabric: any;

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
    get gameService(): GameService {
        return this._gameService;
    }

    get frame(): number {
        return this._frame;
    }

    set frame(value: number) {
        this._frame = value;
    }

    get playerID(): number {
        return this._playerID;
    }

    set playerID(value: number) {
        if (value < 1) {
            throw Error('playerID must be greater 0');
        }
        this._playerID = value;
    }

    private _playerID: number;
    public board: Board;
    public info: any;
    public _world: b2World;
    private _gameService: GameService;
    private state: GameState;
    public _frame: number = 1;

    constructor(mapMeta: MapMeta | object) {
        this.info = {};
        this._world = new b2World(new b2Vec2(0, 10));
        this._world.SetContinuousPhysics(false);

        this._gameService = new GameService(this);
        this.state = new InitState(this);
    }

    public changeState(state: GameState) {
        this.state = state;
    }

    public load(canvas: HTMLCanvasElement | string, id: number) {
        this.info.id = id;
        return this.state.onLoad(canvas);
    }

    public prepare(): void {
        this.state.onPrepare();
    }

    public finish(success: boolean) {
        if (success) {
            this.state.onSuccessFinish();
        } else {
            this.state.onFailedFinish();
        }
    }

    public start(): void {
        this.state.onRun()
            .then(() => this.run());
    }

    getState() {
        return this.state;
    }


    private run(): void {
        if (this.state instanceof RunningState) {
            let data: any = {
                frame: this._frame,
                bodies: [],
            };
            for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
                let b: Body = body.GetUserData();
                if (b.isDeleted) {
                    this._world.DestroyBody(body);
                    this.board.canvas.remove(b.shapes);
                } else {
                    b.update();
                }

                if (this._frame % 2 === 1) {
                    if (body.GetType() === b2BodyType.b2_dynamicBody && !b.isDeleted) {
                        let body_data: any = {};
                        body_data.id = b.ID;
                        body_data.position = body.GetPosition();
                        body_data.angle = body.GetAngle();
                        body_data.linVelocity = body.GetLinearVelocity();
                        body_data.angVelocity = body.GetAngularVelocity();
                        data.bodies.push(body_data);
                    }
                    this.board.canvas.renderAll(false);
                }
            }

            if (this._frame % 2 === 1) {
                let msg: SnapMessage = new SnapMessage(this, data);
                msg.HandleRequest();
            }

            this._world.Step(1 / 60, 10, 10);
            this._world.ClearForces();
            requestAnimationFrame(this.run.bind(this));
            this.frame++;
        } else {
            for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
                this._world.DestroyBody(body);
            }
        }
    }

}