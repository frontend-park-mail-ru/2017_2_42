import {disposableListener} from "../../tools/eventUtils";
import {app} from "../../main";

export class StartPage {
  constructor() {
    this.page = document.getElementById('play-game');

    this.button = this.page.getElementsByTagName('a')[0];
  }

  show() {
    this.page.style.display = 'flex';

    disposableListener(this.button, 'click', function () {
      app.go(app.goMap.login);
    })
  }

  hide() {
    this.page.style.display = 'none';
  }


}