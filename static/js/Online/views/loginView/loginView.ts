import Button from '../../../blocks/button';
import LoginForm from '../../../blocks/loginForm';
import BaseView from '../../../modules/baseView';
import userService from '../../../services/userService';
import {EventsEnum, ScopesEnum} from '../../../modules/eventBus';

const LoginTmpl = require('./loginView.pug') as TemplateRenderFunc;

export default class LoginView extends BaseView {
  private form: LoginForm;
  private signUpButton: Button;

  constructor(parentElement: HTMLElement) {
    super(parentElement);

    this.name = 'Login';
    this.renderFunc = LoginTmpl;

    this.pageSection.id = 'login-page';
  }

  public start(): void {
    this.pageSection.innerHTML = this.renderFunc();
    this.rootElement.appendChild(this.pageSection);
    console.log(this.rootElement.querySelector('form.login'));
    this.form = new LoginForm(this.rootElement.querySelector('form.login'));
    this.form.onSubmit((event: Event): void => {
      event.preventDefault();

      this.form.validate()
        .then((data) => userService.login(data))
        .then((user) => this.bus.emit(
          ScopesEnum.auth, EventsEnum.user_logged_in))
        .catch((errArr) => this.form._handle(errArr));
    });

    this.signUpButton = new Button(document.getElementById('login__sign-up-button'));
    this.signUpButton.onClick(() => this.router.go('/online/sign_up'));
  }

  public destroy(): void {
    this.rootElement.removeChild(this.pageSection);
    this.pageSection.innerHTML = '';
    this.form = undefined;
  }

  public resume(): void {
    this.show();
  }

  public pause(): void {
    this.hide();
  }
}
