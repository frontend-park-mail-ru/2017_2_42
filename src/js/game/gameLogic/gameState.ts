import {Board} from '../board';
// import b2Listener, {default as MyListener} from "../contactListener";
import MyListener from '../contactListener';
import eventBus from '../eventBus';
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

    onLoad(canvases: HTMLCanvasElement | string): Promise<any> {
        return Promise.reject('Method not implemented.');
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

export class LoadState extends GameState {

    onInit(): void {

    }

    onPrepare(): void {
        throw new Error('Method not implemented.');
    }

    onLoad(canvas: HTMLCanvasElement | string): Promise<any> {
        return GameService.loadBoard(canvas)
            .then(board => {
                this.game.board = board as Board;
                this.game.board._canvas.on('object:moving', (option) => {
                    let data: any = {};
                    data.class = 'MovingMessage';
                    data.snap = {};
                    data.snap.id = option.target.toObject().id;
                    data.snap.position = {x: option.target.left, y: option.target.top};
                    data.snap.angle = option.target.angle;
                    this.game.gameService.sendSocketMessage(data);
                });
                this.game.changeState(new PrepareState(this.game));
                eventBus.emit('game', 'endLoadBoards', {});
                this.game.prepare();
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

    onRun(): Promise<any> {

        this.game.board.create(this.game._world);

        this.game._world.SetContactListener(new MyListener(this.game));

        return Promise.resolve();

        // fetch('http://194.87.110.17/backend/api/game/map/15/init', {
        //     method: 'GET',
        //     mode: 'cors',
        //     credentials: 'include',
        //     headers: {'Content-Type': 'application/json'},
        //     // body: JSON.stringify({login: 'sss', password: '123456'}),
        // }).then(resp => {
        //     setTimeout(() => {
        //     }, 1000);
        // });
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