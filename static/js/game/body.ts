import {b2Body, b2BodyDef, b2BodyType} from './Box2D/Dynamics/b2Body';
import {b2FixtureDef} from './Box2D/Dynamics/b2Fixture';
import {b2Vec2} from './Box2D/Common/b2Math';
import {b2CircleShape} from './Box2D/Collision/Shapes/b2CircleShape';
import {} from './Box2D/*';
import {b2World} from './Box2D/Dynamics/b2World';
import 'fabric';
import {b2_pi} from './Box2D/Common/b2Settings';

import {b2Transform} from './Box2D/Common/b2Math';
import {b2PolygonShape} from './Box2D/Collision/Shapes/b2PolygonShape';
import {b2ContactListener} from './Box2D/Dynamics/b2WorldCallbacks';

declare const fabric: any;

export const PIXEL_TO_METERS = 1 / 30;
export const METERS_TO_PIXEL = 30;

interface Option {
  density?: number;
  restitution?: number,
  friction?: number,
  opacity?: number
  color?: string | number,
  lockScale?: boolean,
  sensor?: boolean,
  collision?: boolean,
  selectable?: boolean,
}

interface InitOptions extends Option {
  position: b2Vec2,
  angle: number,
}


export abstract class Body {
  public bodyDef: b2BodyDef;
  public fixDefs: Array<b2FixtureDef>;

  public body: b2Body;

  public shapes: fabric.Object;
  private isDeleted: boolean = false;
  private _initOptions: InitOptions;

  constructor(bD: b2BodyDef, fixDefs: Array<b2FixtureDef>, shape: fabric.Object) {
    this.bodyDef = bD;
    this.bodyDef.userData = this;
    this.fixDefs = fixDefs;
    shape.originX = 'center';
    shape.originY = 'center';
    shape.hasBorders = false;
    shape.padding = 0;
    shape.strokeWidth = 0;
    shape.cornerSize = 5;
    shape.cornerColor = 'black';
    shape['cornerStyle'] = 'circle';
    shape['objectCaching'] = false;
    let options = {
      position: new b2Vec2(bD.position.x, bD.position.y),
      angle: bD.angle,
      selectable: shape.selectable
    };
    this._initOptions = options;
    this.shapes = shape;
  }

  get position(): b2Vec2 {
    let out: b2Vec2 = b2Vec2.ZERO;
    b2Vec2.MulSV(METERS_TO_PIXEL, this.bodyDef.position, out);
    return out;
  }

  set position(position: b2Vec2) {
    this.bodyDef.position = position.SelfMul(PIXEL_TO_METERS);
  }

  public Create(world: b2World) {
    this.body = world.CreateBody(this.bodyDef);
    this.fixDefs.forEach(this.body.CreateFixture, this.body);
    this.body.SetUserData(this);
    this.body.SetPosition(new b2Vec2(this.shapes.getLeft() * PIXEL_TO_METERS, this.shapes.getTop() * PIXEL_TO_METERS));
    this.body.SetAngle(fabric.util.degreesToRadians(this.shapes.getAngle()));
  }

  setPrepOptions() {
    // if (this.body) {
    //     this.bodyDef.position = this.
    // }
    this.bodyDef.position = this._initOptions.position;
    this.bodyDef.angle = this._initOptions.angle;
    this.shapes.selectable = this._initOptions.selectable;
    this.shapes.left = this.bodyDef.position.x * METERS_TO_PIXEL;
    this.shapes.top = this.bodyDef.position.y * METERS_TO_PIXEL;
    this.shapes.angle = fabric.util.radiansToDegrees(this.bodyDef.angle);
  }

  setRunOptions() {
    this.shapes.selectable = false;
  }

  setSelectable(is: boolean = true) {
    this.shapes.set('selectable', is);
  }

  step() {
    this.shapes.set('left', this.body.GetPosition().x * METERS_TO_PIXEL);
    this.shapes.set('top', this.body.GetPosition().y * METERS_TO_PIXEL);
    this.shapes.setAngle(fabric.util.radiansToDegrees(this.body.GetAngle()));
    this.shapes.setCoords();
  }

}

enum TypeBody {
  STATIC = 0x0004
}

