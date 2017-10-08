import './loginView.css'
import View from '../view';
import LoginViewTemplate from './loginView.pug';

/**
 * Implements login view
 */
export default class LoginView extends View {
  /**
   * Builds login view
   */
  constructor() {
    super();
    this.section.innerHTML = LoginViewTemplate();
    this.section.id = 'login-page';
    this.name = 'Physics.io | login';
  }
}