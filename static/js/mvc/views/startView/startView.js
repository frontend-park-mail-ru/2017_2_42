import './startView.css';
import View from '../view';
import startPageTemplate from './startView.pug';

/**
 * implements start View
 */
export default class StartView extends View {
  /**
   * Builds view
   */
  constructor() {
    super();
    this.section.innerHTML = startPageTemplate();
    this.section.id = 'start-game';
    this.name = 'Physics.io | play game';
  }
}
