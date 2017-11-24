import { Body } from './body';
import 'fabric';
import { b2World } from 'box2d.ts/Box2D/Box2D/Dynamics/b2World';
import { b2Vec2 } from 'box2d.ts/Box2D/Box2D/Common/b2Math';

declare const fabric: any;

export class Board {
    private _bodies: Map<number, Body>;
    public _canvas: fabric.Canvas;
    public img: fabric.Image;

    constructor(bodies: Map<number, Body>, canvasElem: fabric.Canvas) {
        this._bodies = bodies;
        this._canvas = canvasElem;
        this._canvas.setBackgroundImage('./img/chalkboard.jpg', this._canvas.renderAll.bind(this._canvas));
        fabric.Image.fromURL('./img/chalk_texture.png', (img) => {
            img.scaleToWidth(500);
            this.img = img;
            this._bodies.forEach((body) => {
                body.shapes.set('objectCaching', false);
                body.shapes.set('fill', new fabric.Pattern({
                    source: this.img.getElement(),
                    // angle: Math.random() * 360,
                    repeat: 'repeat',
                }));
            });
            // this.img.filters.push(new fabric.Image.filters.Blend({color: 'green'}));
            // this.img.applyFilters(() => {
            //     for (let body of this._bodies.values()) {
            //         body.shapes.set('fill', new fabric.Pattern({
            //             source: this.img.getElement(),
            //             angle: Math.random() * 360,
            //         }));
            //     }
            //     this._canvas.renderAll.bind(this._canvas);
            // });
            // this._canvas.add(img);
            const change = document.getElementById('img-width') as HTMLInputElement;
            change.addEventListener('input', (event) => {
                this.img.scaleToWidth(parseInt(change.value, 10));
                this._canvas.renderAll();
            });
        });
        this._canvas.on('object:moving', (option) => {
            let s: boolean = false;
            this._canvas.forEachObject(function (obj) {
                // if (obj.type === 'group') {
                //     (obj as fabric.Group).forEachObject(function (obj1) {
                //         option.target.setCoords();
                //         if (option.target.intersectsWithObject(obj1)) {
                //             s = true;
                //         }
                //     });
                // }
                if (obj === option.target) return;
                option.target.setCoords();
                if (option.target.intersectsWithObject(obj)) {
                    s = true;
                }
            });
            if (s) {
                if (this.img.filters.length === 0) {
                    this.img.filters.push(new fabric.Image.filters.Blend({ color: 'red' }));
                    this.img.applyFilters(() => {
                        this._canvas.renderAll.bind(this._canvas);
                        option.target.setPatternFill({ source: this.img.getElement() });
                    });
                }
            } else {
                this.img.filters.pop();
                this.img.applyFilters(() => {
                    this._canvas.renderAll.bind(this._canvas);
                    option.target.setPatternFill({ source: this.img.getElement() });
                });
            }
            s = false;
        });
    }

    prepare() {
        this._canvas.clear();
        this._bodies.forEach((body) => {
            body.setPrepOptions();
            this._canvas.add(body.shapes);
        });
    }

    get bodies(): Map<number, Body> {
        return this._bodies;
    }

    create(world: b2World) {
        this._canvas.discardActiveObject();
        this._bodies.forEach((body, index, array) => {
            body.setRunOptions();
            body.Create(world);
        });
    }
}
