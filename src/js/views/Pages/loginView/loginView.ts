import Button from '../../../blocks/button';
import LoginForm from '../../../blocks/loginForm';
import BaseView from '../../../modules/BaseView';
import ViewService from '../../../services/ViewService';
import './loginView.scss';

const LoginTmpl = require('./loginView.pug') as TemplateRenderFunc;

export default class LoginView extends BaseView {
  private form: LoginForm;

  private settingsButton: Button;
  private soundButton: Button;
  private aboutButton: Button;
  private backButton: Button;

  private signUpButton: Button;
  private goOfflineButton: Button;

  constructor(parentElement: HTMLElement) {
    super(parentElement, 'Physics.io | Login');
  }

  public async start(): Promise<void> {
    this.RenderPage(LoginTmpl);

    this.form = new LoginForm(document
      .querySelector('.main-frame__content__content-column__form'));
    this.form.onSuccessSubmit(
      () => this.router.go(ViewService.ViewPaths.online.lobbyPage));

    this.backButton = new Button(document
      .querySelector('.main-frame__header__back-button') as HTMLElement);
    this.backButton.onClick(
      () => this.router.go(ViewService.ViewPaths.startPage));

    this.soundButton = new Button(document
      .querySelector('.main-frame__header__sound-button') as HTMLElement);
    this.soundButton.onClick(() => console.log('sound muted'));

    this.settingsButton = new Button(document
      .querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.settingsButton.onClick(
      () => this.router
        .showOverlay(ViewService.OverlayNames.application.settings));

    this.aboutButton = new Button(document
      .querySelector('.main-frame__footer__about-button') as HTMLElement);
    this.aboutButton.onClick(
      () => this.router.go(ViewService.ViewPaths.aboutPage));

    this.signUpButton = new Button(document
      .querySelector(
        '.main-frame__content__choice-column__sign-up-button') as HTMLElement);
    this.signUpButton.onClick(
      () => this.router.go(ViewService.ViewPaths.online.signUpPage));

    this.goOfflineButton = new Button(document
      .querySelector(
        '.main-frame__content__choice-column__go-offline-button') as HTMLElement);
    this.goOfflineButton.onClick(
      () => this.router.go(ViewService.ViewPaths.offline.lobbyPage));
  }

  public async destroy(): Promise<void> {
    document.getElementById('main-frame').innerHTML = '';

    this.aboutButton = undefined;
    this.backButton = undefined;
    this.settingsButton = undefined;
    this.soundButton = undefined;

    this.signUpButton = undefined;
    this.goOfflineButton = undefined;
  }

  public async resume(): Promise<void> {
    return this.start();
  }

  public async pause(): Promise<void> {
    return this.destroy();
  }
}
