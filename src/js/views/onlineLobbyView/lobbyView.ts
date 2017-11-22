import ViewPaths from '../pagePaths';
import MapTile from '../../blocks/mapTile';
import userService from '../../services/userService';
import Button from '../../blocks/button';
import User from '../../models/user';
import BaseView from '../../modules/baseView';
import { EventsEnum, ScopesEnum } from '../../modules/eventBus';
import mapService from '../../services/mapService';
import './lobbyView.scss';

const lobbyTmpl = require('./lobbyView.pug') as TemplateRenderFunc;

export default class OnlineLobbyView extends BaseView {
    private maps: Map.Meta[];
    private user: User;

    private backButton: Button;
    private settingsButton: Button;

    constructor(parentElement) {
        super(parentElement);

        this.name = 'Lobby';
        this.renderFunc = lobbyTmpl;

        this.pageSection.id = 'lobby-page';
    }

    public async start(): Promise<void> {
        this.user = await userService.getUser();
        this.maps = this.maps || await mapService.getMaps(true);

        document.querySelector('#main-frame').innerHTML = this.renderFunc({ mapTiles: this.maps });

        this.backButton = new Button(document.querySelector('.main-frame__header__back-button') as HTMLElement);
        this.settingsButton = new Button(document.querySelector('.main-frame__header__settings-button') as HTMLElement);

        const mapPlaceholder = document.querySelector('.main-frame__lobby-content__maps') as HTMLElement;

        for (let map of this.maps) {
            const mapTile = new MapTile(map);
            const mapTileElement = mapTile.renderElement();

            mapPlaceholder.appendChild(mapTileElement);

            mapTileElement.addEventListener('click', (event) => {
                this.router.go(ViewPaths.online_game, map);
            });
        }

        this.backButton.onClick(() => {
            this.router.go(ViewPaths.start);
        });

        this.settingsButton.onClick(() => {
            console.log('settings overlay');
        });
    }

    public destroy(): void {
        document.querySelector('#main-frame').innerHTML = '';

        this.backButton = undefined;
        this.settingsButton = undefined;
    }

    public resume(): void {
        this.start();
    }

    public pause(): void {
        this.destroy();
    }
}
