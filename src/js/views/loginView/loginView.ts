import Button from '../../blocks/button';
import LoginForm from '../../blocks/loginForm';
import SignUpForm from '../../blocks/signUpForm';
import BaseView from '../../modules/baseView';
import { EventsEnum, ScopesEnum } from '../../modules/eventBus';
import userService from '../../services/userService';
import ViewPaths from '../pagePaths';
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
    super(parentElement);

    this.name = 'Login';
    this.renderFunc = LoginTmpl;
  }

  public start(): void {
    document.getElementById('main-frame').innerHTML = this.renderFunc();

    this.form = new LoginForm(document.querySelector('.main-frame__content__content-column__form') as HTMLElement);

    this.backButton = new Button(document.querySelector('.main-frame__header__back-button') as HTMLElement);
    this.soundButton = new Button(document.querySelector('.main-frame__header__sound-button') as HTMLElement);
    this.settingsButton = new Button(document.querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.aboutButton = new Button(document.querySelector('.main-frame__footer__about-button') as HTMLElement);

    this.signUpButton = new Button(document.querySelector('.main-frame__content__choice-column__sign-up-button') as HTMLElement);
    this.goOfflineButton = new Button(document.querySelector('.main-frame__content__choice-column__go-offline-button') as HTMLElement);

    this.backButton.onClick(() => {
      this.router.go(ViewPaths.start);
    });

    this.soundButton.onClick(() => {
      console.log('sound muted');
    });

    this.settingsButton.onClick(() => {
      console.log('settings overlay');
    });

    this.aboutButton.onClick(() => {
      this.router.go(ViewPaths.about);
    });

    this.signUpButton.onClick(() => {
      this.router.go(ViewPaths.sign_up);
    });

    this.goOfflineButton.onClick(() => {
      this.router.go(ViewPaths.offline_lobby);
    });

    this.form.onSubmit((event) => {
      event.preventDefault();

      this.form.validate()
        .then((data) => userService.login(data))
        .then(() => this.router.go(ViewPaths.online_lobby))
        .catch((errorArr) => this.form._handle(errorArr));
    });
  }

  public destroy(): void {
    document.getElementById('main-frame').innerHTML = '';

    this.aboutButton = undefined;
    this.backButton = undefined;
    this.settingsButton = undefined;
    this.soundButton = undefined;

    this.signUpButton = undefined;
    this.goOfflineButton = undefined;
  }

  public resume(): void {
    this.start();
  }

  public pause(): void {
    this.destroy();
  }
}
