import LoginForm from '../blocks/loginForm';
import Button from '../blocks/button';
import UserService from '../../modules/userService';
import eventBus from '../../modules/eventBus';
import router from '../../modules/router'

export default class LoginPageModel {
  constructor() {
    this.page = document.getElementById('login-page');

    this.form = new LoginForm(
      this.page.getElementsByTagName('form')[0]);

    this.signUpButton = new Button(
      document.getElementById('login__sign-up-button'));
  }

  run() {
    this.form.onSubmit((event) => {
      event.preventDefault();

      this.form.validate()
        .then(data => UserService.login(data))
        .then(user => {
          eventBus.emit('user: logged in', user);
          router.go('/');
        })
        .catch(errArr => this.form._handle(errArr));
    });

    this.signUpButton.onClick(() => router.go('/signup/'))
  }

  stop() {
    this.form.clearListeners();
    this.signUpButton.clearListeners();
  }
}