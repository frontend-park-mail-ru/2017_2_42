import {LoginForm} from "../auth/loginForm";

export class LoginPage {
  constructor() {
    this.page = document.getElementById('login');

    this.loginForm = new LoginForm(this.page);
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