export class RectBody extends Body {
  constructor(position: b2Vec2 = b2Vec2.ZERO, angle: number = 0, size: b2Vec2 = new b2Vec2(50, 50), option: Option = {}, type: b2BodyType = b2BodyType.b2_dynamicBody) {
    let fixDef = new b2FixtureDef();
    fixDef.shape = new b2PolygonShape()
      .SetAsBox(size.x * PIXEL_TO_METERS / 2, size.y * PIXEL_TO_METERS / 2);
    fixDef.density = option.density || 0.2;
    fixDef.friction = option.friction || 0.3;
    fixDef.restitution = option.restitution || 0.1;
    fixDef.isSensor = option.sensor || false;
    if (option.collision && true) {
      fixDef.filter.categoryBits = 0x0004;
      fixDef.filter.maskBits = 0x0002;
    }

    let bodyDef = new b2BodyDef();
    b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);
    bodyDef.type = type;
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

    shape.lockScalingX = shape.lockScalingY = option.lockScale || true;

    // let group = new fabric.Group([shape]);

    super(bodyDef, [fixDef], shape);
  }
}


export class CircleBody extends Body {
  constructor(position: b2Vec2 = b2Vec2.ZERO,
              radius: number = 50,
              option: Option = {},
              bptype: b2BodyType = b2BodyType.b2_dynamicBody) {
    let fixDef = new b2FixtureDef();
    fixDef.shape = new b2CircleShape(radius * PIXEL_TO_METERS);
    fixDef.density = option.density || 0.01;
    fixDef.friction = option.friction || 0.3;
    fixDef.restitution = option.restitution || 0.1;
    if (option.collision && true) {
      fixDef.filter.categoryBits = 0x0002;
      fixDef.filter.maskBits = 0x0004 | 0x0001;
    }

    let bodyDef = new b2BodyDef();
    b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);
    bodyDef.type = bptype;
    // bodyDef.awake = false;

    let shape = new fabric.Circle({
      left: position.x,
      top: position.y,
      fill: option.color || 'red',
      radius: radius,
      angle: 0,
      opacity: option.opacity || 0.7,
      selectable: option.selectable || true,
    });


    super(bodyDef, [fixDef], shape);
  }

  get radius(): number {
    return this.fixDefs[0].shape.m_radius * METERS_TO_PIXEL;
  }

  set radius(r: number) {
    this.fixDefs[0].shape.m_radius = r * PIXEL_TO_METERS;
  }

}

export class BucketBody extends Body {
  constructor(position: b2Vec2 = b2Vec2.ZERO, option: Option = {}, type: b2BodyType = b2BodyType.b2_dynamicBody) {
    let fixDefDown = new b2FixtureDef();
    let fixDefLeft = new b2FixtureDef();
    let fixDefRight = new b2FixtureDef();

    let fixDefs: Array<b2FixtureDef> = [fixDefLeft, fixDefDown, fixDefRight];


    fixDefLeft.shape = new b2PolygonShape().SetAsBox(10 * PIXEL_TO_METERS, 100 * PIXEL_TO_METERS, new b2Vec2(-40 * PIXEL_TO_METERS, 0));
    fixDefDown.shape = new b2PolygonShape().SetAsBox(70 * PIXEL_TO_METERS, 10 * PIXEL_TO_METERS, new b2Vec2(0, -45 * PIXEL_TO_METERS));
    fixDefRight.shape = new b2PolygonShape().SetAsBox(10 * PIXEL_TO_METERS, 100 * PIXEL_TO_METERS, new b2Vec2(40 * PIXEL_TO_METERS, 0));

    fixDefs.forEach(function (fixDef, index, array) {
      fixDef.density = option.density || 0.2;
      fixDef.friction = option.friction || 0.3;
      fixDef.restitution = option.restitution || 0.1;
      fixDef.isSensor = option.sensor || false;
      if (option.collision && true) {
        fixDef.filter.categoryBits = 0x0004;
        fixDef.filter.maskBits = 0x0002;
      }
    });


    let bodyDef = new b2BodyDef();
    b2Vec2.MulVS(position, PIXEL_TO_METERS, bodyDef.position);
    bodyDef.type = type;
    // bodyDef.angle = fabric.util.degreesToRadians(angle);
    let left = new fabric.Rect({
      height: 100,
      width: 10,
      fill: 'red',
      left: 5,
      top: 50,
      originX: 'center',
      originY: 'center'
    });

    let down = new fabric.Rect({
      width: 70,
      height: 10,
      fill: 'red',
      left: 45,
      top: 95,
      originX: 'center',
      originY: 'center'
    });

    let right = new fabric.Rect({
      width: 10,
      height: 100,
      fill: 'red',
      left: 80,
      top: 50,
      originX: 'center',
      originY: 'center'
    });

    let group = new fabric.Group([left, down, right], {
      originX: 'center',
      originY: 'center',
      left: position.x,
      top: position.y
    });

    group.lockScalingX = group.lockScalingY = option.lockScale || true;

    super(bodyDef, fixDefs, group);
  }
}





