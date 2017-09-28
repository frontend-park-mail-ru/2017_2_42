import {SignUpPage} from "./page/signUpPage";
import {LoginPage} from "./page/loginPage";
import {StartPage} from "./page/startPage";
import {GamePage} from "./page/gamePage";

export class App {
  constructor() {
    this.startPage = new StartPage();
    this.signUpPage = new SignUpPage();
    this.loginPage = new LoginPage();
    this.gamePage = new GamePage();

    this.startPage.hide();
    this.signUpPage.hide();
    this.loginPage.hide();
    this.gamePage.hide();

    this.goMap = {
      start: this.startPage,
      signUp: this.signUpPage,
      login: this.loginPage,
      gamePage: this.gamePage,
    };

    this.openedPage = null;
  }

  run() {
    this.startPage.show();
    this.openedPage = this.startPage;
  }

  go(page) {
    this.openedPage.hide();
    this.openedPage = page;
    page.show();
  }

}