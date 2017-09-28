/**
 * Created by zwirec on 28.09.17.
 */

import {Block} from "../block/block"
import {Input} from "../input/input";


export class Form extends Block {
  constructor(elem, childArr) {
    super(elem);

    this.childArr = childArr;
    this.values = {};
  }

  /**
   *
   * @param formConfig
   * @param inputsConfig
   * @return {Block}
   * @constructor
   */
  static Create(formConfig, inputsConfig) {
    const tagName = 'form';

    let form = super.Create(tagName, formConfig.attrs, formConfig.classes);

    for (let inputConfig of inputsConfig) {
      form.append(Input.Create(inputConfig.attrs, inputConfig.classes));
    }

    return new Form(form.elem, form.childArr);
  }

  show() {
    this.elem.style.display = 'flex';

    for (let input of this.childArr) {
      input.show();
    }
  }

  hide() {
    super.hide();

    for (let input of this.childArr) {
      input.hide();
    }
  }

  onSubmit(callback) {
    this.on('submit', function (e) {
      e.preventDefault();
      this._collectData();

      callback(this.values);
    }.bind(this));
  }

  _collectData() {
    for (let inputBlock of this.childArr) {
      if (inputBlock.type !== 'submit') {
        this.values[inputBlock.name] = inputBlock.getValue();
      }
    }
  }
}
