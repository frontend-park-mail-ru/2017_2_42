import './signUpView.css'
import View from '../view';
import signUpTemplate from './signUpView.pug';

/**
 * Implements sign up view class
 */
export default class SignUpView extends View {
  /**
   * Builds the sign up view
   */
  constructor() {
    super();
    this.section.id = 'sign_up-page';
    this.section.innerHTML = signUpTemplate();
    this.name = 'Physics.io | sign up';
  }
}
