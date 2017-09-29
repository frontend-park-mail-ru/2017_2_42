import {Block} from '../block/block';
import {Input} from '../input/input';

/**
 * Form class for containing inputs, etc
 */
export class Form extends Block {
  /**
   * Initializes Form
   * @param {Object} elem
   * @param {Object} childArr
   */
  constructor(elem, childArr) {
    super(elem);

    this.childArr = childArr;
    this.values = {};
  }

  /**
   * Builds the form
   * @param {Object} formConfig config with attrs and classes for form
   * @param {Object} inputsConfig config with attrs and classes for each input
   * @return {Block}
   * @constructor
   */
  static create(formConfig, inputsConfig) {
    const tagName = 'form';

    let form = super.create(tagName, formConfig.attrs, formConfig.classes);

    for (let inputConfig of inputsConfig) {
      form.append(Input.create(inputConfig.attrs, inputConfig.classes));

      let errorp = document.createElement('p');
      errorp.classList.add('error-message');

      form.elem.appendChild(errorp);
    }

    return new Form(form.elem, form.childArr);
  }

  /**
   * Shows the form
   */
  show() {
    this.elem.style.display = 'flex';

    for (let input of this.childArr) {
      input.show();
    }
  }

  /**
   * Hides the form
   */
  hide() {
    super.hide();

    for (let input of this.childArr) {
      input.hide();
    }
  }

  /**
   * Collects the data
   * @private
   */
  _collectData() {
    for (let inputBlock of this.childArr) {
      if (inputBlock.type !== 'submit' && inputBlock.type !== 'button') {
        this.values[inputBlock.name] = inputBlock.getValue();
      }
    }
  }
}
