import Form from './form';
import Input from './input';
import Button from './button';
import userService from '../services/userService';

/**
 *
 *
 * @extends {Form}
 */
export default class LoginForm extends Form {
  /**
   * Creates an instance of LoginForm.
   * @param {any} elem
   * @memberof LoginForm
   */
  constructor(elem) {
    super(elem);

    this.usernameField = new Input(document.querySelector(
      '.main-frame__content__content-column__form__username'));
    this.passwordField = new Input(document.querySelector(
      '.main-frame__content__content-column__form__password'));

    this.submitButton = new Button(document.querySelector(
      '.main-frame__content__content-column__form__submit'));
  }

  /**
   * On success submit
   * @param {function} callback
   * @return {void}
   */
  onSuccessSubmit(callback) {
    const func = async (event) => {
      this.submitButton.lock();
      this.element.removeEventListener('submit', func);
      this.element.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      event.preventDefault();

      try {
        const validatedData = await this.validate();
        await userService.login(validatedData);

        callback();
      } catch (errorArr) {
        this._handle(errorArr);
      }
    };

    this.element.addEventListener('submit', func);
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof LoginForm
   */
  validate() {
    return new Promise((resolve, reject) => {
      let errCodes = [
        this._validateUsername(),
        this._validatePassword(),
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
   * @memberof LoginForm
   */
  clearListeners() {
    super.clearListeners();
    this.usernameField.clearListeners();
    this.passwordField.clearListeners();
    this.submitButton.clearListeners();
  }

  /**
   *
   *
   * @return {Promise}
   * @memberof LoginForm
   */
  getData() {
    return {
      login: this.usernameField.getValue(),
      password: this.passwordField.getValue(),
    };
  }
}
