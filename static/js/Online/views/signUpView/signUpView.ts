import SignUpForm from '../../../blocks/signUpForm';
import BaseView from '../../../modules/baseView';
import userService from '../../../services/userService';
import {EventsEnum, ScopesEnum} from '../../../modules/eventBus';


const SignUpTmpl = require('./signUpView.pug') as TemplateRenderFunc;

export default class SignUpView extends BaseView {
  private form: SignUpForm;

  constructor(parentElement: HTMLElement) {
    super(parentElement);

    this.name = 'Sign up';
    this.renderFunc = SignUpTmpl;

    this.pageSection.id = 'sign_up-page';
  }

  public start(): void {
    this.pageSection.innerHTML = this.renderFunc();
    this.rootElement.appendChild(this.pageSection);

    this.form = new SignUpForm(this.rootElement.querySelector('form.sign-up'));

    this.form.onSubmit((event: Event): void => {
      event.preventDefault();

      this.form.validate()
        .then((data) => userService.signUp(data))
        .then((user) => this.bus.emit(
          ScopesEnum.auth, EventsEnum.user_signed_up))
        .catch((errArr) => this.form._handle(errArr));
    });
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
