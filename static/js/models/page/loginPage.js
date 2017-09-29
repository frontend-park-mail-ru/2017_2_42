// import {disposableListener} from '../../tools/eventUtils';
import {LoginForm} from '../../blocks/form/loginForm';
// import {app} from '../../main';

/**
 *
 */
export class LoginPage {
  /**
   *
   */
  constructor() {
      this.section = document.getElementById('login');

      this.loginForm = LoginForm.create(this.section);

    // disposableListener(this.signupButton, 'click', () => {
    //   app.go(app.goMap.signup);
    // });
  }

  /**
   *
   */
  show() {
    this.section.style.display = 'flex';
    this.loginForm.show();
  }

  /**
   *
   */
  hide() {
    this.section.style.display = 'none';
    this.loginForm.hide();
  }
}
