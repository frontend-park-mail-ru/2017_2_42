import Block from './block';

/**
 * Input field class
 */
export default class Input extends Block {
  /**
   * Builds the input block
   * @param {HTMLElement} elem container of input and error placeholder
   */
  constructor(elem) {
    super(elem);
    console.log(elem);
    this.input = elem;

    this.errorField = document.createElement('p');
    this.errorField.style.display = 'none';

    this.input.parentElement.insertBefore(
      this.errorField, this.input.nextSibling);
  }

  /**
   * Gets value
   * @return {null|string} value of input
   */
  getValue() {
    return this.input.value;
  }

  /**
   * Sets error state
   * @param {string} message error message
   */
  setError(message) {
    this.input.classList.remove('input-ok');
    this.input.classList.add('input-error');

    this.errorField.style.display = 'block';
    this.errorField.style.position = 'absolute';
    this.errorField.style.width = '20vw';
    this.errorField.style.right = '-21vw';
    this.errorField.style.top = '0.2vw';
    this.errorField.style.fontSize = '0.7em';
    this.errorField.innerText = message;

    this.disposableOn('focus', () => this._setOKInputState());
  }

  /**
   * Sets ok state
   * @private
   */
  _setOKInputState() {
    this.input.classList.remove('input-error');
    this.input.classList.add('input-ok');
    this.errorField.style.display = 'none';
  }

  /**
   * Single time event handler
   * @param {String} event event to handle
   * @param {Function} callback event handler
   */
  disposableOn(event, callback) {
    this.input.addEventListener(event, function evCallback(ev) {
      console.log(1);

      callback(ev);
      ev.currentTarget.removeEventListener(event, evCallback);
    });
  }
}
