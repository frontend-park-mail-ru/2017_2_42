import {Block} from "../block/block";
import {disposableListener} from "../../tools/eventUtils";

export class Input extends Block {
  constructor(el) {
    super(el);

    this.type = el.type;
    this.name = el.name;
    this.value = null;
    this.defaultPlaceholder = el.placeholder;
  }

  static Create(attrs = {}, classes = []) {
    const tagName = 'input';

    let inp = super.Create(tagName, attrs, classes);

    return new Input(inp.elem);
  }

  getValue() {
    this.value = this.elem.value;
    return this.value;
  }

  setErrorInputState(message) {
    this.elem.classList.remove('input-ok');
    this.elem.classList.add('input-error');
    // const p = this.elem.nextElementSibling;
    // p.style.display = "block";
    // p.textContent = message
    disposableListener(this.elem, 'focus', function () {
      this._setOKInputState();
    }.bind(this));
  }

  _setOKInputState() {
    this.elem.classList.remove('input-error');
    this.elem.classList.add('input-ok');
    // const p = this.elem.nextElementSibling;
    // p.style.display = 'none';
  }
}
