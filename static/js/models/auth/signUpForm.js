'use strict';

import {ErrorsHandler} from "../../tools/errors/errorsHandler";
import {Validator} from "../../modules/validator";
import {http} from "../../modules/http";
import {PATHS} from "../../tools/paths";
import {errors} from "../../tools/errors/errors";

/**
 * Sign up form model page
 */
export class SignUpForm {
  /**
   * Initializes main vars
   */
  constructor() {
    this.formValues = {
      username: null,
      email: null,
      password: null,
      confirmation: null,
    };

    this.page = document.getElementById('signup');

    this.form = this.page.getElementsByTagName('form')[0];

    this.usernameField = this.form.elements['username'];
    this.emailField = this.form.elements['email'];
    this.passwordField = this.form.elements['password'];
    this.confirmationField = this.form.elements['confirm-password'];

    this.errorHandler = new ErrorsHandler(this.usernameField,
      this.passwordField, this.emailField, this.confirmationField);

    this.promise = this._deferPromise();
  }

  /**
   *
   * @return {Promise}
   */
  show() {
    this.page.style.display = 'flex';
    this._addSubmitListener();
    return this.promise;
  }

  /**
   * Hides the sign up form
   */
  hide() {
    this.page.style.display = 'none';
    this._removeSubmitListener();
  }

  /**
   * Collects values from fields
   * @private
   */
  _getValues() {
    this.formValues.username = this.usernameField.value;
    this.formValues.email = this.emailField.value;
    this.formValues.password = this.passwordField.value;
    this.formValues.confirmation = this.confirmationField.value;
  }

  /**
   * Event listener callback
   * @param {Event} event
   * @private
   */
  _onSubmit(event) {
    event.preventDefault();
    this._getValues();

    Validator.validateSignUpForm(this.formValues)
      .then(() => this._signUpNewUser())
      .then(() => this.promise.resolve('good'))
      .catch((errorsArr) => this.errorHandler.handle(errorsArr));
  }

  /**
   * Signs up new user via http request
   * @return {Promise}
   * @private
   */
  _signUpNewUser() {
    const requestBody = JSON.stringify(this.formValues);

    return http.prPost(PATHS.SIGNUP_PATH, requestBody)
      .catch((xhr) => {
        if (xhr.status >= 500) {
          throw [errors.SERVER_UNAVAILABLE,];
        }
        const resp = JSON.parse(xhr.responseText);
        throw [resp.message,];
      });
  };

  /**
   * Adding event listener on submit to form
   * @private
   */
  _addSubmitListener() {
    this.form.addEventListener('submit', ev => this._onSubmit(ev));
  };

  /**
   * Removing event listener on submit from form
   * @private
   */
  _removeSubmitListener() {
    this.form.removeEventListener('submit', ev => this._onSubmit(ev));
  };

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