import { EventsEnum, ScopesEnum } from '../../../modules/eventBus';
import BaseView from '../../../modules/baseView';
import MapMeta from '../../../services/mapMeta';
import mapService from '../../../services/mapService';
import Button from '../../../blocks/button';

const lobbyTmpl = require('./lobbyView.pug') as TemplateRenderFunc;

export default class LobbyView extends BaseView {
    private maps: MapMeta[];
    private mapTiles: Button[];

    constructor(parentElement) {
        super(parentElement);

        this.name = 'Lobby';
        this.renderFunc = lobbyTmpl;

        this.pageSection.id = 'lobby-page';

    }

    public start(): void {
        this.maps = mapService.getMaps(true);

        this.pageSection.innerHTML = this.renderFunc();
        this.rootElement.appendChild(this.pageSection);

        const mapTileElements = this.rootElement.getElementsByClassName('lobby-online__container__map');
        console.log(mapTileElements);
        for (let i = 0; i < mapTileElements.length; i++) {
            const button = new Button(mapTileElements[i] as HTMLElement);
            button.onClick(() => {
                console.log(1);
                this.bus.emit(ScopesEnum.online, EventsEnum.map_chosen, this.maps[i]);
            });

            this.mapTiles.push(button);
        }

    }

    public destroy(): void {
        this.rootElement.removeChild(this.pageSection);
        this.pageSection.innerHTML = '';
    }

    public resume(): void {
        this.show();
    }

    public pause(): void {
        this.hide();
    }
}
