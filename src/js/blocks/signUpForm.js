import Form from './form';
import Input from './input';
import Button from './button';

/**
 *
 *
 * @export
 * @class SignUpForm
 * @extends {Form}
 */
export default class SignUpForm extends Form {
  /**
   * Creates an instance of SignUpForm.
   * @param {any} elem
   * @memberof SignUpForm
   */
  constructor(elem) {
    super(elem);

    this.usernameField = new Input(document.querySelector(
      '.main-frame__content__content-column__form__username'));
    this.emailField = new Input(document.querySelector(
      '.main-frame__content__content-column__form__email'));
    this.passwordField = new Input(document.querySelector(
      '.main-frame__content__content-column__form__password'));
    this.confirmationField = new Input(document.querySelector(
      '.main-frame__content__content-column__form__confirmation'));

    this.submitButton = new Button(document.querySelector(
      '.main-frame__content__content-column__form__submit'));
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof SignUpForm
   */
  validate() {
    return new Promise((resolve, reject) => {
      let errCodes = [
        this._validateUsername(),
        this._validateEmail(),
        this._validatePassAndConf(),
      ];

      errCodes = errCodes.filter((err) => err !== null);

      if (errCodes.length === 0) {
        resolve(this.getData());
        return;
      }

      reject(errCodes);
    });
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof SignUpForm
   */
  getData() {
    return {
      username: this.usernameField.getValue(),
      password: this.passwordField.getValue(),
      email: this.emailField.getValue(),
    };
  }

  /**
   *
   *
   * @memberof SignUpForm
   */
  clearListeners() {
    super.clearListeners();
    this.usernameField.clearListeners();
    this.passwordField.clearListeners();
    this.confirmationField.clearListeners();
    this.emailField.clearListeners();
    this.submitButton.clearListeners();
  }
}
