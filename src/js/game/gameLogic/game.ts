import {b2Vec2} from '../Box2D/Common/b2Math';
import {b2World} from '../Box2D/Dynamics/b2World';
import {Board} from '../board';
import {BucketBody, CircleBody} from '../body';
// import EventBus, {default as eventBus} from "./eventBus";
import eventBus from '../eventBus';
import {GameService} from './gameService';
import {GameState, InitState, LoadState, PrepareState, RunningState} from './gameState';
import {Message} from './Message';


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
    get playerID(): number {
        return this._playerID;
    }

    set playerID(value: number) {
        this._playerID = value;
    }

    private _playerID: number;
    public board: Board;
    public info: MapMeta;
    public _world: b2World;
    public gameService: GameService;
    private state: GameState;
    private frame: number = 1;

    constructor(mapMeta: MapMeta | object) {
        // this.info = mapMeta;
        this._world = new b2World(new b2Vec2(0, 10));
        this.gameService = new GameService(this);
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
        this.state.onRun()
            .then(() => this.run());
    }

    getState() {
        return this.state;
    }


    private run(): void {
        if (this.state instanceof RunningState) {
            for (let body = this._world.GetBodyList(); body.GetNext() !== null; body = body.GetNext()) {
                let b = body.GetUserData();
                if (b.isDeleted) {
                    this._world.DestroyBody(body);
                    this.board._canvas.remove(b.shapes);
                } else {
                    b.step();
                }
                if ((b instanceof CircleBody || b instanceof BucketBody) && !b.isDeleted) {
                    let data: any = {
                        class: 'SnapMessage',
                        frame: this.frame++,
                        bodies: [],
                    };
                    // body.ResetMassData();
                    let body_data: any = {};
                    body_data.id = b.ID;
                    body_data.position = body.GetPosition();
                    body_data.angle = body.GetAngle();
                    body_data.velocity = body.GetLinearVelocity();
                    data.bodies.push(body_data);
                    this.gameService.sendSocketMessage(data);
                    console.log('my' + JSON.stringify(data));
                }
                this.board._canvas.renderAll(false);
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
