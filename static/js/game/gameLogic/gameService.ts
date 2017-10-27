import 'fabric';
import {b2Vec2} from '../Box2D/Box2D';
import {b2BodyType} from '../Box2D/Dynamics/b2Body';
import {Board} from '../board';
import {BucketBody, CircleBody, RectBody} from '../body';

declare const fabric: any;

export class GameService {

  static loadBoards(canvases: HTMLCanvasElement | string) {

    let canvas = new fabric.Canvas(canvases);

    let groundDown = new RectBody(
      new b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 5),
      0,
      new b2Vec2(canvas.getWidth(), 10), {},
      b2BodyType.b2_staticBody,
    );
    let groundRight = new RectBody(
      new b2Vec2(canvas.getWidth() - 5, canvas.getHeight() / 2),
      0,
      new b2Vec2(10, canvas.getHeight()),
      {},
      b2BodyType.b2_staticBody);
    let groundLeft = new RectBody(
      new b2Vec2(5, canvas.getHeight() / 2),
      0,
      new b2Vec2(10, canvas.getHeight()),
      {},
      b2BodyType.b2_staticBody);

    // let groundDown = new RectBody(new b2Vec2(500, 700), 0, new b2Vec2(1200, 10), {}, b2BodyType.b2_staticBody);

    let circle = new CircleBody(new b2Vec2(550, 100), 20, {
      restitution: 0.5,
      collision: true,
    });

    let leftRect = new RectBody(new b2Vec2(500, 400), 30, new b2Vec2(200, 20), {
      restitution: 0.5,
      color: 'green',
      opacity: 0.5,
      collision: false,
      selectable: true,
    }, b2BodyType.b2_staticBody);

    let rightRect = new RectBody(new b2Vec2(canvas.getWidth() - 500, 400), -30, new b2Vec2(200, 20), {
      restitution: 0.5,
      color: 'green',
      opacity: 0.5,
      collision: false,
      selectable: true,
    }, b2BodyType.b2_staticBody);

    let bucket = new BucketBody(new b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 60), {color: 'green'}, b2BodyType.b2_dynamicBody);

    let square = new RectBody(new b2Vec2(canvas.getWidth() / 2, canvas.getHeight() - 35), 0, new b2Vec2(50, 50), {
      sensor: true,
      collision: true,
      color: 'blue',
      selectable: false,
    }, b2BodyType.b2_staticBody);

    let board = new Board([groundLeft, groundRight, groundDown, circle, leftRect, rightRect, square, bucket], canvas);

    return Promise.resolve([board]);
  }
}