import MapMeta from '../../services/mapMeta';
import { EventsEnum, ScopesEnum } from '../../modules/eventBus';
import { Game } from '../../game/gameLogic/game';
import BaseView from '../../modules/baseView';
const GameViewTmpl = require('./gameView.pug') as TemplateRenderFunc;

export default class GameView extends BaseView {
    constructor(parentElement: HTMLElement) {
        super(parentElement);

        this.name = 'Game';
        this.renderFunc = GameViewTmpl;

        this.pageSection.id = 'game-page';

        this.bus.on(ScopesEnum.online, EventsEnum.map_chosen, (data: any) => {
            console.log('MAP LOADED');
            this.mapMeta = data;
            console.log('map meta to cst', this.mapMeta);
            this.game = new Game(
                this.mapMeta);
            this.game.load( this.pageSection.firstChild.firstChild as HTMLCanvasElement);

            document.addEventListener('keypress', function callback(event) {
                this.game.start();
                document.removeEventListener('keypress', callback);
            }.bind(this));

            document.ontouchend = function callback(event) {
                this.game.getState().onRun();
            }.bind(this);
        });
    }

    public start(): void {
        this.pageSection.innerHTML = this.renderFunc();
        this.rootElement.appendChild(this.pageSection);
    }

    public destroy(): void {
        this.pageSection.innerHTML = this.renderFunc();
    }

    public resume(): void {
        this.show();
    }

    public pause(): void {
        this.hide();
    }

    private game: Game;
    private mapMeta: MapMeta;
}
