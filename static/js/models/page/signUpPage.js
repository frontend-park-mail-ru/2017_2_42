import {SignupForm} from '../../blocks/form/signupForm';

/**
 *
 */
export class SignUpPage {
  /**
   *
   */
  constructor() {
    this.section = document.getElementById('signup');

    this.signupForm = SignupForm.create(this.section);
  }

  /**
   *
   */
  show() {
    this.section.style.display = 'flex';
    this.signupForm.show();
  }

  /**
   *
   */
  hide() {
    this.section.style.display = 'none';
    this.signupForm.hide();
  }
}
