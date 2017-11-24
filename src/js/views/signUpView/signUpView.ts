import Button from '../../blocks/button';
import SignUpForm from '../../blocks/signUpForm';
import BaseView from '../../modules/baseView';
import { EventsEnum, ScopesEnum } from '../../modules/eventBus';
import userService from '../../services/userService';
import ViewPaths from '../pagePaths';

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
    super(parentElement);

    this.name = 'Sign up';
    this.renderFunc = SignUpTmpl;

  }

  public start(): void {
    document.getElementById('main-frame').innerHTML = this.renderFunc();

    this.form = new SignUpForm(document.querySelector('.main-frame__content__content-column__form') as HTMLElement);

    this.backButton = new Button(document.querySelector('.main-frame__header__back-button') as HTMLElement);
    this.soundButton = new Button(document.querySelector('.main-frame__header__sound-button') as HTMLElement);
    this.settingsButton = new Button(document.querySelector('.main-frame__header__settings-button') as HTMLElement);
    this.aboutButton = new Button(document.querySelector('.main-frame__footer__about-button') as HTMLElement);

    this.loginButton = new Button(document.querySelector('.main-frame__content__choice-column__login-button') as HTMLElement);
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

    this.loginButton.onClick(() => {
      this.router.go(ViewPaths.login);
    });

    this.goOfflineButton.onClick(() => {
      this.router.go(ViewPaths.offline_lobby);
    });

    this.form.onSubmit((event) => {
      event.preventDefault();

      this.form.validate()
        .then((data) => userService.signUp(data))
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

    this.loginButton = undefined;
    this.goOfflineButton = undefined;
  }

  public resume(): void {
    this.start();
  }

  public pause(): void {
    this.destroy();
  }
}
