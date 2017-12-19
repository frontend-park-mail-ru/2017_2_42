import SoundButton from '../../../blocks/Buttons/SoundButton';
import Button from '../../../blocks/button';
import MapTile from '../../../blocks/mapTile';
import {game, GameOnline} from '../../../game/gameLogic/gameOnline';
import User from '../../../models/user';
import BaseView from '../../../modules/BaseView';
import eventBus from '../../../modules/eventBus';
import ViewService from '../../../services/ViewService';
import mapService from '../../../services/mapService';
import userService from '../../../services/userService';
import ViewPaths from '../../pagePaths';
import './lobbyView.scss';

const lobbyTmpl = require('./lobbyView.pug') as TemplateRenderFunc;

export default class OnlineLobbyView extends BaseView {
  private maps: Map.Meta[];
  private user: User;

  private backButton: Button;
  private settingsButton: Button;
  private logoutButton: Button;

  constructor(parentElement) {
    super(parentElement, 'Physics.io | lobby');
  }

  public async start(): Promise<void> {
    this.user = await userService.getUser(true);
    this.maps = this.maps || await mapService.getMaps(true);

    this.RenderPage(lobbyTmpl);

    const mapPlaceholder = document
      .querySelector('.main-frame__lobby-content__maps') as HTMLElement;
    this.maps.forEach((map) => {
      const mapTileElement = new MapTile(map).renderElement();

      mapPlaceholder.appendChild(mapTileElement);
      GameOnline.Create(map);

      mapTileElement.onclick = () => {
        this.router.showOverlay(ViewService.OverlayNames.game.waitingTeammates);
        eventBus.emit('game', 'subscribe');
      };
      eventBus.on('game', 'subscribed', () => {
        this.router.HideOverlay();
        this.router.go(ViewService.ViewPaths.online.gamePage);
      });
    });
    document.querySelector('.main-frame__header__userlist__player-name').innerHTML = this.user.username;

    this.backButton = new Button(document
      .querySelector('.main-frame__header__back-button') as HTMLElement);
    this.backButton.onClick(() => this.router.go(ViewService.ViewPaths.startPage));

    // this.soundButton = new SoundButton(document
    //   .querySelector('.main-frame__header__sound-button') as HTMLElement);
    // this.soundButton.onClick(() => console.log('muted'));

    this.settingsButton = new Button(document
      .querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.settingsButton.onClick(() => this
      .router.showOverlay(ViewService.OverlayNames.application.settings));

    // this.logoutButton = new Button(document
    //   .querySelector('.main-frame__header__logout-button') as HTMLElement);
    // this.logoutButton.onClick(async () => {
    //   try {
    //     await userService.logout();
    //     this.router.go(ViewService.ViewPaths.online.loginPage);
    //   } catch (error) {
    //     this.router.go(ViewPaths.start);
    //   }
    // });


  }

  public async destroy(): Promise<void> {
    this.rootElement.innerHTML = '';

    this.backButton = undefined;
    this.settingsButton = undefined;
  }

  public async resume(): Promise<void> {
    return this.start();
  }

  public async pause(): Promise<void> {
    return this.destroy();
  }
}
