import config from '../../config/config';

/**
 * Class provides some debug utilities
 *
 * @export
 * @class Utils
 */
export default class Utils {
  /**
   * Puts a warn in console if debug mode is on
   *
   * @static
   * @param {string} message message to put in console
   * @returns {void}
   * @memberof Utils
   */
  static debugWarn(message: string): void {
    if (config.debug) {
      return console.warn(message);
    }
  }
}
