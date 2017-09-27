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

    this.form = document.getElementById('login')
      .getElementsByTagName('form')[0];

    this.usernameField = this.form.elements['username'];
    this.passwordField = this.form.elements['password'];

    this.errorHandler = new ErrorsHandler(
      this.usernameField, this.passwordField);
  }

  show() {
    this.form.style.display = 'block';
    return this._addSubmitListener();
  }

  hide() {
    this.form.style.display = 'none';
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
   * @param {Function} resolve
   * @param {Function} reject
   * @param {Event} event event
   * @private
   */
  _onSubmit(event, resolve, reject) {
    event.preventDefault();
    this._getValues();

    Validator.validateLoginForm(this.formValues)
      .then(this._loginUser)
      .then(/*todo*/)
      .then(resolve('good'))
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
    return new Promise((resolve, reject) => {
      this.form.addEventListener('submit', (event) => {
        this._onSubmit(event, resolve, reject);
      });
    });
  };

  _removeSubmitListener() {
    this.form.removeEventListener('submit', this._onSubmit);
  }


}