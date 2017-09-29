/**
 *
 */
export class GamePage {
  /**
   *
   */
  constructor() {
    this.page = document.getElementById('main-game-container');
  }

  /**
   *
   */
  show() {
    this.page.style.display = 'flex';
  }

  /**
   *
   */
  hide() {
    this.page.style.display = 'none';
  }
}
