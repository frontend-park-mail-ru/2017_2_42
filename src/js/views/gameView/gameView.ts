///<reference path="../../../../node_modules/@types/fabric/index.d.ts"/>
import Button from '../../blocks/button';

import { b2AABB } from '../../game/Box2D/Collision/b2Collision';
import { b2_pi } from '../../game/Box2D/Common/b2Settings';
import { b2World } from '../../game/Box2D/Dynamics/b2World';
import { BucketBody, CircleBody, PIXEL_TO_METERS, RectBody } from '../../game/body';
import { StartMessage } from '../../game/gameLogic/Message';
import { Game } from '../../game/gameLogic/game';

import BaseView from '../../modules/baseView';
import { EventsEnum, ScopesEnum } from '../../modules/eventBus';

const GameViewTmpl = require('./gameView.pug') as TemplateRenderFunc;
import './gameView.scss';

export default class GameView extends BaseView {
    private readyButton: Button;
    private backButton: Button;
    private settingsButton: Button;

    constructor(parentElement: HTMLElement) {
        super(parentElement);

        this.name = 'Game';
        this.renderFunc = GameViewTmpl;
    }

    public async start(mapMeta: Map.Meta): Promise<void> {
        document.querySelector('#main-frame').innerHTML = this.renderFunc();

        const game = new Game({});

        await game.load(document.querySelector('.main-frame__game-canvas') as HTMLCanvasElement);

        game.gameService.sendSocketMessage(`{"class": "SubscribeMessage", "board": ${mapMeta.id}}`);

        document.querySelector('main-frame__header__ready-button__not-ready')
            .addEventListener('click', () => {
                let startMsg = new StartMessage(game);
                startMsg.HandleRequest();
            });

        document.ontouchend = (event) => {
            game.getState().onRun();
        };

    }

    public destroy(): void {
        this.pageSection.innerHTML = this.renderFunc();
    }

    public resume(mapMeta: Map.Meta): void {
        this.start(mapMeta);
    }

    public pause(): void {
        this.destroy();
    }

    // private game: Game;
    private mapMeta: Map.Meta;
}
