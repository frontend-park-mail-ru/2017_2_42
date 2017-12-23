"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../eventBus");
require("fabric");
const Message_1 = require("../gameLogic/Message");
const config_1 = require("./config");
class Board {
    constructor(bodies, canvasElem, game) {
        this.bodies = bodies;
        this.canvas = canvasElem;
        this.game = game;
        this.patterns = new Map();
        this.timerText = new fabric.TextBox({
            left: 50,
            top: 50,
            width: 150,
            fontSize: 20,
        });
        this.tuneCanvas();
        this.loadPatterns();
        this.setPatterns();
        this.registerEvent();
    }
    registerEvent() {
        let movingHandler = (option) => {
            let isIntersect = false;
            this.canvas.forEachObject((obj) => {
                if (obj === option.target)
                    return;
                option.target.setCoords();
                if (option.target.intersectsWithObject(obj)) {
                    isIntersect = true;
                }
            });
            let body_pattern = this.patterns.get(option.target.toObject().body.type);
            if (isIntersect) {
                if (body_pattern.filters.length === 0) {
                    body_pattern.filters.push(new fabric.Image.filters.BlendColor({ color: 'red' }));
                    body_pattern.applyFilters();
                    option.target.setPatternFill({ source: body_pattern.getElement() });
                }
            }
            else {
                body_pattern.filters.pop();
                body_pattern.applyFilters();
                option.target.setPatternFill({ source: body_pattern.getElement() });
            }
            isIntersect = false;
            if (this.game.meta.players !== 1) {
                let data = {};
                data.snap = {};
                data.snap.id = option.target.toObject().body.ID;
                data.snap.position = {
                    x: option.target.left,
                    y: option.target.top,
                };
                data.snap.angle = option.target.angle;
                let msg = new Message_1.MovingMessage(this.game, data);
                msg.HandleRequest();
            }
        };
        this.canvas.on('object:moving', movingHandler);
        this.canvas.on('object:rotating', movingHandler);
    }
    prepare() {
        this.canvas.clear();
        for (let body of this.bodies.values()) {
            body.setPrepOptions();
            this.promise.then(() => this.canvas.add(body.shapes));
        }
    }
    create(world) {
        this.canvas.discardActiveObject();
        this.bodies.forEach((body, index, array) => {
            body.setRunOptions();
            body.Create(world);
        });
    }
    tuneCanvas() {
        this.canvas.selection = false;
        this.canvas.setBackgroundImage('./img/chalkboard.jpg', this.canvas.renderAll.bind(this.canvas));
    }
    setPatterns() {
        this.promise.then(() => {
            for (let body of this.bodies.values()) {
                if (body.isKeyBody) {
                    let body_pattern = this.patterns.get(body.type);
                    body_pattern.filters.push(new fabric.Image.filters.HueRotation({ rotation: 0 }));
                    body_pattern.applyFilters();
                    body.shapes.setPatternFill({ source: body_pattern.getElement() });
                    this.canvas.renderAll();
                }
                // this.patterns.get('dynamic_body_pattern').scaleToHeight(body.shapes.getHeight());
                // this.patterns.get('dynamic_body_pattern').scaleToWidth(body.shapes.getWidth());
                body.shapes.set('fill', new fabric.Pattern({
                    source: this.patterns.get(body.bodyDef.type).getElement(),
                    repeat: 'repeat',
                }));
                console.log(body.shapes);
                this.canvas.renderAll();
                // this.patterns.get('static_body_pattern').scaleToHeight(body.shapes.getHeight());
                // this.patterns.get('static_body_pattern').scaleToWidth(body.shapes.getWidth());
                // body.shapes.set('fill', new fabric.Pattern({
                //     source: this.patterns.get('static_body_pattern').getElement(),
                //     repeat: 'repeat',
                // }));
            }
        });
    }
    loadPatterns() {
        let promises = [];
        config_1.patterns.forEach((pattern_name, key, map) => {
            promises.push(new Promise(resolve => {
                fabric.util.loadImage('./img/' + pattern_name, (img) => {
                    if (img === null) {
                        console.log('Failed to load image!');
                        eventBus_1.default.emit('game', 'patternLoadFailed');
                        return;
                    }
                    img = new fabric.Image(img);
                    img.scaleToWidth(500);
                    img.scaleToHeight(500);
                    this.patterns.set(key, img);
                    resolve();
                });
            }));
        });
        this.promise = Promise.all(promises);
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map