import { Game } from './game';
import { b2Vec2 } from 'box2d.ts/Box2D/Box2D/Common/b2Math';
import { RunningState } from './gameState';
import { PIXEL_TO_METERS } from '../body';
/**
 * Created by zwirec on 20.11.17.
 */

export enum Messages {
    BoardMessage = 'BoardMessage',
    MovingMessage = 'MovingMessage',
    SnapMessage = 'SnapMessage',
    StartedMessage = 'StartedMessage',
    SubscribeMessage = 'SubscribeMessage',
    StartMessage = 'StartMessage',
    FinishMessage = 'FinishMessage',
}

export abstract class Message {
    protected game: Game;
    protected class: Messages;

    static Create(game: Game, msg: string): Message {
        let message;
        try {
            message = JSON.parse(msg);
        } catch (err) {
            console.error(err);
        }
        if (message && message.class === Messages.MovingMessage) {
            return new MovingMessage(game, message);
        } else if (message && message.class === Messages.BoardMessage) {
            return new BoardMessage(game, message);
        } else if (message && message.class === Messages.StartedMessage) {
            return new StartedMessage(game, message);
        } else if (message && message.class === Messages.SnapMessage) {
            return new SnapMessage(game, message);
        } else if (message && message.class === Messages.FinishMessage) {
            return new FinishMessage(game, message);
        }
    }

    abstract HandleResponse();

    abstract HandleRequest();
}


export class BoardMessage extends Message {
    HandleRequest() {
        throw new Error('Method not implemented.');
    }

    private playerID: number;

    constructor(game: Game, messageObj: any) {
        super();
        this.game = game;
        this.playerID = messageObj.playerID;
    }

    HandleResponse() {
        this.game.playerID = this.playerID;
        console.log('BoardMessage recieve');
    }
}

export class SubscribeMessage extends Message {
    private board: number;

    constructor(game: Game, messageObj: any) {
        super();
        this.game = game;
        this.class = Messages.SubscribeMessage;
        this.board = messageObj.board;
    }

    HandleRequest() {
        throw new Error('Method not implemented.');
    }

    HandleResponse() {

    }
}

interface Snap {
    id: number;
    position: b2Vec2;
    angle: number;
}

export class MovingMessage extends Message {
    HandleRequest() {
    }

    private snap: Snap;

    HandleResponse() {
        this.game.playerID = this.playerID;
        this.game.board.bodies.get(this.snap.id).shapes.set('left', this.snap.position.x);
        this.game.board.bodies.get(this.snap.id).shapes.set('top', this.snap.position.y);
        this.game.board.bodies.get(this.snap.id).shapes.set('angle', this.snap.angle);
        this.game.board.bodies.get(this.snap.id).shapes.setCoords();
        this.game.board._canvas.renderAll();
    }

    private playerID: number;

    constructor(game: Game, messageObj: any) {
        super();
        this.game = game;
        this.snap = messageObj.snap;
    }
}

export interface Frame {
    id?: number;
    position?: b2Vec2;
    angle?: number;
    velocity?: b2Vec2;
}

type Frames = Frame[];

export class StartMessage extends Message {
    private frames: Frames = [];

    constructor(game: Game) {
        super();
        this.game = game;
        this.class = Messages.StartMessage;
    }

    HandleRequest() {
        this.game.board.bodies.forEach((body) => {
            let frame: Frame = {};
            frame.id = body.ID;
            frame.position = body.position.Clone();
            frame.position.x *= PIXEL_TO_METERS;
            frame.position.y *= PIXEL_TO_METERS;
            frame.angle = body.angle;
            this.frames.push(frame);
        });
        let message = { class: this.class, bodies: [] };
        console.log(message);
        this.game.gameService.sendSocketMessage(message);
    }

    HandleResponse() {
    }

}

export class StartedMessage extends Message {

    constructor(game: Game, messageObj: any) {
        super();
        this.game = game;
        this.class = Messages.StartedMessage;
        console.log(messageObj);
    }

    HandleRequest() {

    }

    HandleResponse() {
        this.game.changeState(new RunningState(this.game));
        this.game.start();
    }

}

export class SnapMessage extends Message {
    private message;

    constructor(game: Game, messageObj: any) {
        super();
        this.game = game;
        this.class = Messages.SnapMessage;
        this.message = messageObj;
    }

    HandleRequest() {

    }

    HandleResponse() {
        console.log(this.message);
    }

}

export class FinishMessage extends Message {
    private message;

    constructor(game: Game, messageObj: any) {
        super();
        this.game = game;
        this.class = Messages.FinishMessage;
        this.message = messageObj;
    }

    HandleRequest() {

    }

    HandleResponse() {
        console.log(this.message);
    }

}
