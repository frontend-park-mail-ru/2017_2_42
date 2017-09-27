import {ErrorsHandler} from "../../tools/errors/errorsHandler";
import {Validator} from "../../modules/validator";
import {http} from "../../modules/http";
import {PATHS} from "../../tools/paths";

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

    this.form = document.getElementById('signup')
      .getElementsByTagName('form')[0];

    this.usernameField = this.form.elements['username'];
    this.emailField = this.form.elements['email'];
    this.passwordField = this.form.elements['password'];
    this.confirmationField = this.form.elements['confirm-password'];

    this.errorHandler = new ErrorsHandler(this.usernameField,
      this.passwordField, this.emailField, this.confirmationField);
  }

  /**
   *
   * @return {Promise}
   */
  show() {
    this.form.style.display = 'Block';
    return this._addSubmitListener();
  }

  /**
   * Hides the sign up form
   */
  hide() {
    this.form.style.display = 'none';
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
   * @param {Function} resolve
   * @param {Function} reject
   * @private
   */
  _onSubmit(event, resolve, reject) {
    event.preventDefault();
    this._getValues();

    Validator.validateSignUpForm(this.formValues)
      .then(this._signUpNewUser)
      .then(/*todo*/)
      .then(resolve('good'))
      .catch(this.errorHandler.handle);
  }

  /**
   * Signs up new user via http request
   * @return {Promise}
   * @private
   */
  _signUpNewUser() {
    const requestBody = JSON.stringify(this.formValues);

    return http.prPost(PATHS.SIGNUP_PATH, requestBody);
  };

  /**
   * Adding event listener on submit to form
   * @private
   */
  _addSubmitListener() {
    return new Promise((resolve, reject) => {
      this.form.addEventListener('submit', (event) => {
        this._onSubmit(event, resolve, reject)
      });
    })
  };

  /**
   * Removing event listener on submit from form
   * @private
   */
  _removeSubmitListener() {
    this.form.removeEventListener('submit', this._onSubmit);
  };

}