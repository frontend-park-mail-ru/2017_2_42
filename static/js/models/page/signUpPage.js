import {SignUpForm} from "../auth/signUpForm";

export class SignUpPage {
  constructor() {
    this.section = document.getElementById('signup');

    this.signUpForm = new SignUpForm(this.section);
  }

  show() {
    this.section.style.display = 'flex';
    this.signUpForm.show();
  }
}