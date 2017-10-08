import Block from './block';

export default class Button extends Block {
  /**
   * Click event handler
   * @param callback event handler
   */
  onClick(callback) {
    this.on('click', callback);
  }
}
