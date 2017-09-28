import {LoginForm} from "../auth/loginForm";
import {disposableListener} from "../../tools/eventUtils";
import {app} from "../../main";

//
export class LoginPage {
  constructor() {
    this.page = document.getElementById('login');

    this.loginForm = new LoginForm(this.page);
    this.signUpButton = this.page.getElementsByClassName('signupBTN')[0];

    disposableListener(this.signUpButton, 'click', () => {
      app.go(app.goMap.signUp);
    });
  }

  show() {
    this.page.style.display = 'flex';
    this.loginForm.show();
  }

  hide() {
    this.page.style.display = 'none';
    this.loginForm.hide();
  }
}