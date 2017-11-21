import 'fabric';
import {} from './Box2D/*';
import {b2CircleShape} from './Box2D/Collision/Shapes/b2CircleShape';
import {b2Vec2} from './Box2D/Common/b2Math';
import {b2_pi} from './Box2D/Common/b2Settings';
import {b2Body, b2BodyDef, b2BodyType} from './Box2D/Dynamics/b2Body';
import {b2FixtureDef} from './Box2D/Dynamics/b2Fixture';
import {b2World} from './Box2D/Dynamics/b2World';

import {b2PolygonShape} from './Box2D/Collision/Shapes/b2PolygonShape';
import {b2Transform} from './Box2D/Common/b2Math';
import {b2ContactListener} from './Box2D/Dynamics/b2WorldCallbacks';

declare const fabric: any;

export const PIXEL_TO_METERS = 1 / 30;
export const METERS_TO_PIXEL = 30;


export enum KeyBodies {
    NOT_KEY_BODY = 0x0001,
    KEY_BODY_1 = 0x0002,
    KEY_BODY_2 = 0x0004,
    KEY_BODY_3 = 0x0008,
    KEY_BODY_4 = 0x0010,
}

interface DrawOptions {
    opacity?: number;
    color?: string | number;
    lockScale?: boolean;
    selectable?: boolean;
}


interface PhysicsOptions {
    density?: number;
    restitution?: number;
    friction?: number;
    bodyType?: b2BodyType;
    sensor?: boolean;
    collision?: boolean;
}

export interface Options extends DrawOptions, PhysicsOptions {
    key?: KeyBodies;
}

interface InitOptions extends Options {
    position: b2Vec2;
    angle: number;
}


export abstract class Body {
    get owner(): number {
        return this._owner;
    }

    set owner(value: number) {
        this._owner = value;
    }
    private static counter = 0;

    protected _ID: number;
    protected _owner: number;
    public bodyDef: b2BodyDef;
    public fixDefs: b2FixtureDef[];
    public body: b2Body;

    private _shapes: fabric.Object;
    private _isDeleted: boolean = false;
    private _initOptions: InitOptions;

    constructor(bD: b2BodyDef, fixDefs: b2FixtureDef[], shape: fabric.Object, option: Options) {
        this.bodyDef = bD;
        this.bodyDef.type = option.bodyType || b2BodyType.b2_staticBody;
        this.bodyDef.userData = this;
        this.fixDefs = fixDefs;
        shape.originX = 'center';
        shape.originY = 'center';
        shape.hasBorders = false;
        shape.padding = 0;
        shape.strokeWidth = 0;
        shape.stroke = null;
        shape.cornerSize = 5;
        shape.cornerColor = 'black';
        shape['cornerStyle'] = 'circle';
        shape['objectCaching'] = false;
        this._initOptions = {
            position: new b2Vec2(bD.position.x, bD.position.y),
            angle: bD.angle,
            selectable: shape.selectable,
            key: option.key,
        };
        shape.lockScalingX = shape.lockScalingY = option.lockScale || true;
        this._shapes = shape;
        this._shapes.set('objectCaching', false);
        this._shapes.toObject = () => {
            return {
                id: this._ID,
            };
        };
        this.fixDefs.forEach(function (fixDef, index, array) {
            fixDef.density = option.density || 0.2;
            fixDef.friction = option.friction || 0.3;
            fixDef.restitution = option.restitution || 0.1;
        });
        this._owner = 1;
        this._ID = Body.counter++;
    }

    get shapes(): fabric.Object {
        return this._shapes;
    }

    get angle(): number {
        return this.bodyDef.angle;
    }

    set shapes(value: fabric.Object) {
        this._shapes = value;
    }

    get isDeleted(): boolean {
        return this._isDeleted;
    }

    set isDeleted(value: boolean) {
        this._isDeleted = value;
    }

    get initOptions(): InitOptions {
        return this._initOptions;
    }

    get ID(): number {
        return this._ID;
    }

