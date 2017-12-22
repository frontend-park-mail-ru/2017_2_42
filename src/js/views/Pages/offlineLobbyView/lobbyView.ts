import SoundButton from '../../../blocks/Buttons/SoundButton';
import Button from '../../../blocks/button';
import MapTile from '../../../blocks/mapTile';
import {GameOffline} from '../../../game/gameLogic/gameOffline';
import BaseView from '../../../modules/BaseView';
import eventBus from '../../../modules/eventBus';
import ViewService from '../../../services/ViewService';
import mapService from '../../../services/mapService';
import './lobbyView.scss';

const lobbyTmpl = require('./lobbyView.pug') as TemplateRenderFunc;

export default class OfflineLobbyView extends BaseView {
  private maps: Map.Meta[];

  private backButton: Button;
  private muteButton: Button;
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

    // this.settingsButton = new Button(document
    //   .querySelector('.main_frame__header__settings-button') as HTMLElement);
    // this.settingsButton.onClick(
    //   () => this.router.showOverlay(ViewService.OverlayNames.application.settings));
    this.muteButton = new SoundButton(document
      .querySelector('.main-frame__header__sound-button') as HTMLElement);
    // this.settingsButton = new Button(document
    //   .querySelector('.main-frame__header__settings-button') as HTMLElement);
    // this.settingsButton.onClick(() => this
    //   .router.showOverlay(ViewService.OverlayNames.application.settings));
  }

  public async destroy(): Promise<void> {
    this.rootElement.innerHTML = '';

    this.backButton = undefined;
    this.muteButton = undefined;
    this.profileButton = undefined;
  }

  public async resume(): Promise<void> {
    return this.start();
  }

  public async pause(): Promise<void> {
    return this.destroy();
  }

}
