import {Block} from '../block/block';
import {disposableListener} from '../../tools/eventUtils';

/**
 * Input field class
 */
export class Input extends Block {
  /**
   * Initializes input and wraps it into div
   * @param {HTMLElement} el
   */
  constructor(el) {
    super(el);
    this.input = this.elem;

    let container = document.createElement('div');
    container.classList.add('container');

    let pError = document.createElement('p');
    pError.classList.add('error-message');

    container.appendChild(this.elem);
    container.appendChild(pError);

    this.elem = container;

    this.type = el.type;
    this.name = el.name;
    this.value = null;
    this.defaultPlaceholder = el.placeholder;
  }

  /**
   * Builds the input field
   * @param {Object} attrs attributes of input field
   * @param {Array} classes classes of input field
   * @return {Input} built input field
   * @constructor
   */
  static Create(attrs = {}, classes = []) {
    let inp = new super.Create('input', attrs, classes);

    return new Input(inp.elem);
  }

  /**
   * shows the input
   */
  show() {
    this.input.style.display = 'block';
  }

  /**
   * hides the input
   */
  hide() {
    for (let remover of this.listenerRemovers) {
      remover();
    }

    this.input.style.display = 'none';
  }

  /**
   * Gets value
   * @return {null|*}
   */
  getValue() {
    this.value = this.input.value;
    return this.value;
  }

  /**
   * Sets error state
   * @param {string} message error message
   */
  setErrorInputState(message) {
    this.input.classList.remove('input-ok');
    this.input.classList.add('input-error');
    const p = this.input.nextElementSibling;
    p.style.display = 'block';
    p.textContent = message;
    disposableListener(this.input, 'focus', function() {
      this._setOKInputState();
    }.bind(this));
  }

  /**
   * Sets ok state
   * @private
   */
  _setOKInputState() {
    this.input.classList.remove('input-error');
    this.input.classList.add('input-ok');
    const p = this.input.nextElementSibling;
    p.style.display = 'none';
  }
}
