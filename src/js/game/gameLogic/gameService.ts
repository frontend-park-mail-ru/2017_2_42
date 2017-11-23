import 'fabric';
import {b2Vec2} from 'box2d.ts/Box2D/Box2D/Box2D';
import {b2BodyType} from 'box2d.ts/Box2D/Box2D/Dynamics/b2Body';
import {Board} from '../board';
import {
    Body, BucketBody, BucketConfig, CircleBody, CircleBucketBody, KeyBodies, METERS_TO_PIXEL, Options, PIXEL_TO_METERS,
    RectBody,
} from '../body';
import {Message} from './Message';
import {Game} from './game';

declare const fabric: any;

export class GameService {
    private socket: WebSocket;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.socket = new WebSocket('ws://194.87.110.17/backend/handler');
        this.socket.onmessage = ev => {
            this.handleSocketResponse(ev);
        };
        this.socket.onclose = event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения'); // например, "убит" процесс сервера
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };
    }

    public sendSocketMessage(message: string | Object) {
        if (this.socket.readyState !== 3) {
            if (message instanceof Object) {
                this.socket.send(JSON.stringify(message));
            } else {
                this.socket.send(message);
            }
        } else {
            this.socket = new WebSocket('ws://194.87.110.17/backend/handler');
            this.socket.onopen = ev => {
                if (message instanceof Object) {
                    this.socket.send(JSON.stringify(message));
                } else {
                    this.socket.send(message);
                }
            };
        }

    }

    public handleSocketResponse(ev: MessageEvent) {
        let message: Message = Message.Create(this.game, ev.data);
        message.HandleResponse();
    }

    static createMap(canvases: HTMLCanvasElement | string): Board {
        let canvas = new fabric.Canvas(canvases);
        let bodies: Body[] = [];
        let groundDown = new RectBody(
            new b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 5),
            0,
            new b2Vec2(canvas.getWidth(), 10),
            {
                key: KeyBodies.NOT_KEY_BODY,
            },
        );
        bodies.push(groundDown);
        let groundRight = new RectBody(
            new b2Vec2(canvas.getWidth() - 5, canvas.getHeight() / 2),
            0,
            new b2Vec2(10, canvas.getHeight()),
            {
                key: KeyBodies.NOT_KEY_BODY,
            });
        bodies.push(groundRight);
        let groundLeft = new RectBody(
            new b2Vec2(5, canvas.getHeight() / 2),
            0,
            new b2Vec2(10, canvas.getHeight()),
            {
                key: KeyBodies.NOT_KEY_BODY,
            },
        );
        bodies.push(groundLeft);
        let circle = new CircleBody(new b2Vec2(550, 100), 20, {
            bodyType: b2BodyType.b2_dynamicBody,
            restitution: 0.5,
            collision: true,
            key: KeyBodies.KEY_BODY_1,
        });
        bodies.push(circle);

        let leftRect = new RectBody(new b2Vec2(500, 400), 30, new b2Vec2(200, 20), {
            restitution: 0.5,
            color: 'green',
            opacity: 0.5,
            collision: false,
            selectable: true,
            key: KeyBodies.NOT_KEY_BODY,
        });
        bodies.push(leftRect);
        let rightRect = new RectBody(new b2Vec2(canvas.getWidth() - 500, 400), -30, new b2Vec2(200, 20), {
            restitution: 0.5,
            color: 'green',
            opacity: 0.5,
            collision: false,
            selectable: true,
            key: KeyBodies.NOT_KEY_BODY,
        });
        bodies.push(rightRect);
        let bucket = new BucketBody(
            new b2Vec2(canvas.getWidth() / 2,
                canvas.getHeight() - 120),
            {
                wallThickness: 20,
                bottomLength: 100,
                height: 200,
            },
            {
                bodyType: b2BodyType.b2_dynamicBody,
                color: 'green',
                key: KeyBodies.KEY_BODY_1,
                sensor: true,
            });
        bodies.push(bucket);
        // let bucket1 = new BucketBody(
        //     new b2Vec2(canvas.getWidth() / 4,
        //         canvas.getHeight() - 120),
        //     {
        //         wallThickness: 20,
        //         bottomLength: 100,
        //         height: 200,
        //     },
        //     {
        //         bodyType: b2BodyType.b2_dynamicBody,
        //         color: 'green',
        //         key: KeyBodies.KEY_BODY_1,
        //         sensor: true,
        //     });
        // bodies.push(bucket1);

        let meta = {
            'level': 3,
            'timer': 60,
            'preview': 'localhost',
            'players': 2,
        };

        let obj: any = {
            bodies: [],
            joints: [],
        };

        bodies.forEach((body, index, array) => {
            let info: any = {};
            info.id = index;
            info.kind = body.getKind();
            info.playerID = body.owner;
            info.selectable = body.initOptions.selectable;
            info.data = body.toJSON();
            obj.bodies.push(info);
        });

        let body = {meta: meta, data: obj};

        const header = new Headers();
        header.append('Content-Type', 'application/json');

        fetch('http://194.87.110.17/backend/api/game/map/kekkek/create', {
            body: JSON.stringify(body),
            headers: header,
            method: 'POST',
        } as RequestInit).then(resp => {
            console.log(resp.json().then(resp => console.log(resp)));
        });
        console.log(JSON.stringify(body, null, 2));
        let mapBody: Map<number, Body> = new Map<number, Body>();
        bodies.forEach((value, index, array) => {
            mapBody.set(index, value);
        });
        return new Board(mapBody, canvas);
    }

    static async loadBoard(canvas: HTMLCanvasElement | string): Promise<any> {
        let cvs = new fabric.Canvas(canvas);
        let bodies: Map<number, Body> = new Map<number, Body>();
        let json;
        let resp;

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        try {
            resp = await fetch('http://194.87.110.17/backend/api/game/map/18', {
                method: 'GET',
                headers: header,
            });
        }
        catch (e) {
            console.log('Network pizdec');
        }
        try {
            json = await resp.json();
        } catch (e) {
            console.log(e);
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
        let circleBucket = new CircleBucketBody(new b2Vec2(cvs.getWidth() / 4,
                cvs.getHeight() - 120),
            {},
            {},
        );
        // bodies.set(circleBucket.ID, circleBucket);
        let board = new Board(bodies, cvs);

        // let board = GameService.createMap(canvas);

        return Promise.resolve(board);
    }
}
