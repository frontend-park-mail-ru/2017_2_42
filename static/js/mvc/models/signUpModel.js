import SignUpForm from '../blocks/signUpForm';
import eventBus from '../../modules/eventBus';
import UserService from '../../modules/userService';
import router from '../../modules/router';

export default class SignUpModel {
  constructor() {
    this.page = document.getElementById('sign_up-page');

    this.form = new SignUpForm(
      this.page.getElementsByTagName('form')[0]);
  }

  run() {
    this.form.onSubmit(event => {
      event.preventDefault();

      this.form.validate()
        .then(data => UserService.signUp(data))
        .then(user => {
          eventBus.emit('user: signed up', user);
          router.go('/');
        })
        .catch(errArr => this.form._handle(errArr));
    });
  }

  stop() {
    this.form.clearListeners();
  }
}