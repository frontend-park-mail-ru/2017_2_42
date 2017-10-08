/**
 * Class providing interface on views
 */
export default class View {
  /**
   * initializes view
   */
  constructor() {
    this.section = document.createElement('section');
    document.body.appendChild(this.section);
    this.section.style.display = 'none';
    this.name = null;
  }

  /**
   * shows the view
   */
  show() {
    this.section.style.display = 'block';
    document.title = this.name || 'title';
  }

  /**
   * hides the view
   */
  hide() {
    this.section.style.display = 'none';
  }
}
