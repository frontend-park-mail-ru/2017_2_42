import {Block} from "../block/block";
import {disposableListener} from "../../tools/eventUtils";

export class Input extends Block {
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

  static Create(attrs = {}, classes = []) {
    let inp = super.Create('input', attrs, classes);

    return new Input(inp.elem);
  }

  show() {
    this.input.style.display = 'block';
  }

  hide() {
    for (let remover of this.listenerRemovers) {
      remover();
    }

    this.input.style.display = 'none';
  }

  getValue() {
    this.value = this.input.value;
    return this.value;
  }

  setErrorInputState(message) {
    this.input.classList.remove('input-ok');
    this.input.classList.add('input-error');
    const p = this.input.nextElementSibling;
    p.style.display = "block";
    p.textContent = message;
    disposableListener(this.input, 'focus', function () {
      this._setOKInputState();
    }.bind(this));
  }

  _setOKInputState() {
    this.input.classList.remove('input-error');
    this.input.classList.add('input-ok');
    const p = this.input.nextElementSibling;
    p.style.display = 'none';
  }
}
