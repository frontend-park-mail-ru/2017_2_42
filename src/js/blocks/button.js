import Block from './block';

/**
 *
 *
 * @export
 * @class Button
 * @extends {Block}
 */
export default class Button extends Block {
  /**
   * Click event handler
   * @param {f} callback event handler
   */
  onClick(callback) {
    this.on('click', callback);
  }
}
