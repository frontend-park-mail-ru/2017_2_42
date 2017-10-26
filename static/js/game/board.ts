import {Body} from './body';
import 'fabric';
import {b2World} from './Box2D/Dynamics/b2World';
import {b2Vec2} from './Box2D/Common/b2Math';

declare const fabric: any;

export class Board {
  public _canvas: fabric.Canvas;

  constructor(bodies: Array<Body>, canvasElem: fabric.Canvas) {
    this._bodies = bodies;
    this._canvas = canvasElem;
  }

  private _bodies: Array<Body>;

  get bodies(): Array<Body> {
    return this._bodies;
  }

  prepare() {
    this._canvas.clear();
    this._bodies.forEach((body, index, array) => {
      body.setPrepOptions();
      this._canvas.add(body.shapes);
    });
  }

  create(world: b2World) {
    this._canvas.discardActiveObject();
    this._bodies.forEach((body, index, array) => {
      body.setRunOptions();
      body.Create(world);
    });
  }
}