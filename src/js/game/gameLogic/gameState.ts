import {Board} from '../board';
// import b2Listener, {default as MyListener} from "../contactListener";
import MyListener from '../contactListener';
import eventBus from '../eventBus';
import {MovingMessage, SnapMessage} from './Message';
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

    onLoad(canvases: HTMLCanvasElement | string) {
        throw Error('method not implemented');
    }

    onRun(): Promise<any> {
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
        this.game.board.prepare();
    }

    onLoad(canvases: HTMLCanvasElement | string) {
        throw new Error('Method not implemented.');
    }

    onRun(): Promise<any> {
        this.game.changeState(new RunningState(this.game));
        return this.game.getState().onRun();
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

export class InitState extends GameState {
    onInit(): void {
        throw new Error('Method not implemented.');
    }

    onPrepare(): void {
        throw new Error('Method not implemented.');
    }

    onLoad(canvas: HTMLCanvasElement | string) {
        this.game.changeState(new LoadState(this.game));
        this.game.load(canvas, this.game.info.id);
    }

    onRun(): Promise<any> {
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

export class LoadState extends GameState {

    onFailedFinish(): void {
        throw new Error('Method not implemented.');
    }

    onInit(): void {

    }

    onPrepare(): void {
        throw new Error('Method not implemented.');
    }

    onLoad(canvas: HTMLCanvasElement | string) {
        return GameService.loadBoard(canvas, this.game.info.id)
            .then((board) => {
                this.game.board = board as Board;
                this.game.board.canvas.on('object:moving', (option) => {
                    let data: any = {};
                    data.snap = {};
                    data.snap.id = option.target.toObject().id;
                    data.snap.position = {
                        x: option.target.left,
                        y: option.target.top,
                    };
                    data.snap.angle = option.target.angle;
                    let msg: MovingMessage = new MovingMessage(this.game, data);
                    msg.HandleRequest();
                });
                this.game.changeState(new PrepareState(this.game));
                eventBus.emit('game', 'loadSuccess', {});
                this.game.prepare();
            })
            .catch((res) => {
                eventBus.emit('game', 'loadFailed', {});
            });
    }

    onRun(): Promise<any> {
        throw new Error('Method not implemented.');
    }

    onPause(): void {
        throw new Error('Method not implemented.');
    }

    onSuccessFinish(): void {
        throw new Error('Method not implemented.');
    }

}

export class RunningState extends GameState {
    onFailedFinish(): void {
    }

    onInit(): void {
    }

    onPrepare(): void {
        this.game.changeState(new PrepareState(this.game));
        this.game.prepare();
    }

    onLoad() {
        throw new Error('method not implemented');
    }

    onRun(): Promise<any> {

        this.game.board.create(this.game._world);

        this.game._world.SetContactListener(new MyListener(this.game));

        return Promise.resolve();

    }

    onPause(): void {

    }

    onSuccessFinish(): void {

    }

}

export class FinishState extends GameState {
    public success: boolean;

    onInit(): void {
        throw Error('method not implemented');
    }

    onPrepare(): void {
        throw Error('method not implemented');
    }

    onLoad(canvases: HTMLCanvasElement | string) {
        throw Error('method not implemented');
    }

    onRun(): Promise<any> {
        throw Error('method not implemented');
    }

    onPause(): void {
        throw Error('method not implemented');
    }

    onSuccessFinish(): void {
        console.log('SUCCESS FINISH!');
    }

    onFailedFinish(): void {
        throw Error('method not implemented');
    }
}