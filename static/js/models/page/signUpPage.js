import {SignUpForm} from '../../blocks/form/signUpForm';

/**
 *
 */
export class SignUpPage {
  /**
   *
   */
  constructor() {
    this.section = document.getElementById('signup');

    this.signUpForm = new SignUpForm.Create(this.section);
  }

  /**
   *
   */
  show() {
    this.section.style.display = 'flex';
    this.signUpForm.show();
  }

  /**
   *
   */
  hide() {
    this.section.style.display = 'none';
    this.signUpForm.hide();
  }
}