    set ID(value: number) {
        if (value < 0) {
            throw Error('id must be greater 0');
        }
        this._ID = value;
    }

    public Create(world: b2World) {
        this.body = world.CreateBody(this.bodyDef);
        this.fixDefs.forEach(this.body.CreateFixture, this.body);
        this.body.SetUserData(this);
        this.body.SetPosition(new b2Vec2(this._shapes.getLeft() * PIXEL_TO_METERS, this._shapes.getTop() * PIXEL_TO_METERS));
        this.body.SetAngle(fabric.util.degreesToRadians(this._shapes.getAngle()));
    }

    get position(): b2Vec2 {
        let out: b2Vec2 = b2Vec2.ZERO;
        b2Vec2.MulSV(METERS_TO_PIXEL, this.bodyDef.position, out);
        return out;
    }

    set position(position: b2Vec2) {
        this.bodyDef.position = position.SelfMul(PIXEL_TO_METERS);
    }

    setPrepOptions() {
        // if (this.body) {
        //     this.bodyDef.position = this.
        // }
        this.bodyDef.position = this._initOptions.position;
        this.bodyDef.angle = this._initOptions.angle;
        this._shapes.selectable = this._initOptions.selectable;
        this._shapes.left = this.bodyDef.position.x * METERS_TO_PIXEL;
        this._shapes.top = this.bodyDef.position.y * METERS_TO_PIXEL;
        this._shapes.angle = fabric.util.radiansToDegrees(this.bodyDef.angle);
    }

    setRunOptions() {
        // this._shapes.selectable = false;
    }

    setSelectable(is: boolean = true) {
        this._shapes.set('selectable', is);
    }

    step(): void {
        this._shapes.set('left', this.body.GetPosition().x * METERS_TO_PIXEL);
        this._shapes.set('top', this.body.GetPosition().y * METERS_TO_PIXEL);
        this._shapes.setAngle(fabric.util.radiansToDegrees(this.body.GetAngle()));
        this._shapes.setCoords();
    }

    getKind(): string {
        return 'abstract body';
    }

    toJSON(): Object {
        throw Error('Method not implemented');
    }

}

export class RectBody extends Body {
    private size: b2Vec2;
    private fixture: b2FixtureDef;

    constructor(position: b2Vec2 = b2Vec2.ZERO, angle: number = 0, size: b2Vec2 = new b2Vec2(50, 50), option: Options = {}) {
        let fixDef = new b2FixtureDef();
        fixDef.shape = new b2PolygonShape()
            .SetAsBox(
                size.x * PIXEL_TO_METERS / 2,
                size.y * PIXEL_TO_METERS / 2);
        let bodyDef = new b2BodyDef();
        b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);

        bodyDef.angle = fabric.util.degreesToRadians(angle);

        let shape = new fabric.Rect({
            left: position.x,
            top: position.y,
            fill: option.color || 'red',
            width: size.x,
            height: size.y,
            angle: angle,
            opacity: option.opacity || 0.7,
            selectable: option.selectable && true,
        });
        super(bodyDef, [fixDef], shape, option);
        this.size = size;
        this.fixture = fixDef;
    }

    getKind(): string {
        return 'rect';
    }

    toJSON(): Object {
        let json: any = {};
        // json.playerID = this._owner;
        // let data: any = json.data;
        json.position = {
            x: this.bodyDef.position.x,
            y: this.bodyDef.position.y,
        };
        json.angle = this.bodyDef.angle;
        // console.log(this.size);
        json.size = this.size;
        json.size.x = json.size.x * PIXEL_TO_METERS;
        json.size.y = json.size.y * PIXEL_TO_METERS;
        // console.log(data.size);
        json.options = {
            density: this.fixture.density,
            restitution: this.fixture.restitution,
            friction: this.fixture.friction,
            sensor: this.fixture.isSensor,
            keyBodyID: this.initOptions.key,
        };
        json.type = this.bodyDef.type;
        return json;
    }
}


export class CircleBody extends Body {
    private fixture: b2FixtureDef;

