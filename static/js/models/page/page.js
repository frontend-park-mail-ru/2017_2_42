/**
 * Created by zwirec on 16.09.17.
 */


class Page {
  constructor(elem) {
    this.elem = elem;
  }

  show() {
    this.elem.style.display = 'block';
  }

  hide() {
    this.elem.style.display = 'none';
  }

}