import Block from './block';

/**
 * Button block provides interface for buttons
 * @extends {Block}
 */
export default class Button extends Block {
  constructor(buttonElement: HTMLElement) {
    super(buttonElement);
  }

  /**
   * Click event handler
   * @param {f} callback event handler
   */
  onClick(callback) {
    this.on('click', callback);
  }
}
