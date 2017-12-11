import userService, {UserService} from '../../../services/userService';
import './startView.scss';

import Button from '../../../blocks/button';
import BaseView from '../../../modules/BaseView';
import Utils from '../../../modules/utils/utils';
import ViewService from '../../../services/ViewService';

const StartPageTmpl = (require('./startView.pug') as TemplateRenderFunc);

export default class StartView extends BaseView {
  constructor(parentElement: HTMLElement) {
    super(parentElement, 'Physics.io');
  }

  public async start(): Promise<void> {
    this.RenderPage(StartPageTmpl);

    this.playButton = new Button(document
      .querySelector('.main_frame__content__play_button') as HTMLElement);
    try {
      const user = await userService.getUser(true);

      if (user) {
        this.playButton.onClick(
          () => this.router.go(ViewService.ViewPaths.online.lobbyPage));
      } else {
        this.playButton.onClick(
          () => this.router.go(ViewService.ViewPaths.online.loginPage));
      }
    } catch (err) {
      Utils.debugWarn(err);
      this.playButton.onClick(
        () => this.router.go(ViewService.ViewPaths.offline.lobbyPage));
    }

    this.aboutButton = new Button(document
      .querySelector('.main_frame__footer__about_button') as HTMLElement);
    this.aboutButton.onClick(
      () => this.router.go(ViewService.ViewPaths.aboutPage));

    this.muteButton = new Button(document
      .querySelector('.main_frame__header__sound-button') as HTMLElement);
    this.muteButton.onClick(
      () => console.log('soundMuted') /*TODO MediaService mute*/);

    this.settingsButton = new Button(document
      .querySelector('.main_frame__header__settings-button') as HTMLElement);
    this.settingsButton.onClick(
      () => this.router.showOverlay(ViewService.OverlayNames.application.settings));
  }

  public async destroy(): Promise<void> {
    this.rootElement.innerHTML = '';
    this.aboutButton = undefined;
    this.muteButton = undefined;
    this.settingsButton = undefined;
    this.playButton = undefined;
  }

  public async pause(): Promise<void> {
    return this.destroy();
  }

  public async resume(): Promise<void> {
    return this.start();
  }

  private playButton: Button;
  private aboutButton: Button;
  private settingsButton: Button;
  private muteButton: Button;
}
