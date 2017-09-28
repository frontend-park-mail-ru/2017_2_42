'use strict';

import {http} from "../../modules/http";
import {ErrorsHandler} from "../../tools/errors/errorsHandler";
import {Validator} from "../../modules/validator";
import {PATHS} from "../../tools/paths";

/**
 * Login form model page
 */
export class LoginForm {
  /**
   * Initializes main vars
   */
  constructor() {
    this.formValues = {
      username: null,
      password: null,
    };

    this.page = document.getElementById('login');

    this.form = this.page.getElementsByTagName('form')[0];

    this.usernameField = this.form.elements['username'];
    this.passwordField = this.form.elements['password'];

    this.errorHandler = new ErrorsHandler(
      this.usernameField, this.passwordField);

    this.promise = this._deferPromise();
  }

  show() {
    this.page.style.display = 'flex';
    this._addSubmitListener();
    return this.promise;
  }

  hide() {
    this.page.style.display = 'none';
    this._removeSubmitListener();
  }

  /**
   * Collects values from form
   * @private
   */
  _getValues() {
    this.formValues.username = this.usernameField.value;
    this.formValues.password = this.passwordField.value;
  }

  /**
   * Event listener callback
   * @param {Event} event event
   * @private
   */
  _onSubmit(event) {
    event.preventDefault();
    this._getValues();

    Validator.validateLoginForm(this.formValues)
      .then(this._loginUser)
      .then(/*todo*/)
      .then(this.promise.resolve('good'))
      .catch(ErrorsHandler);
  }

  /**
   * Sends a request for login
   * @return {Promise}
   * @private
   */
  _loginUser() {
    const requestBody = JSON.stringify(this.formValues);

    return http.prPost(PATHS.LOGIN_PATH, requestBody);
  }

  _addSubmitListener() {
    this.form.addEventListener('submit', ev => this._onSubmit(ev));
  };

  _removeSubmitListener() {
    this.form.removeEventListener('submit', ev => this._onSubmit(ev));
  }

  _deferPromise() {
    let rej, res;

    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });

    promise.reject = rej;
    promise.resolve = res;

    return promise;
  }
}