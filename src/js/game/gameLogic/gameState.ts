import eventBus from '../../modules/eventBus';
import {Board} from '../board/board';
// import b2Listener, {default as MyListener} from "../contactListener";
import {ListenerOffline, ListenerOnline} from '../contactListener';
import {MovingMessage, SnapMessage} from './Message';
import {GameOffline} from './gameOffline';
import {Game, GameOnline} from './gameOnline';
import {GameEvents} from './gameOnline';
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

    onLoad(canvases: HTMLCanvasElement | string): void {
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
        this.game.board.prepare();
    }

    onLoad(canvases: HTMLCanvasElement | string): void {
        throw Error('method not implemented');
    }

    onRun(): void {
        this.game.state = new RunningState(this.game);
        return this.game.state.onRun();
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

    onLoad(canvas: HTMLCanvasElement | string): void {
        this.game.state = new LoadState(this.game);
        this.game.load(canvas);
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

export class LoadState extends GameState {

    onFailedFinish(): void {
        throw new Error('Method not implemented.');
    }

    onInit(): void {

    }

    onPrepare(): void {
        throw new Error('Method not implemented.');
    }

    onLoad(canvas: HTMLCanvasElement | string): void {
        this.game.gameService.loadBoard(canvas, this.game.meta.id)
            .then((board: Board) => {
                eventBus.emit('game', <string>GameEvents.loadSuccess, {});
                this.game.board = board;
                this.game.state = new PrepareState(this.game);
                this.game.prepare();
            })
            .catch((res) => {
                console.log(res);
                eventBus.emit('game', <string>GameEvents.loadFailed, {});
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

}

export class RunningState extends GameState {
    onFailedFinish(): void {
    }

    onInit(): void {
    }

    onPrepare(): void {
        this.game.state = new PrepareState(this.game);
        this.game.prepare();
    }

    onLoad(): void {
        throw new Error('method not implemented');
    }

    onRun(): void {
        this.game.board.create(this.game._world);
        if (this.game instanceof GameOnline) {
            this.game._world.SetContactListener(new ListenerOnline(this.game));
        } else {
            this.game._world.SetContactListener(new ListenerOffline(this.game));
        }
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
        this.game.running = false;
        console.log('SUCCESS FINISH!');
    }

    onFailedFinish(): void {
        throw Error('method not implemented');
    }
}
