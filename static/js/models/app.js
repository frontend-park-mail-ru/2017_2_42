import {SignUpPage} from './page/signupPage';
import {LoginPage} from './page/loginPage';
import {StartPage} from './page/startPage';
import {GamePage} from './page/gamePage';

/**
 * Application class
 */
export class App {
  /**
   * Initializes class
   */
  constructor() {
    this.startPage = new StartPage();
    this.signupPage = new SignUpPage();
    this.loginPage = new LoginPage();
    this.gamePage = new GamePage();

    this.startPage.hide();
    this.signupPage.hide();
    this.loginPage.hide();
    this.gamePage.hide();

    this.goMap = {
      start: this.startPage,
      signup: this.signupPage,
      login: this.loginPage,
      gamePage: this.gamePage,
    };

    this.openedPage = null;
  }

  /**
   * runs the app
   */
  run() {
    this.startPage.show();
    this.openedPage = this.startPage;
  }

  /**
   * Makes moving above pages
   * @param {Object} page
   */
  go(page) {
    this.openedPage.hide();
    this.openedPage = page;
    page.show();
  }
}