    constructor(position: b2Vec2 = b2Vec2.ZERO, radius: number = 50, option: Options = {}) {
        let fixDef = new b2FixtureDef();
        fixDef.shape = new b2CircleShape(radius * PIXEL_TO_METERS);
        if (option.key) {
            fixDef.filter.categoryBits = option.key;
            fixDef.filter.maskBits = option.key | KeyBodies.NOT_KEY_BODY;
        }
        let bodyDef = new b2BodyDef();
        b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);

        let shape = new fabric.Circle({
            left: position.x,
            top: position.y,
            fill: option.color || 'red',
            radius: radius,
            angle: 0,
            opacity: option.opacity || 0.7,
            selectable: option.selectable || true,
        });


        super(bodyDef, [fixDef], shape, option);
        this.fixture = fixDef;
    }

    get radius(): number {
        return this.fixDefs[0].shape.m_radius * METERS_TO_PIXEL;
    }

    set radius(r: number) {
        this.fixDefs[0].shape.m_radius = r * PIXEL_TO_METERS;
    }

    getKind(): string {
        return 'circle';
    }

    toJSON(): Object {
        let json: any = {};
        json.position = {
            x: this.bodyDef.position.x,
            y: this.bodyDef.position.y,
        };
        json.angle = this.bodyDef.angle;
        json.radius = this.fixture.shape.m_radius;
        json.options = {
            density: this.fixture.density,
            restitution: this.fixture.restitution,
            friction: this.fixture.friction,
            sensor: this.fixture.isSensor,
            keyBodyID: this.initOptions.key,
        };
        json.type = this.bodyDef.type;
        // json.playerID = this._owner;
        return json;
    }

}

export interface BucketConfig {
    wallThickness?: number;
    bottomLength?: number;
    height?: number;
}


export class BucketBody extends Body {
    private config: BucketConfig;

    constructor(position: b2Vec2 = b2Vec2.ZERO, config: BucketConfig = {}, option: Options = {}) {
        let wallThickness = (config.wallThickness || 10) * PIXEL_TO_METERS;
        let bottomLength = (config.bottomLength || 70) * PIXEL_TO_METERS;
        let height = (config.height || 100) * PIXEL_TO_METERS;

        let fixDefDown = new b2FixtureDef();
        let fixDefLeft = new b2FixtureDef();
        let fixDefRight = new b2FixtureDef();
        let fixDefSensor = new b2FixtureDef();

        let fixDefs: b2FixtureDef[] = [fixDefLeft, fixDefDown, fixDefRight, fixDefSensor];

        fixDefLeft.shape = new b2PolygonShape()
            .SetAsBox(
                wallThickness / 2,
                height / 2,
                new b2Vec2(-(bottomLength + wallThickness) / 2, 0));

        fixDefDown.shape = new b2PolygonShape()
            .SetAsBox(
                bottomLength / 2,
                wallThickness / 2,
                new b2Vec2(0, (height - wallThickness) / 2));

        fixDefRight.shape = new b2PolygonShape()
            .SetAsBox(
                wallThickness / 2,
                height / 2,
                new b2Vec2((bottomLength + wallThickness) / 2, 0),
            );

        fixDefSensor.shape = new b2PolygonShape()
            .SetAsBox(
                bottomLength / 2,
                (height - wallThickness) / 2,
                new b2Vec2(0, -wallThickness / 2),
            );

        let bodyDef = new b2BodyDef();
        b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);
        let left = new fabric.Rect({
            width: config.wallThickness,
            height: config.height,
            fill: option.color || 'red',
            opacity: option.opacity || 0.7,
            left: config.wallThickness / 2,
            top: config.height / 2,
            originX: 'center',
            originY: 'center',
            stroke: null,
        });

        let down = new fabric.Rect({
            width: config.bottomLength,
            height: config.wallThickness,
            fill: option.color || 'red',
            left: config.wallThickness + config.bottomLength / 2,
            top: config.height - config.wallThickness / 2,
            originX: 'center',
            originY: 'center',
            opacity: option.opacity || 0.7,
            stroke: null,
        });

