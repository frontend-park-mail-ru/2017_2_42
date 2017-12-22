import Button from '../../../blocks/button';
import MapTile from '../../../blocks/mapTile';
import {GameOffline} from '../../../game/gameLogic/gameOffline';
import User from '../../../models/user';
import BaseView from '../../../modules/BaseView';
import eventBus from '../../../modules/eventBus';
import ViewService from '../../../services/ViewService';
import mapService from '../../../services/mapService';
import userService from '../../../services/userService';
import './lobbyView.scss';

const lobbyTmpl = require('./lobbyView.pug') as TemplateRenderFunc;

export default class OfflineLobbyView extends BaseView {
  private maps: Map.Meta[];
  private user: User;

  private backButton: Button;
  private settingsButton: Button;
  private profileButton: Button;

  constructor(parentElement) {
    super(parentElement, 'Physics.io | lobby');
  }

  public async start(): Promise<void> {
    this.maps = this.maps || await mapService.getMaps(true, true);

    this.RenderPage(lobbyTmpl);

    const mapPlaceholder = document
      .querySelector('.main-frame__lobby-content__maps') as HTMLElement;
    this.maps.forEach((map) => {
      const mapTileElement = new MapTile(map).renderElement();

      mapPlaceholder.appendChild(mapTileElement);

      mapTileElement.onclick = () => {
        GameOffline.Create(map);
        this.router.showOverlay(ViewService.OverlayNames.game.waitingTeammates);
        eventBus.emit('game', 'subscribe');
      };

      eventBus.on('game', 'subscribed', () => {
        this.router.HideOverlay();
        this.router.go(ViewService.ViewPaths.offline.gamePage);
      });
    });

    this.backButton = new Button(document
      .querySelector('.main-frame__header__back-button') as HTMLElement);
    this.backButton.onClick(() => this.router.go(ViewService.ViewPaths.startPage));

    this.settingsButton = new Button(document
      .querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.settingsButton.onClick(() => this
      .router.showOverlay(ViewService.OverlayNames.application.settings));
  }

  public async destroy(): Promise<void> {
    this.rootElement.innerHTML = '';

    this.backButton = undefined;
    this.settingsButton = undefined;
    this.profileButton = undefined;
  }

  public async resume(): Promise<void> {
    return this.start();
  }

  public async pause(): Promise<void> {
    return this.destroy();
  }

}
