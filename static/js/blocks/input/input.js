import {Block} from "../block/block";

export class Input extends Block {
  constructor(attrs = {}, classes = []) {
    const el = document.createElement('input');
    el.classList.add(...classes);
    for (let val in attrs) {
      el.setAttribute(val, attrs[val])
    }
    super(el);
  }

  static Create(attrs = {}, classes = [], placeholder) {
    const tagName = 'input';

    let input = super.Create(tagName, attrs, classes);
    input.elem.placeholder = placeholder;

    return input;
  }

  setErrorInputState(message) {
    this.elem.classList.remove('input-ok');
    this.elem.classList.add('input-error');
    const p = this.elem.nextElementSibling;
    p.style.display = "block";
    p.textContent = message;
  }

  setOKInputState() {
    this.elem.classList.remove('input-error');
    this.elem.classList.add('input-ok');
    const p = this.elem.nextElementSibling;
    p.style.display = 'none';
  }
}
