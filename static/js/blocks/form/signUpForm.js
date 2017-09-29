'use strict';

import {ErrorsHandler} from '../../tools/errors/errorsHandler';
import {Validator} from '../../modules/validator';
import {http} from '../../modules/http';
import {PATHS} from '../../tools/paths';
import {errors} from '../../tools/errors/errors';
import {app} from '../../main';
import {Form} from './form';
import {signUpFields, signUpConfig} from './signUpConfig';

/**
 * Sign up form model page
 */
export class SignUpForm extends Form {
  /**
   * @param {Form} form built form
   * @param {Object} page page that will contain this form
   * Initializes main vars
   */
  constructor(form, page) {
    super(form.elem, form.childArr);

    this.page = page;
    this.page.appendChild(this.elem);

    let h2 = document.createElement('h2');
    h2.classList.add('signup-header');
    h2.innerText = 'SIGN UP';
    this.elem.insertBefore(h2, this.elem.firstChild);

    this.errorHandler = new ErrorsHandler(
      this.childArr[0],
      this.childArr[2],
      this.childArr[1],
      this.childArr[3]
    );
  }

  /**
   * Method that creates signup form
   * @param {Object} page page that will contain this form
   * @return {SignUpForm} built form
   * @constructor
   */
  static create(page) {
    let form = super.create(signUpConfig, signUpFields);

    return new SignUpForm(form, page);
  }

  /**
   * Shows the form
   */
  show() {
    this.on('submit', function(e) {
      e.preventDefault();
      this._collectData();

      Validator.validateSignUpForm(this.values)
        .then(() => this._signUpNewUser())
        .then(() => app.go(app.goMap.gamePage))
        .catch((errorsArr) => this.errorHandler.handle(errorsArr));
    }.bind(this));

    super.show();
  }


  /**
   * Signs up new user via http request
   * @return {Promise}
   * @private
   */
  _signUpNewUser() {
    const requestBody = JSON.stringify(this.values);

    return http.prPost(PATHS.SIGNUP_PATH, requestBody)
      .catch((xhr) => {
        if (xhr.status >= 500) {
          throw new Array(errors.SERVER_UNAVAILABLE);
        }
        const resp = JSON.parse(xhr.responseText);
        throw new Array(resp.message);
      });
  };
}
