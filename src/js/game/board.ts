import {Body} from './body';
import 'fabric';
import {b2World} from 'box2d.ts/Box2D/Box2D/Dynamics/b2World';
import './img/chalk_texture.png';

declare const fabric: any;

export class Board {
    public bodies: Map<number, Body>;
    public canvas: fabric.Canvas;
    public img: fabric.Image;

    constructor(bodies: Map<number, Body>, canvasElem: fabric.Canvas) {
        this.bodies = bodies;
        this.canvas = canvasElem;
        fabric.util.loadImage('/img/chalk_texture.png', (img) => {
            if (img === null) {
                console.log('Failed to load image!');
                return;
            }
            img = new fabric.Image(img);
            img.scaleToWidth(500);
            this.img = img;
            for (let body of this.bodies.values()) {
                body.shapes.set('objectCaching', false);
                body.shapes.set('fill', new fabric.Pattern({
                    source: this.img.getElement(),
                    repeat: 'repeat',
                }));
            }
        });
        this.canvas.on('object:moving', (option) => {
            let intersect: boolean = false;
            this.canvas.forEachObject(function (obj) {
                if (obj === option.target) return;
                option.target.setCoords();
                if (option.target.intersectsWithObject(obj)) {
                    intersect = true;
                }
            });
            if (intersect) {
                if (this.img.filters.length === 0) {
                    this.img.filters.push(new fabric.Image.filters.Blend({color: 'red'}));
                    this.img.applyFilters(() => {
                        this.canvas.renderAll.bind(this.canvas);
                        option.target.setPatternFill({source: this.img.getElement()});
                    });
                }
            } else {
                this.img.filters.pop();
                this.img.applyFilters(() => {
                    this.canvas.renderAll.bind(this.canvas);
                    option.target.setPatternFill({source: this.img.getElement()});
                });
            }
        });
    }

    public prepare(): void {
        this.canvas.clear();
        for (let body of this.bodies.values()) {
            body.setPrepOptions();
            this.canvas.add(body.shapes);
        }
    }

    public create(world: b2World): void {
        this.canvas.discardActiveObject();
        this.bodies.forEach((body, index, array) => {
            body.setRunOptions();
            body.Create(world);
        });
    }
}