import 'fabric';
import {b2Vec2} from 'box2d.ts/Box2D/Box2D/Box2D';
import {Board} from '../board';
import {
    Body, BucketBody, BucketConfig, CircleBody, CircleBucketBody, KeyBodies, METERS_TO_PIXEL, Options, PIXEL_TO_METERS,
    RectBody,
} from '../body';
import {Message} from './Message';
import {Game} from './game';
import eventBus from '../eventBus';

declare const fabric: any;

const PATH_GET_MAP = 'https://194.87.110.17/backend/api/game/map/';
const PATH_WEBSOCKET = 'wss://194.87.110.17/backend/handler';

export class GameService {
    private socket: WebSocket;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.socket = new WebSocket(PATH_WEBSOCKET);
        this._initWebSocket();
    }

    private _initWebSocket(): void {
        this.socket.onmessage = ev => {
            this.handleSocketResponse(ev);
        };
        this.socket.onclose = event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
    }

    public sendSocketMessage(message: string | Object) {
        if (this.socket.readyState === WebSocket.OPEN) {
            if (message instanceof Object) {
                this.socket.send(JSON.stringify(message));
            } else {
                this.socket.send(message);
            }
        } else {
            this.socket = new WebSocket(PATH_WEBSOCKET);
            this.socket.onopen = ev => {
                this._initWebSocket();
                this.sendSocketMessage(message);
            };
        }

    }

    public handleSocketResponse(ev: MessageEvent) {
        let message: Message = Message.Create(this.game, ev.data);
        message.HandleResponse();
    }

    static async loadBoard(canvas: HTMLCanvasElement | string, id: number): Promise<any> {
        let cvs: fabric.Canvas = new fabric.Canvas(canvas);

        let bodies: Map<number, Body> = new Map<number, Body>();

        let json;
        let resp;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        try {
            resp = await fetch(PATH_GET_MAP + id, {
                method: 'GET',
                headers: headers,
            });
        }
        catch (e) {
            console.log('Network pizdec');
            return Promise.reject({});
        }
        try {
            json = await resp.json();
        } catch (e) {
            console.log(e);
            return Promise.reject({});
        }

        for (let body of json.bodies) {
            let options: Options = {};
            options = body.data.options;
            options.selectable = body.selectable;
            options.bodyType = body.data.type;
            options.key = body.data.options.keyBodyID;
            switch (body.kind) {
                case 'rect':
                    let rect = new RectBody(
                        b2Vec2.MulVS(body.data.position, METERS_TO_PIXEL, new b2Vec2()),
                        fabric.util.radiansToDegrees(body.data.angle),
                        b2Vec2.MulVS(body.data.size, METERS_TO_PIXEL, new b2Vec2()),
                        options);
                    rect.ID = body.id;
                    bodies.set(body.id, rect);
                    break;
                case 'circle':
                    let circle = new CircleBody(
                        b2Vec2.MulVS(body.data.position, METERS_TO_PIXEL, new b2Vec2()),
                        body.data.radius * METERS_TO_PIXEL,
                        options);
                    circle.ID = body.id;
                    bodies.set(body.id, circle);
                    break;
                case 'bucket':
                    let config: BucketConfig = {};
                    config = body.data.config;
                    config.bottomLength *= METERS_TO_PIXEL;
                    config.height *= METERS_TO_PIXEL;
                    config.wallThickness *= METERS_TO_PIXEL;
                    let bucket = new BucketBody(
                        b2Vec2.MulVS(body.data.position, METERS_TO_PIXEL, new b2Vec2()),
                        config,
                        options);
                    bodies.set(body.id, bucket);
                    break;
            }
        }
        let board = new Board(bodies, cvs);
        eventBus.emit('game', 'loadSuccess', {});
        return Promise.resolve(board);
    }
}