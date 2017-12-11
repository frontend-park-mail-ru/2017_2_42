import Button from '../../../blocks/button';
import SignUpForm from '../../../blocks/signUpForm';
import BaseView from '../../../modules/BaseView';
import ViewService from '../../../services/ViewService';
import './signUpView.scss';


const SignUpTmpl = require('./signUpView.pug') as TemplateRenderFunc;

export default class SignUpView extends BaseView {
  private form: SignUpForm;

  private loginButton: Button;
  private goOfflineButton: Button;

  private backButton: Button;
  private settingsButton: Button;
  private aboutButton: Button;
  private soundButton: Button;

  constructor(parentElement: HTMLElement) {
    super(parentElement, 'Sign up');
  }

  public async start(): Promise<void> {
    this.RenderPage(SignUpTmpl);

    this.form = new SignUpForm(document
      .querySelector('.main-frame__content__content-column__form') as HTMLElement);
    this.form.onSuccessSubmit(
      () => this.router.go(ViewService.ViewPaths.online.lobbyPage));

    this.backButton = new Button(document
      .querySelector('.main-frame__header__back-button') as HTMLElement);
    this.backButton.onClick(
      () => this.router.go(ViewService.ViewPaths.startPage));

    this.soundButton = new Button(document
      .querySelector('.main-frame__header__sound-button') as HTMLElement);
    this.soundButton.onClick(
      () => console.log('sound muted'));

    this.settingsButton = new Button(document
      .querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.settingsButton.onClick(
      () => this.router
        .showOverlay(ViewService.OverlayNames.application.settings));

    this.aboutButton = new Button(document
      .querySelector('.main-frame__footer__about-button') as HTMLElement);
    this.aboutButton.onClick(
      () => this.router.go(ViewService.ViewPaths.aboutPage));

    this.loginButton = new Button(document
      .querySelector('.main-frame__content__choice-column__login-button') as HTMLElement);
    this.loginButton.onClick(
      () => this.router.go(ViewService.ViewPaths.online.loginPage));


    this.goOfflineButton = new Button(document
      .querySelector('.main-frame__content__choice-column__go-offline-button') as HTMLElement);
    this.goOfflineButton.onClick(
      () => this.router.go(ViewService.ViewPaths.offline.lobbyPage));

  }

  public async destroy(): Promise<void> {
    this.rootElement.innerHTML = '';

    this.aboutButton = undefined;
    this.backButton = undefined;
    this.settingsButton = undefined;
    this.soundButton = undefined;

    this.loginButton = undefined;
    this.goOfflineButton = undefined;
  }

  public async resume(): Promise<void> {
    return this.start();
  }

  public async pause(): Promise<void> {
    return this.destroy();
  }
}