        let right = new fabric.Rect({
            width: config.wallThickness,
            height: config.height,
            fill: option.color || 'red',
            left: config.wallThickness + config.bottomLength + config.wallThickness / 2,
            top: config.height / 2,
            originX: 'center',
            originY: 'center',
            opacity: option.opacity || 0.7,
            stroke: null,
        });

        let sensor = new fabric.Rect({
            width: config.bottomLength,
            height: config.height - config.wallThickness,
            originX: 'center',
            originY: 'center',
            left: config.wallThickness + config.bottomLength / 2,
            top: config.height / 2 - config.wallThickness / 2,
            fill: 'blue',
            // opacity: 0.0,
        });

        fixDefSensor.isSensor = option.sensor || false;
        if (option.key) {
            fixDefSensor.filter.categoryBits = option.key;
            fixDefSensor.filter.maskBits = option.key | KeyBodies.NOT_KEY_BODY;
        }

        let group = new fabric.Group([left, down, right, sensor], {
            originX: 'center',
            width: wallThickness * 2 + bottomLength,
            height: height,
            originY: 'center',
            left: position.x,
            top: position.y,
            stroke: null,
            subTargetCheck: true,
            selectable: true,
        });
        super(bodyDef, fixDefs, group, option);
        this.config = config;
        this.config.height = height;
        this.config.wallThickness = wallThickness;
        this.config.bottomLength = bottomLength;
    }

    getKind(): string {
        return 'bucket';
    }

    toJSON(): Object {
        let json: any = {};
        // json.playerID = this._owner;
        json.position = {
            x: this.bodyDef.position.x,
            y: this.bodyDef.position.y,
        };
        json.size = {x: 1, y: 1};
        json.config = this.config;
        json.config.angle = 3;
        json.angle = 0;
        json.options = {
            density: this.fixDefs[0].density,
            restitution: this.fixDefs[0].restitution,
            friction: this.fixDefs[0].friction,
            sensor: this.fixDefs[0].isSensor,
            keyBodyID: this.initOptions.key,
        };
        json.type = this.bodyDef.type;
        return json;
    }
}

export interface CircleBucketConfig {
    radius?: number;
    wallThickness?: number;
}

export class CircleBucketBody extends Body {
    constructor(position: b2Vec2 = b2Vec2.ZERO, config: CircleBucketConfig = {}, option: Options = {}) {
        let wallThickness = (config.wallThickness || 10) * PIXEL_TO_METERS;
        let radius = (config.radius || 50) * PIXEL_TO_METERS;
        let fixDefs: b2FixtureDef[] = [];
        let shapes: fabric.Object[] = [];

        for (let i = -180; i < 20; i += 20) {
            let fixDef: b2FixtureDef = new b2FixtureDef();
            fixDef.shape = new b2PolygonShape()
                .SetAsBox(
                    2 * radius * Math.tan(Math.PI / 18) / 2,
                    wallThickness / 2,
                    new b2Vec2(radius * Math.cos(i * Math.PI / 180), radius * Math.sin(i * Math.PI / 180)),
                    (180 + i) * Math.PI / 180);
            fixDefs.push(fixDef);
            let shape = new fabric.Rect({
                width: 2 * (config.radius || 50) * Math.tan(Math.PI / 18),
                height: config.wallThickness || 10,
                fill: option.color || 'red',
                left: -(config.radius || 50) * Math.cos(i * Math.PI / 180),
                top: -(config.radius || 50) * Math.sin(i * Math.PI / 180),
                angle: (90 + i),
                originX: 'center',
                originY: 'center',
                opacity: option.opacity || 0.7,
                stroke: null,
            });
            shapes.push(shape);
        }

        let bodyDef: b2BodyDef = new b2BodyDef();
        b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);
        let group = new fabric.Group(shapes, {
            // originX: 'center',
            // originY: 'center',
            left: position.x,
            top: position.y,
            stroke: null,
            subTargetCheck: true,
            // selectable: true,
        });
        super(bodyDef, fixDefs, group, option);
    }
}




